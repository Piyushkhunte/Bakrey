import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { sendPaymentConfirmationSms } from "../../../lib/sms";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function verifySignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  receivedSignature: string,
  secret: string
) {
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  const generatedBuffer = Buffer.from(
    generatedSignature,
    "utf8"
  );

  const receivedBuffer = Buffer.from(
    receivedSignature,
    "utf8"
  );

  if (generatedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    generatedBuffer,
    receivedBuffer
  );
}

export async function POST(request: Request) {
  try {
    // --------------------------------
    // Environment variables
    // --------------------------------

    const supabaseUrl = getRequiredEnv(
      "NEXT_PUBLIC_SUPABASE_URL"
    );

    const supabaseServiceRoleKey = getRequiredEnv(
      "SUPABASE_SERVICE_ROLE_KEY"
    );

    const razorpayKeySecret = getRequiredEnv(
      "RAZORPAY_KEY_SECRET"
    );

    // --------------------------------
    // Supabase admin client
    // --------------------------------

    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // --------------------------------
    // Parse request
    // --------------------------------

    const body = await request.json();

    const orderId =
      typeof body.orderId === "string"
        ? body.orderId.trim()
        : "";

    const razorpayPaymentId =
      typeof body.razorpay_payment_id === "string"
        ? body.razorpay_payment_id.trim()
        : "";

    const razorpaySignature =
      typeof body.razorpay_signature === "string"
        ? body.razorpay_signature.trim()
        : "";

    if (
      !orderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        { error: "Missing payment information." },
        { status: 400 }
      );
    }

    // --------------------------------
    // Get order from OUR database
    // --------------------------------

    const { data: order, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .select(
          `
            id,
            razorpay_order_id,
            payment_status,
            phone,
            payment_notification_sent
          `
        )
        .eq("id", orderId)
        .single();

    if (orderError) {
      console.error(
        "Payment verification order lookup failed:",
        orderError.message
      );

      return NextResponse.json(
        { error: "Unable to find the order." },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    // --------------------------------
    // Already processed
    // --------------------------------

    if (order.payment_status === "paid") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified.",
        orderId: order.id,
        smsSent:
          order.payment_notification_sent === true,
      });
    }

    // --------------------------------
    // Verify Razorpay order exists
    // --------------------------------

    if (!order.razorpay_order_id) {
      return NextResponse.json(
        { error: "Razorpay order not found." },
        { status: 400 }
      );
    }

    // --------------------------------
    // Verify Razorpay signature
    // --------------------------------

    const isValid = verifySignature(
      order.razorpay_order_id,
      razorpayPaymentId,
      razorpaySignature,
      razorpayKeySecret
    );

    if (!isValid) {
      console.error(
        "Razorpay signature verification failed:",
        order.id
      );

      return NextResponse.json(
        { error: "Payment verification failed." },
        { status: 400 }
      );
    }

    // --------------------------------
    // Mark payment as paid
    // --------------------------------

    const { data: updatedOrder, error: updateError } =
      await supabaseAdmin
        .from("orders")
        .update({
          payment_status: "paid",
          razorpay_payment_id: razorpayPaymentId,
          order_status: "confirmed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id)
        .eq("payment_status", "pending")
        .select("id")
        .maybeSingle();

    if (updateError) {
      console.error(
        "Failed to update paid order:",
        updateError.message
      );

      return NextResponse.json(
        { error: "Failed to update order." },
        { status: 500 }
      );
    }

    // Another request may have completed the payment
    // between the initial read and this update.
    if (!updatedOrder) {
      const { data: latestOrder } =
        await supabaseAdmin
          .from("orders")
          .select(
            "payment_status, payment_notification_sent"
          )
          .eq("id", order.id)
          .single();

      if (latestOrder?.payment_status === "paid") {
        return NextResponse.json({
          success: true,
          message: "Payment already verified.",
          orderId: order.id,
          smsSent:
            latestOrder.payment_notification_sent === true,
        });
      }

      return NextResponse.json(
        { error: "Payment could not be confirmed." },
        { status: 409 }
      );
    }

    // --------------------------------
    // Send payment confirmation SMS
    // --------------------------------

    let smsSent = false;

    if (!order.payment_notification_sent) {
      try {
        const sms = await sendPaymentConfirmationSms(
          order.phone,
          order.id
        );

        smsSent = sms.sent;

        if (sms.sent) {
          const { error: notificationError } =
            await supabaseAdmin
              .from("orders")
              .update({
                payment_notification_sent: true,
              })
              .eq("id", order.id)
              .eq(
                "payment_notification_sent",
                false
              );

          if (notificationError) {
            console.error(
              "Payment SMS status update failed:",
              notificationError.message
            );
          }
        } else if (sms.configured) {
          console.error(
            "Payment SMS provider rejected notification:",
            order.id
          );
        }
      } catch (smsError) {
        console.error(
          "Payment SMS notification failed:",
          smsError instanceof Error
            ? smsError.message
            : "Unknown SMS error."
        );
      }
    }

    // --------------------------------
    // Return success
    // --------------------------------

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      orderId: order.id,
      smsSent,
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error instanceof Error
        ? error.message
        : "Unknown error."
    );

    return NextResponse.json(
      { error: "Payment verification failed." },
      { status: 500 }
    );
  }
}