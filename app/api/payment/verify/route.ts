import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

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

  if (
    generatedBuffer.length !== receivedBuffer.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    generatedBuffer,
    receivedBuffer
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      orderId,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (
      !orderId ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { error: "Missing payment information." },
        { status: 400 }
      );
    }

    // IMPORTANT:
    // Get the Razorpay order ID from OUR database.
    const { data: order, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .select(
          "id, razorpay_order_id, payment_status"
        )
        .eq("id", orderId)
        .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    if (!order.razorpay_order_id) {
      return NextResponse.json(
        { error: "Razorpay order not found." },
        { status: 400 }
      );
    }

    // Already processed.
    if (order.payment_status === "paid") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified.",
      });
    }

    const isValid = verifySignature(
      order.razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET!
    );

    if (!isValid) {
      console.error(
        "Razorpay signature verification failed for order:",
        order.id
      );

      return NextResponse.json(
        { error: "Payment verification failed." },
        { status: 400 }
      );
    }

    // Signature is valid.
    const { error: updateError } =
      await supabaseAdmin
        .from("orders")
        .update({
          payment_status: "paid",
          razorpay_payment_id,
          order_status: "confirmed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id)
        .eq("payment_status", "pending");

    if (updateError) {
      console.error(
        "Failed to update paid order:",
        updateError
      );

      return NextResponse.json(
        { error: "Failed to update order." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      orderId: order.id,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { error: "Payment verification failed." },
      { status: 500 }
    );
  }
}