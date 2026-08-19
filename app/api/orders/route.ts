import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { client as sanityClient } from "../../../sanity/lib/client";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

type CheckoutRequest = {
  customer: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    notes?: string;
  };
  fulfillmentType: "delivery" | "pickup";
  items: CheckoutItem[];
};

type SanityProduct = {
  _id: string;
  name: string;
  price: number;
  isAvailable: boolean;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable."
  );
}

const supabaseAdmin = createSupabaseClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;

    const { customer, fulfillmentType, items } = body;

    // -----------------------------
    // Basic validation
    // -----------------------------

    if (!customer?.name?.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!customer?.phone?.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (
      fulfillmentType !== "delivery" &&
      fulfillmentType !== "pickup"
    ) {
      return NextResponse.json(
        { error: "Invalid fulfillment type." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    if (items.length > 100) {
      return NextResponse.json(
        { error: "Too many different products in one order." },
        { status: 400 }
      );
    }

    if (
      fulfillmentType === "delivery" &&
      !customer.address?.trim()
    ) {
      return NextResponse.json(
        { error: "Delivery address is required." },
        { status: 400 }
      );
    }

    // -----------------------------
    // Validate quantities and IDs
    // -----------------------------

    for (const item of items) {
      if (
        !item ||
        typeof item.productId !== "string" ||
        !item.productId.trim() ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0 ||
        item.quantity > 50
      ) {
        return NextResponse.json(
          { error: "Invalid product quantity." },
          { status: 400 }
        );
      }
    }

    // Prevent the same product from being submitted twice.
    const uniqueProductIds = new Set(
      items.map((item) => item.productId.trim())
    );

    if (uniqueProductIds.size !== items.length) {
      return NextResponse.json(
        { error: "Duplicate products were found in your cart." },
        { status: 400 }
      );
    }

    const productIds = items.map((item) => item.productId.trim());

    // -----------------------------
    // Fetch real products from Sanity
    // -----------------------------

    const products = (await sanityClient.fetch(
      `*[
        _type == "product" &&
        _id in $productIds &&
        isAvailable == true
      ]{
        _id,
        name,
        price,
        isAvailable
      }`,
      { productIds },
      {
        next: {
          revalidate: 0,
        },
      }
    )) as SanityProduct[];

    if (!products || products.length !== productIds.length) {
      return NextResponse.json(
        {
          error:
            "One or more products are no longer available.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Build verified order items
    // -----------------------------

    const orderItems: Array<{
      product_id: string;
      product_name: string;
      unit_price: number;
      quantity: number;
      item_total: number;
    }> = [];

    let subtotal = 0;

    for (const item of items) {
      const product = products.find(
        (product) => product._id === item.productId
      );

      if (!product) {
        return NextResponse.json(
          {
            error: `Product ${item.productId} is unavailable.`,
          },
          { status: 400 }
        );
      }

      const unitPrice = Number(product.price);

      if (!Number.isFinite(unitPrice) || unitPrice < 0) {
        console.error(
          "Invalid product price in Sanity:",
          product._id,
          product.price
        );

        return NextResponse.json(
          { error: "One or more products have an invalid price." },
          { status: 500 }
        );
      }

      const itemTotal = unitPrice * item.quantity;

      subtotal += itemTotal;

      orderItems.push({
        product_id: product._id,
        product_name: product.name,
        unit_price: unitPrice,
        quantity: item.quantity,
        item_total: itemTotal,
      });
    }

    // -----------------------------
    // Calculate delivery fee
    // -----------------------------

    const deliveryFee =
      fulfillmentType === "delivery" && subtotal < 200
        ? 40
        : 0;

    const totalAmount = subtotal + deliveryFee;

    // -----------------------------
    // Create order
    // -----------------------------

    const { data: order, error: orderError } =
      await supabaseAdmin
        .from("orders")
        .insert({
          customer_name: customer.name.trim(),
          phone: customer.phone.trim(),
          email: customer.email?.trim() || null,

          fulfillment_type: fulfillmentType,

          delivery_address:
            fulfillmentType === "delivery"
              ? customer.address?.trim() || null
              : null,

          notes: customer.notes?.trim() || null,

          subtotal,
          delivery_fee: deliveryFee,
          total_amount: totalAmount,

          order_status: "pending",
          payment_status: "pending",
        })
        .select("id")
        .single();

    if (orderError || !order) {
      console.error("Order creation failed:", orderError);

      return NextResponse.json(
        { error: "Failed to create order." },
        { status: 500 }
      );
    }

    // -----------------------------
    // Create order items
    // -----------------------------

    const itemsToInsert = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsError) {
      console.error(
        "Order items creation failed:",
        itemsError
      );

      // Roll back the parent order if item creation fails.
      await supabaseAdmin
        .from("orders")
        .delete()
        .eq("id", order.id);

      return NextResponse.json(
        { error: "Failed to create order items." },
        { status: 500 }
      );
    }

    // -----------------------------
    // Return verified order data
    // -----------------------------

    return NextResponse.json({
      success: true,
      orderId: order.id,
      subtotal,
      deliveryFee,
      totalAmount,
    });
  } catch (error) {
    console.error("Orders API error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while creating the order.",
      },
      { status: 500 }
    );
  }
}