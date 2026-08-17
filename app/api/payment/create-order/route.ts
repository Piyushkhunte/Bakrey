import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    // Check environment variables first
    if (!process.env.RAZORPAY_KEY_ID) {
      console.error("❌ RAZORPAY_KEY_ID is missing");
      return NextResponse.json(
        { error: "RAZORPAY_KEY_ID is missing from .env.local" },
        { status: 500 }
      );
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ RAZORPAY_KEY_SECRET is missing");
      return NextResponse.json(
        {
          error:
            "RAZORPAY_KEY_SECRET is missing from .env.local",
        },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error(
        "❌ NEXT_PUBLIC_SUPABASE_URL is missing"
      );
      return NextResponse.json(
        {
          error:
            "NEXT_PUBLIC_SUPABASE_URL is missing from .env.local",
        },
        { status: 500 }
      );
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error(
        "❌ SUPABASE_SERVICE_ROLE_KEY is missing"
      );
      return NextResponse.json(
        {
          error:
            "SUPABASE_SERVICE_ROLE_KEY is missing from .env.local",
        },
        { status: 500 }
      );
    }

    // Never print the actual secret.
    console.log(
      "Razorpay Key ID:",
      process.env.RAZORPAY_KEY_ID
    );

    console.log(
      "Razorpay Secret loaded:",
      Boolean(process.env.RAZORPAY_KEY_SECRET)
    );

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const body = await request.json();

    const { orderId } = body;

    console.log("Supabase Order ID:", orderId);

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    // --------------------------------
    // Get our order
    // --------------------------------

    const { data: order, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .select(
          "id, total_amount, payment_status, razorpay_order_id, customer_name, email, phone"
        )
        .eq("id", orderId)
        .single();

    if (orderError) {
      console.error(
        "❌ Supabase order lookup error:",
        orderError
      );

      return NextResponse.json(
        {
          error: "Supabase order lookup failed.",
          details: orderError.message,
        },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    console.log("Order found:", {
      id: order.id,
      total_amount: order.total_amount,
      payment_status: order.payment_status,
    });

    if (order.payment_status === "paid") {
      return NextResponse.json(
        {
          error: "This order has already been paid.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Reuse existing Razorpay order
    // --------------------------------

    if (order.razorpay_order_id) {
      console.log(
        "Existing Razorpay order:",
        order.razorpay_order_id
      );

      return NextResponse.json({
        success: true,
        razorpayOrderId:
          order.razorpay_order_id,
        amount: Math.round(
          Number(order.total_amount) * 100
        ),
        currency: "INR",
      });
    }

    // --------------------------------
    // Calculate amount
    // --------------------------------

    const amountInPaise = Math.round(
      Number(order.total_amount) * 100
    );

    console.log(
      "Razorpay amount:",
      amountInPaise
    );

    if (
      !Number.isInteger(amountInPaise) ||
      amountInPaise < 100
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid Razorpay amount. Minimum amount is ₹1.",
          amountInPaise,
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Create Razorpay order
    // --------------------------------

    const receipt = `bakery_${order.id.slice(
      0,
      8
    )}`;

    console.log(
      "Creating Razorpay order with receipt:",
      receipt
    );

    const razorpayOrder =
      await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,
        notes: {
          supabase_order_id: order.id,
        },
      });

    console.log(
      "✅ Razorpay order created:",
      razorpayOrder.id
    );

    // --------------------------------
    // Save Razorpay order ID
    // --------------------------------

    const { error: updateError } =
      await supabaseAdmin
        .from("orders")
        .update({
          razorpay_order_id:
            razorpayOrder.id,
        })
        .eq("id", order.id);

    if (updateError) {
      console.error(
        "❌ Failed to save Razorpay order ID:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            "Razorpay order created but database update failed.",
          details: updateError.message,
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
  } catch (error: any) {
    console.error(
      "❌ RAZORPAY ERROR:",
      error
    );

    console.error(
      "❌ Razorpay error message:",
      error?.message
    );

    console.error(
      "❌ Razorpay error description:",
      error?.error?.description
    );

    console.error(
      "❌ Razorpay error code:",
      error?.error?.code
    );

    return NextResponse.json(
      {
        error:
          error?.error?.description ||
          error?.message ||
          "Failed to create Razorpay order.",
      },
      { status: 500 }
    );
  }
}