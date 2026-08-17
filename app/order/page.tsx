import Link from "next/link";

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
        <div className="max-w-2xl">
          <p className="eyebrow">Freshly baked for you</p>

          <h1 className="mt-3 font-display text-5xl leading-tight text-[#45271c]">
            Order your favourites.
          </h1>

          <p className="mt-5 text-lg leading-7 text-[#6d5145]">
            Choose your favourite bakes, add them to your cart, and place your
            order online.
          </p>
        </div>

        <div className="mt-12 rounded-[2rem] bg-[#f2e1cb] p-8">
          <h2 className="font-display text-3xl text-[#4b2719]">
            Online ordering is coming together.
          </h2>

          <p className="mt-3 max-w-xl text-[#76584a]">
            Next we&apos;ll connect your Sanity products to this page, add the
            shopping cart, checkout, Supabase order creation, and finally
            Razorpay payments.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#4b2719] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d86436]"
          >
            Browse bakery →
          </Link>
        </div>
      </section>
    </main>
  );
}