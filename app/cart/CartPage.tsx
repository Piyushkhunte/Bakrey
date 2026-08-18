"use client";

import Link from "next/link";
import { urlFor } from "../../sanity/lib/image";
import { useCart } from "../context/cartContext";
;

export default function CartPage() {
  const { items, subtotal, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const deliveryFee = subtotal > 0 && subtotal < 200 ? 40 : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-5 py-16 text-[#402b22]">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/"
            className="text-sm font-bold text-[#b64c2d] underline underline-offset-4"
          >
            ← Back to bakery
          </Link>

          <div className="mx-auto mt-10 grid size-20 place-items-center rounded-full bg-[#f2e1cb] text-3xl">
            🛒
          </div>

          <h1 className="mt-6 font-display text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-3 text-[#76584a]">
            Add some fresh bakes and they will appear here.
          </p>

          <Link
            href="/#menu"
            className="mt-7 inline-block rounded-full bg-[#4b2719] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#d86436]"
          >
            Browse our bakes →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf2] px-5 py-10 text-[#402b22] sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              href="/"
              className="text-sm font-bold text-[#b64c2d] underline underline-offset-4"
            >
              ← Continue shopping
            </Link>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-[#76584a]">
              Review your fresh bakes before checkout.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-bold text-[#a54a2e] underline underline-offset-4"
          >
            Clear cart
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item._id}
                className="flex gap-4 rounded-3xl bg-white p-4 shadow-[0_6px_22px_rgba(75,39,25,.07)]"
              >
                <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#f2e1cb] text-2xl sm:size-32">
                  {item.image && (
                    <img
                      src={urlFor(item.image)
                        .width(256)
                        .height(256)
                        .fit("crop")
                        .url()}
                      alt={item.name}
                      width="256"
                      height="256"
                      className="absolute inset-0 z-10 size-full object-cover"
                    />
                  )}

                  🥐
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm font-bold text-[#c65334]">
                        ₹{item.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item._id)}
                      className="text-xs font-bold text-[#a54a2e]"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="flex items-center overflow-hidden rounded-full border border-[#4b2719]/15">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="grid size-9 place-items-center text-lg hover:bg-[#f2e1cb]"
                      >
                        −
                      </button>

                      <span className="grid min-w-10 place-items-center text-sm font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity + 1,
                          )
                        }
                        className="grid size-9 place-items-center text-lg hover:bg-[#f2e1cb]"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-bold text-[#4b2719]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-3xl bg-[#4b2719] p-6 text-white lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5ba77]">
              Order summary
            </p>

            <h2 className="mt-2 font-display text-2xl">
              Almost ready!
            </h2>

            <div className="mt-6 space-y-4 border-y border-white/10 py-5 text-sm">
              <div className="flex justify-between">
                <span className="text-white/65">
                  Subtotal
                </span>

                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/65">
                  Delivery
                </span>

                <span>
                  {deliveryFee === 0
                    ? "FREE"
                    : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {subtotal < 200 && (
              <p className="mt-4 rounded-2xl bg-white/10 p-3 text-xs leading-5 text-white/75">
                Add ₹{200 - subtotal} more to unlock free home delivery.
              </p>
            )}

            <Link
              href="/checkout"
              className="mt-6 block rounded-full bg-[#d86436] px-6 py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#c65334]"
            >
              Proceed to Checkout →
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}