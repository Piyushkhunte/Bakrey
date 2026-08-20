import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pre-Order Cakes & Bakery Items in Pune",
  description:
    "Pre-order cakes, pastries, snacks and bakery favourites from Piyush's Bakery in Pune for birthdays, parties and special occasions.",
  alternates: {
    canonical: "/pre-order",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Pre-Order Cakes & Bakery Items in Pune | Piyush's Bakery",
    description:
      "Plan ahead and pre-order fresh cakes, pastries and bakery favourites from Piyush's Bakery in Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "Piyush's Bakery",
  },
};

export default function PreOrderPage() {
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
          <p className="eyebrow">Plan something special</p>

          <h1 className="mt-3 font-display text-5xl leading-tight text-[#45271c] md:text-6xl">
            Pre-order cakes and bakery favourites.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6d5145]">
            Planning a birthday, celebration, college event, family gathering
            or party? Get in touch with our bakery team and plan your order in
            advance.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] bg-[#f2e1cb] p-7">
            <div className="text-3xl" aria-hidden="true">
              🎂
            </div>

            <h2 className="mt-5 font-display text-2xl text-[#4b2719]">
              Cakes &amp; celebrations
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76584a]">
              Planning a birthday or special occasion? Discuss your preferred
              cake, flavour, size and requirements with our team.
            </p>
          </article>

          <article className="rounded-[2rem] bg-white p-7 shadow-[0_8px_30px_rgba(75,39,25,.06)]">
            <div className="text-3xl" aria-hidden="true">
              🥐
            </div>

            <h2 className="mt-5 font-display text-2xl text-[#4b2719]">
              Party &amp; bulk orders
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76584a]">
              Need multiple pastries, snacks, savouries or other bakery items
              for an event? Contact us to discuss your requirements.
            </p>
          </article>

          <article className="rounded-[2rem] bg-white p-7 shadow-[0_8px_30px_rgba(75,39,25,.06)]">
            <div className="text-3xl" aria-hidden="true">
              📅
            </div>

            <h2 className="mt-5 font-display text-2xl text-[#4b2719]">
              Plan ahead
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#76584a]">
              Tell us your preferred date and order requirements early so our
              team can help with availability and preparation.
            </p>
          </article>
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#4b2719] p-8 text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5ba77]">
            Let&apos;s plan your order
          </p>

          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            Talk to our bakery team.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Share what you&apos;re planning, the items you need, your preferred
            date and any special requirements. Our team can help you discuss
            the order before you place it.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://wa.me/918767342441?text=Hello%20Piyush's%20Bakery!%20I'd%20like%20to%20discuss%20a%20pre-order."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Talk to Piyush's Bakery on WhatsApp"
              className="rounded-full bg-[#d86436] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#c65334]"
            >
              Talk on WhatsApp →
            </a>

            <a
              href="mailto:hello@piyushsbakery.in?subject=Bakery%20Pre-Order%20Enquiry"
              aria-label="Email Piyush's Bakery about a pre-order"
              className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Email our team
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/#menu"
            className="rounded-3xl border border-[#4b2719]/10 bg-white p-6 transition hover:border-[#d86436]/30 hover:shadow-[0_8px_30px_rgba(75,39,25,.06)]"
          >
            <h2 className="font-display text-2xl text-[#4b2719]">
              Browse our bakes
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#76584a]">
              Explore cakes, pastries, snacks, savouries and other fresh bakery
              favourites.
            </p>

            <span className="mt-4 inline-block text-sm font-bold text-[#b64c2d]">
              View the menu →
            </span>
          </Link>

          <Link
            href="/delivery-policy"
            className="rounded-3xl border border-[#4b2719]/10 bg-white p-6 transition hover:border-[#d86436]/30 hover:shadow-[0_8px_30px_rgba(75,39,25,.06)]"
          >
            <h2 className="font-display text-2xl text-[#4b2719]">
              Check delivery details
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#76584a]">
              Review delivery information before planning your pre-order.
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
