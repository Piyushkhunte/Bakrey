import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Bakery Favourites Online in Pune",
  description:
    "Order fresh cakes, pastries, snacks, savouries, breads and desserts from Piyush's Bakery in Pune. Add your favourites to the cart and checkout online.",
  alternates: {
    canonical: "/order",
  },
  openGraph: {
    title: "Order Online | Piyush's Bakery",
    description:
      "Order fresh cakes, pastries, snacks, savouries, breads and desserts from Piyush's Bakery in Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "Piyush's Bakery",
  },
};

export default function OrderPage() {
  return (
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
            href="/"
            className="text-sm font-bold text-[#825b4a] hover:text-[#d86436]"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow">Freshly baked for you</p>

          <h1 className="mt-3 font-display text-5xl leading-tight text-[#45271c] md:text-6xl">
            Order fresh bakery favourites online.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6d5145]">
            Choose from our cakes, pastries, breads, snacks, savouries,
            desserts and other fresh bakery favourites. Add what you love to
            your cart and complete your order online.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] bg-[#f2e1cb] p-7">
            <div className="text-3xl">🍰</div>

            <h2 className="mt-5 font-display text-2xl text-[#4b2719]">
              Choose your bakes
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76584a]">
              Explore our fresh bakery selection and add your favourite
              products to your cart.
            </p>
          </article>

          <article className="rounded-[2rem] bg-white p-7 shadow-[0_8px_30px_rgba(75,39,25,.06)]">
            <div className="text-3xl">🛒</div>

            <h2 className="mt-5 font-display text-2xl text-[#4b2719]">
              Review your cart
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76584a]">
              Adjust quantities, review your subtotal and check your delivery
              charges before checkout.
            </p>
          </article>

          <article className="rounded-[2rem] bg-white p-7 shadow-[0_8px_30px_rgba(75,39,25,.06)]">
            <div className="text-3xl">💳</div>

            <h2 className="mt-5 font-display text-2xl text-[#4b2719]">
              Checkout securely
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76584a]">
              Choose delivery or pickup, provide your details and complete
              payment securely through the checkout process.
            </p>
          </article>
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#4b2719] p-8 text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5ba77]">
            Ready when you are
          </p>

          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            Fresh bakes are just a few clicks away.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Browse the available products, build your cart and continue to
            checkout. Orders can be placed for eligible delivery areas or
            pickup according to the available options.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#menu"
              className="rounded-full bg-[#d86436] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#c65334]"
            >
              Browse our bakes →
            </Link>

            <Link
              href="/cart"
              className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View cart
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/pre-order"
            className="rounded-3xl border border-[#4b2719]/10 bg-white p-6 transition hover:border-[#d86436]/30 hover:shadow-[0_8px_30px_rgba(75,39,25,.06)]"
          >
            <h2 className="font-display text-2xl text-[#4b2719]">
              Planning ahead?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#76584a]">
              Pre-order your bakery favourites for a future date.
            </p>

            <span className="mt-4 inline-block text-sm font-bold text-[#b64c2d]">
              Pre-order →
            </span>
          </Link>

          <Link
            href="/delivery-policy"
            className="rounded-3xl border border-[#4b2719]/10 bg-white p-6 transition hover:border-[#d86436]/30 hover:shadow-[0_8px_30px_rgba(75,39,25,.06)]"
          >
            <h2 className="font-display text-2xl text-[#4b2719]">
              Need delivery information?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#76584a]">
              Check our delivery areas, charges and important delivery
              information.
            </p>

            <span className="mt-4 inline-block text-sm font-bold text-[#b64c2d]">
              Delivery policy →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
