import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

type CreatePaymentOrderRequest = {
  orderId?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export async function POST(request: Request) {
  try {
    // --------------------------------
    // Environment variables
    // --------------------------------

    const razorpayKeyId = getRequiredEnv("RAZORPAY_KEY_ID");
    const razorpayKeySecret = getRequiredEnv(
      "RAZORPAY_KEY_SECRET"
    );
    const supabaseUrl = getRequiredEnv(
      "NEXT_PUBLIC_SUPABASE_URL"
    );
    const supabaseServiceRoleKey = getRequiredEnv(
      "SUPABASE_SERVICE_ROLE_KEY"
    );

    // --------------------------------
    // Razorpay server client
    // --------------------------------

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

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

    const body =
      (await request.json()) as CreatePaymentOrderRequest;

    const orderId =
      typeof body.orderId === "string"
        ? body.orderId.trim()
        : "";

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    // --------------------------------
    // Get our Supabase order
    // --------------------------------

    const { data: order, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .select(
          `
            id,
            total_amount,
            payment_status,
            razorpay_order_id,
            customer_name,
            email,
            phone
          `
        )
        .eq("id", orderId)
        .single();

    if (orderError) {
      console.error(
        "Supabase order lookup failed:",
        orderError
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
    // Prevent paying an already-paid order
    // --------------------------------

    if (order.payment_status === "paid") {
      return NextResponse.json(
        {
          error: "This order has already been paid.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Validate order amount
    // --------------------------------

    const totalAmount = Number(order.total_amount);

    if (
      !Number.isFinite(totalAmount) ||
      totalAmount <= 0
    ) {
      console.error(
        "Invalid order total:",
        order.id,
        order.total_amount
      );

      return NextResponse.json(
        { error: "Invalid order amount." },
        { status: 500 }
      );
    }

    const amountInPaise = Math.round(totalAmount * 100);

    if (
      !Number.isSafeInteger(amountInPaise) ||
      amountInPaise < 100
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid payment amount. The minimum payment is ₹1.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Reuse existing Razorpay order
    // --------------------------------

    if (order.razorpay_order_id) {
      return NextResponse.json({
        success: true,
        razorpayOrderId: order.razorpay_order_id,
        amount: amountInPaise,
        currency: "INR",
        customer: {
          name: order.customer_name,
          email: order.email,
          phone: order.phone,
        },
      });
    }

    // --------------------------------
    // Create Razorpay order
    // --------------------------------

    const receipt = `bakery_${order.id.slice(0, 8)}`;

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
      notes: {
        supabase_order_id: order.id,
      },
    });

    // --------------------------------
    // Save Razorpay order ID
    // --------------------------------

    const { error: updateError } =
      await supabaseAdmin
        .from("orders")
        .update({
          razorpay_order_id: razorpayOrder.id,
        })
        .eq("id", order.id)
        .is("razorpay_order_id", null);

    if (updateError) {
      console.error(
        "Failed to save Razorpay order ID:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            "Payment order was created, but it could not be linked to the bakery order.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      customer: {
        name: order.customer_name,
        email: order.email,
        phone: order.phone,
      },
    });
  } catch (error: unknown) {
    console.error("Create Razorpay order error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown payment error.";

    // Configuration errors are useful during development,
    // but don't expose server internals to customers.
    if (
      message.includes("is not configured")
    ) {
      return NextResponse.json(
        {
          error:
            "Payment service is not configured correctly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create payment order.",
      },
      { status: 500 }
    );
  }
}