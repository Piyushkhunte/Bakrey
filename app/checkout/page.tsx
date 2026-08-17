"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useCart } from "../context/cartContext";


declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  notes?: {
    address?: string;
  };

  theme?: {
    color?: string;
  };

  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;

  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [fulfillmentType, setFulfillmentType] = useState<
    "delivery" | "pickup"
  >("delivery");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (
    type: "success" | "error",
    message: string,
    duration = 3000,
  ) => {
    setToast({ type, message });

    window.setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const deliveryFee =
    fulfillmentType === "delivery" && subtotal < 200
      ? 40
      : 0;

  const total = subtotal + deliveryFee;

  // --------------------------------
  // Submit checkout
  // --------------------------------

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (items.length === 0) {
      showToast("error", "Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      // --------------------------------
      // 1. Create our Supabase order
      // --------------------------------

      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,
          fulfillmentType,
          items: items.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.error ||
            "Failed to create order."
        );
      }

      // --------------------------------
      // 2. Create Razorpay order
      // --------------------------------

      const paymentResponse = await fetch(
        "/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderData.orderId,
          }),
        }
      );

      const paymentData =
        await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(
          paymentData.error ||
            "Failed to create Razorpay order."
        );
      }

      // --------------------------------
      // 3. Check Razorpay script
      // --------------------------------

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout has not loaded yet. Please refresh the page and try again."
        );
      }

      // --------------------------------
      // 4. Open Razorpay Checkout
      // --------------------------------

      const razorpay =
        new window.Razorpay({
          key:
            process.env
              .NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: paymentData.amount,
          currency: paymentData.currency,
          name: "Piyush's Bakery",
          description: "Bakery Order",
          order_id:
            paymentData.razorpayOrderId,

          prefill: {
            name: formData.name,
            email: formData.email,
            contact:
              formData.phone.startsWith("+")
                ? formData.phone
                : `+91${formData.phone}`,
          },

          notes: {
            address: formData.address,
          },

          theme: {
            color: "#4b2719",
          },

          // --------------------------------
          // 5. Razorpay payment callback
          // --------------------------------

          handler: async (response) => {
            try {
              setLoading(true);

              // --------------------------------
              // 6. Verify payment on server
              // --------------------------------

              const verifyResponse =
                await fetch(
                  "/api/payment/verify",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type":
                        "application/json",
                    },
                    body: JSON.stringify({
                      orderId:
                        orderData.orderId,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,
                    }),
                  }
                );

              const verifyData =
                await verifyResponse.json();

              if (!verifyResponse.ok) {
                throw new Error(
                  verifyData.error ||
                    "Payment verification failed."
                );
              }

              showToast(
                "success",
                "Payment successful! Your order has been confirmed.",
                2200,
              );

              clearCart();

              window.setTimeout(() => {
                window.location.href =
                  `/order-success?orderId=${orderData.orderId}`;
              }, 2200);
            } catch (error) {
              console.error(
                "Payment verification error:",
                error
              );

              showToast(
                "error",
                error instanceof Error
                  ? error.message
                  : "Payment verification failed.",
              );

              setLoading(false);
            }
          },

          modal: {
            ondismiss: () => {
              setLoading(false);
            },
          },
        });

      razorpay.open();
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );

      setLoading(false);
    }
  };

  // --------------------------------
  // Empty cart
  // --------------------------------

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-5 py-16 text-[#402b22]">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl">
            Your cart is empty.
          </h1>

          <p className="mt-3 text-[#76584a]">
            Add some delicious bakes before
            checking out.
          </p>

          <Link
            href="/order"
            className="mt-6 inline-block rounded-full bg-[#4b2719] px-6 py-3 text-sm font-bold text-white"
          >
            Browse bakes →
          </Link>
        </div>
      </main>
    );
  }

  // --------------------------------
  // Checkout page
  // --------------------------------

  return (
    <>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-5 top-5 z-[9999] flex max-w-sm items-start gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-2xl ${
            toast.type === "success"
              ? "bg-[#2f7d4a]"
              : "bg-[#a63d2f]"
          }`}
        >
          <span
            className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/20"
            aria-hidden="true"
          >
            {toast.type === "success" ? "✓" : "!"}
          </span>

          <p className="leading-5">{toast.message}</p>
        </div>
      )}

      {/* Razorpay Checkout script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <main className="min-h-screen bg-[#fffaf2] text-[#402b22]">
        {/* HEADER */}

        <header className="border-b border-[#4b2719]/10 bg-[#fffaf2]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-[#4b2719]"
            >
              Piyush&apos;s Bakery
            </Link>

            <Link
              href="/cart"
              className="text-sm font-bold text-[#825b4a] hover:text-[#d86436]"
            >
              ← Back to cart
            </Link>
          </div>
        </header>

        {/* CHECKOUT */}

        <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <p className="eyebrow">
            Almost there
          </p>

          <h1 className="mt-3 font-display text-5xl text-[#45271c]">
            Checkout
          </h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] bg-white p-7 shadow-sm"
            >
              <h2 className="font-display text-3xl">
                Your details
              </h2>

              <div className="mt-7 grid gap-5">
                {/* NAME */}

                <div>
                  <label className="text-sm font-bold">
                    Full name *
                  </label>

                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                    placeholder="Your name"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="text-sm font-bold">
                    Phone number *
                  </label>

                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                    placeholder="9876543210"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="text-sm font-bold">
                    Email
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                    placeholder="you@example.com"
                  />
                </div>

                {/* FULFILLMENT */}

                <div>
                  <label className="text-sm font-bold">
                    Fulfillment
                  </label>

                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFulfillmentType(
                          "delivery"
                        )
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-bold ${
                        fulfillmentType ===
                        "delivery"
                          ? "border-[#4b2719] bg-[#4b2719] text-white"
                          : "border-[#4b2719]/15 bg-[#fffaf2]"
                      }`}
                    >
                      Home Delivery
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFulfillmentType(
                          "pickup"
                        )
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-bold ${
                        fulfillmentType ===
                        "pickup"
                          ? "border-[#4b2719] bg-[#4b2719] text-white"
                          : "border-[#4b2719]/15 bg-[#fffaf2]"
                      }`}
                    >
                      Store Pickup
                    </button>
                  </div>
                </div>

                {/* ADDRESS */}

                {fulfillmentType ===
                  "delivery" && (
                  <div>
                    <label className="text-sm font-bold">
                      Delivery address *
                    </label>

                    <textarea
                      required
                      value={
                        formData.address
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address:
                            e.target.value,
                        })
                      }
                      rows={4}
                      className="mt-2 w-full resize-none rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                      placeholder="House / Flat, Building, Area, Pune"
                    />
                  </div>
                )}

                {/* NOTES */}

                <div>
                  <label className="text-sm font-bold">
                    Order notes
                  </label>

                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notes: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-2 w-full resize-none rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                    placeholder="Any special instructions?"
                  />
                </div>
              </div>

              {/* PAYMENT BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-full bg-[#d86436] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#b94f2d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : `Pay ₹${total} →`}
              </button>
            </form>

            {/* ORDER SUMMARY */}

            <aside className="h-fit rounded-[2rem] bg-[#4b2719] p-7 text-white">
              <h2 className="font-display text-3xl">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-white/75">
                      {item.name} ×{" "}
                      {item.quantity}
                    </span>

                    <span className="font-bold">
                      ₹
                      {item.price *
                        item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm">
                {/* SUBTOTAL */}

                <div className="flex justify-between">
                  <span className="text-white/70">
                    Subtotal
                  </span>

                  <span>
                    ₹{subtotal}
                  </span>
                </div>

                {/* DELIVERY */}

                <div className="flex justify-between">
                  <span className="text-white/70">
                    Delivery
                  </span>

                  <span>
                    {deliveryFee === 0
                      ? "FREE"
                      : `₹${deliveryFee}`}
                  </span>
                </div>

                {/* TOTAL */}

                <div className="flex justify-between border-t border-white/15 pt-4 text-xl font-bold">
                  <span>Total</span>

                  <span>
                    ₹{total}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}