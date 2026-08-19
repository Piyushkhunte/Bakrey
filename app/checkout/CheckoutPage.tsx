"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Script from "next/script";
import { useCart } from "../context/cartContext";

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions,
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

type Toast = {
  type: "success" | "error";
  message: string;
};

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    clearCart,
  } = useCart();

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
  const [toast, setToast] = useState<Toast | null>(null);

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (
    type: Toast["type"],
    message: string,
    duration = 3000,
  ) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({
      type,
      message,
    });

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, duration);
  };

  const deliveryFee =
    fulfillmentType === "delivery" && subtotal > 0 && subtotal < 200
      ? 40
      : 0;

  const total = subtotal + deliveryFee;

  const normalizePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");

    if (digits.length === 10) {
      return `+91${digits}`;
    }

    if (digits.length === 12 && digits.startsWith("91")) {
      return `+${digits}`;
    }

    return null;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (items.length === 0) {
      showToast("error", "Your cart is empty.");
      return;
    }

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const address = formData.address.trim();
    const notes = formData.notes.trim();

    if (!name) {
      showToast("error", "Please enter your full name.");
      return;
    }

    const normalizedPhone = normalizePhone(phone);

    if (!normalizedPhone) {
      showToast(
        "error",
        "Please enter a valid 10-digit Indian phone number.",
      );
      return;
    }

    if (fulfillmentType === "delivery" && !address) {
      showToast(
        "error",
        "Please enter your delivery address.",
      );
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      showToast(
        "error",
        "Please enter a valid email address.",
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * 1. Create the bakery order in Supabase.
       */
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name,
            phone: normalizedPhone,
            email,
            address,
            notes,
          },
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
          orderData.error || "Failed to create order.",
        );
      }

      if (!orderData.orderId) {
        throw new Error(
          "The order was created but no order ID was returned.",
        );
      }

      /*
       * 2. Create the Razorpay payment order.
       */
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
        },
      );

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(
          paymentData.error ||
            "Failed to create Razorpay order.",
        );
      }

      if (
        !paymentData.razorpayOrderId ||
        !paymentData.amount ||
        !paymentData.currency
      ) {
        throw new Error(
          "Invalid payment order response from the server.",
        );
      }

      /*
       * 3. Make sure Razorpay Checkout has loaded.
       */
      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout has not loaded yet. Please refresh the page and try again.",
        );
      }

      const razorpayKey =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        throw new Error(
          "Razorpay configuration is missing. Please contact the bakery.",
        );
      }

      /*
       * 4. Open Razorpay Checkout.
       */
      const razorpay = new window.Razorpay({
        key: razorpayKey,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Piyush's Bakery",
        description: "Bakery Order",
        order_id: paymentData.razorpayOrderId,

        prefill: {
          name,
          email: email || undefined,
          contact: normalizedPhone,
        },

        notes: {
          address,
        },

        theme: {
          color: "#4b2719",
        },

        /*
         * 5. Razorpay payment callback.
         */
        handler: async (response) => {
          try {
            setLoading(true);

            /*
             * 6. Verify payment on the server.
             */
            const verifyResponse = await fetch(
              "/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: orderData.orderId,
                  razorpay_payment_id:
                    response.razorpay_payment_id,
                  razorpay_signature:
                    response.razorpay_signature,
                }),
              },
            );

            const verifyData =
              await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(
                verifyData.error ||
                  "Payment verification failed.",
              );
            }

            showToast(
              "success",
              verifyData.smsSent
                ? "Payment successful! Your order is confirmed. We've sent confirmation to your phone."
                : "Payment successful! Your order is confirmed and being prepared.",
              2200,
            );

            clearCart();

            window.setTimeout(() => {
              window.location.href =
                `/order-success?orderId=${encodeURIComponent(
                  orderData.orderId,
                )}`;
            }, 2200);
          } catch (error) {
            console.error(
              "Payment verification error:",
              error,
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
            showToast(
              "error",
              "Payment was not completed. Your order has been saved; you can try again when you are ready.",
              5000,
            );

            setLoading(false);
          },
        },
      });

      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Something went wrong while starting checkout.",
      );

      setLoading(false);
    }
  };

  /*
   * Empty cart.
   */
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-5 py-16 text-[#402b22]">
        <div className="mx-auto max-w-2xl text-center">
          <div
            className="mx-auto grid size-20 place-items-center rounded-full bg-[#f2e1cb] text-3xl"
            aria-hidden="true"
          >
            🛒
          </div>

          <h1 className="mt-6 font-display text-4xl">
            Your cart is empty.
          </h1>

          <p className="mt-3 text-[#76584a]">
            Add some delicious bakes before checking out.
          </p>

          <Link
            href="/order"
            className="mt-6 inline-block rounded-full bg-[#4b2719] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d86436]"
          >
            Browse bakes →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {toast && (
        <div
          role="alert"
          aria-live="assertive"
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

          <p className="leading-5">
            {toast.message}
          </p>
        </div>
      )}

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <main className="min-h-screen bg-[#fffaf2] text-[#402b22]">
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

        <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <p className="eyebrow">
            Almost there
          </p>

          <h1 className="mt-3 font-display text-5xl text-[#45271c]">
            Checkout
          </h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
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
                  <label
                    htmlFor="checkout-name"
                    className="text-sm font-bold"
                  >
                    Full name *
                  </label>

                  <input
                    id="checkout-name"
                    required
                    autoComplete="name"
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                    placeholder="Your name"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="text-sm font-bold"
                  >
                    Phone number *
                  </label>

                  <input
                    id="checkout-phone"
                    required
                    autoComplete="tel"
                    type="tel"
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                    placeholder="9876543210"
                  />

                  <p className="mt-1.5 text-xs text-[#76584a]">
                    Enter your 10-digit Indian mobile number.
                  </p>
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="checkout-email"
                    className="text-sm font-bold"
                  >
                    Email
                  </label>

                  <input
                    id="checkout-email"
                    autoComplete="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                    placeholder="you@example.com"
                  />
                </div>

                {/* FULFILLMENT */}

                <fieldset>
                  <legend className="text-sm font-bold">
                    Fulfillment
                  </legend>

                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      aria-pressed={
                        fulfillmentType === "delivery"
                      }
                      onClick={() =>
                        setFulfillmentType("delivery")
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                        fulfillmentType === "delivery"
                          ? "border-[#4b2719] bg-[#4b2719] text-white"
                          : "border-[#4b2719]/15 bg-[#fffaf2] hover:border-[#d86436]"
                      }`}
                    >
                      Home Delivery
                    </button>

                    <button
                      type="button"
                      aria-pressed={
                        fulfillmentType === "pickup"
                      }
                      onClick={() =>
                        setFulfillmentType("pickup")
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                        fulfillmentType === "pickup"
                          ? "border-[#4b2719] bg-[#4b2719] text-white"
                          : "border-[#4b2719]/15 bg-[#fffaf2] hover:border-[#d86436]"
                      }`}
                    >
                      Store Pickup
                    </button>
                  </div>
                </fieldset>

                {/* ADDRESS */}

                {fulfillmentType === "delivery" && (
                  <div>
                    <label
                      htmlFor="checkout-address"
                      className="text-sm font-bold"
                    >
                      Delivery address *
                    </label>

                    <textarea
                      id="checkout-address"
                      required
                      autoComplete="street-address"
                      value={formData.address}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          address: event.target.value,
                        }))
                      }
                      rows={4}
                      className="mt-2 w-full resize-none rounded-xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#d86436]"
                      placeholder="House / Flat, Building, Area, Pune"
                    />
                  </div>
                )}

                {/* NOTES */}

                <div>
                  <label
                    htmlFor="checkout-notes"
                    className="text-sm font-bold"
                  >
                    Order notes
                  </label>

                  <textarea
                    id="checkout-notes"
                    value={formData.notes}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        notes: event.target.value,
                      }))
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
                aria-busy={loading}
                className="mt-8 w-full rounded-full bg-[#d86436] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#b94f2d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : `Pay ₹${total} →`}
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-[#76584a]">
                You will be redirected to Razorpay&apos;s secure
                checkout to complete your payment.
              </p>
            </form>

            {/* ORDER SUMMARY */}

            <aside className="h-fit rounded-[2rem] bg-[#4b2719] p-7 text-white lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5ba77]">
                Your order
              </p>

              <h2 className="mt-2 font-display text-3xl">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-white/75">
                      {item.name} × {item.quantity}
                    </span>

                    <span className="shrink-0 font-bold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">
                    Subtotal
                  </span>

                  <span>₹{subtotal}</span>
                </div>

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

                <div className="flex justify-between border-t border-white/15 pt-4 text-xl font-bold">
                  <span>Total</span>

                  <span>₹{total}</span>
                </div>
              </div>

              {fulfillmentType === "delivery" &&
                subtotal < 200 && (
                  <p className="mt-5 rounded-2xl bg-white/10 p-3 text-xs leading-5 text-white/75">
                    Add ₹{200 - subtotal} more to unlock
                    free home delivery.
                  </p>
                )}

              {fulfillmentType === "pickup" && (
                <p className="mt-5 rounded-2xl bg-white/10 p-3 text-xs leading-5 text-white/75">
                  Store pickup selected. No delivery charge
                  will be added.
                </p>
              )}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}