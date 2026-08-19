import type { Metadata } from "next";
import Image from "next/image";
import { client } from "../sanity/lib/client";
import ProductMenu from "./components/productMenu";
import WelcomeToast from "./components/WelcomeToast";
import CartButton from "./components/CartButton";
import Reviews from "./components/Reviews";
import AIFoodAssistant from "./components/AIFoodAssistant";
import MSG91OTP from "./components/MSG91OTP";
import CookieConsent from "./components/CookieConsent";

export const metadata: Metadata = {
  title: "Piyush's Bakery | Cakes, Pastries, Food & Snacks in Pune",

  description:
    "Piyush's Bakery near Bharati Vidyapeeth, Pune offers freshly baked cakes, pastries, breads, snacks, savouries, desserts and more with delivery and pickup.",

  keywords: [
    "Piyush's Bakery",
    "bakery in Pune",
    "bakery near Bharati Vidyapeeth",
    "cakes in Pune",
    "pastries in Pune",
    "fresh bakery Pune",
    "bakery food Pune",
    "snacks Pune",
    "desserts Pune",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Piyush's Bakery | Cakes, Pastries, Food & Snacks in Pune",
    description:
      "Fresh cakes, pastries, breads, snacks, savouries and desserts near Bharati Vidyapeeth, Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "Piyush's Bakery",
  },
};

const bakeryWhatsAppNumber = "918767342441";

const quickBakes = [
  "Tea cakes",
  "Cookies & rusks",
  "Birthday cakes",
  "Puffs & savoury",
  "Breads",
  "Dessert jars",
];

function createWhatsAppLink(message: string) {
  return `https://wa.me/${bakeryWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}

const faqs = [
  {
    question: "Do you offer same-day delivery?",
    answer:
      "Yes. We offer same-day delivery for eligible orders placed during our operating hours. Delivery availability can depend on your location and the day's order volume.",
  },
  {
    question: "Is home delivery free?",
    answer:
      "Home delivery is free on orders above ₹200. Delivery charges may apply to smaller orders depending on the delivery location.",
  },
  {
    question: "Can I pre-order a birthday or custom cake?",
    answer:
      "Yes. For birthday cakes, custom designs, or larger orders, use the Pre-Order option or contact our bakery team directly so we can confirm the design, size, price, and pickup or delivery time.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Online orders can be paid securely through Razorpay. Available payment options are shown during checkout.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "Cancellation or modification depends on how far your order has progressed. Contact us as soon as possible after placing the order and we will confirm what can be changed.",
  },
  {
    question: "Where are you located?",
    answer:
      "Piyush's Bakery is located near Bharati Vidyapeeth, Pune, Maharashtra.",
  },
  {
    question: "What are your opening hours?",
    answer: "We are open every day from 8:00 AM to 10:00 PM.",
  },
  {
    question: "How can I contact the bakery?",
    answer:
      "You can call us, contact us on WhatsApp, or use the email address shown in the Customer Care section of the footer.",
  },
];

export default async function Home() {
  const products = await client.fetch(
    `*[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      description,
      price,
      isFeatured,
      isAvailable,
      image,
      category->{
        _id,
        name,
        slug
      }
    }`,
    {},
    {
      next: {
        revalidate: 0,
      },
    },
  );

  return (
    <main className="overflow-hidden bg-[#fffaf2] text-[#402b22]">
      <div className="grain" aria-hidden="true" />

      {/* TOP BAR */}
      <div className="relative z-50 bg-[#4a2519] px-4 py-2 text-center text-[11px] font-bold tracking-[.12em] text-[#fff7e8] sm:text-xs">
        FREE HOME DELIVERY ON ORDERS ABOVE ₹200
        <span className="mx-2 text-[#f5ba77]">•</span>
        FRESHLY BAKED EVERY MORNING
        <span className="mx-2 text-[#f5ba77]">•</span>
        BHARATI VIDYAPEETH, PUNE
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#502c1a]/10 bg-[#fffaf2]/90 backdrop-blur-lg">
        <nav className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label="Piyush's Bakery home"
          >
            <Image
              src="/images/logo.webp"
              alt="Piyush's Bakery logo"
              width={54}
              height={54}
              className="size-12 rounded-full object-cover"
            />

            <span className="font-display text-[1.5rem] leading-none tracking-tight text-[#4b2719]">
              Piyush&apos;s
              <br />
              <span className="text-sm font-bold uppercase tracking-[.16em] text-[#b95b37]">
                Bakery
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            <a href="#menu" className="hover:text-[#d86436]">
              Our bakes
            </a>

            <a href="#offers" className="hover:text-[#d86436]">
              Offers
            </a>

            <a href="#story" className="hover:text-[#d86436]">
              Our story
            </a>

            <a href="#reviews" className="hover:text-[#d86436]">
              Reviews
            </a>

            <a href="#faq" className="hover:text-[#d86436]">
              FAQ
            </a>

            <a href="#visit" className="hover:text-[#d86436]">
              Visit us
            </a>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <p className="hidden text-right text-[11px] font-bold leading-4 text-[#76584a] xl:block">
              Open daily
              <br />
              8:00 AM – 10:00 PM
            </p>

            <CartButton />

            <a
              href="/order"
              className="rounded-full bg-[#4b2719] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#d86436]"
            >
              Order now →
            </a>
          </div>

          {/* MOBILE HAMBURGER MENU */}
          <details className="relative lg:hidden">
            <summary
              className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-[#4b2719]/15 text-lg"
              aria-label="Open menu"
            >
              ☰
            </summary>

            <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-[#4b2719]/10 bg-[#fffaf2] p-5 shadow-xl">
              <div className="grid gap-1 text-sm font-semibold">
                <a
                  href="#menu"
                  className="rounded-xl px-3 py-2.5 transition hover:bg-[#f2e1cb] hover:text-[#d86436]"
                >
                  Our bakes
                </a>

                <a
                  href="#offers"
                  className="rounded-xl px-3 py-2.5 transition hover:bg-[#f2e1cb] hover:text-[#d86436]"
                >
                  Offers
                </a>

                <a
                  href="#story"
                  className="rounded-xl px-3 py-2.5 transition hover:bg-[#f2e1cb] hover:text-[#d86436]"
                >
                  Our story
                </a>

                <a
                  href="#reviews"
                  className="rounded-xl px-3 py-2.5 transition hover:bg-[#f2e1cb] hover:text-[#d86436]"
                >
                  Reviews
                </a>

                <a
                  href="#faq"
                  className="rounded-xl px-3 py-2.5 transition hover:bg-[#f2e1cb] hover:text-[#d86436]"
                >
                  FAQ
                </a>

                <a
                  href="#visit"
                  className="rounded-xl px-3 py-2.5 transition hover:bg-[#f2e1cb] hover:text-[#d86436]"
                >
                  Visit us
                </a>

                <div className="my-2 border-t border-[#4b2719]/10" />

                <p className="px-3 py-2 text-xs font-bold text-[#76584a]">
                  Open daily: 8:00 AM – 10:00 PM
                </p>

                <a
                  href="/cart"
                  className="rounded-xl bg-[#4b2719] px-3 py-2.5 font-bold text-white transition hover:bg-[#d86436]"
                >
                  🛒 View Cart
                </a>

                <a
                  href="/pre-order"
                  className="rounded-xl px-3 py-2.5 font-bold text-[#b64c2d] transition hover:bg-[#f2e1cb]"
                >
                  Pre-Order
                </a>

                <a
                  href="/order"
                  className="rounded-xl bg-[#d86436] px-3 py-2.5 text-center font-bold text-white transition hover:bg-[#b64c2d]"
                >
                  Order Now →
                </a>
              </div>
            </div>
          </details>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative isolate bg-[#f8e6cf] py-14 lg:py-20"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,#fae5bd_0,transparent_28%),radial-gradient(circle_at_88%_79%,#eaa77e_0,transparent_26%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-px w-7 bg-[#b95735]" />
              Your neighbourhood bakery
            </p>

            <p className="mt-5 font-display text-lg text-[#a54a2e]">
              Hello, Bharati Vidyapeeth!
            </p>

            <h1 className="mt-2 font-display text-5xl leading-[.91] tracking-tight text-[#45271c] sm:text-6xl lg:text-[5.4rem]">
              Good days start with{" "}
              <em className="font-normal text-[#d86436]">good bakes.</em>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-[#6d5145]">
              From your 8 AM college rush to a family birthday at night,
              Piyush&apos;s Bakery brings the warm, freshly baked comfort
              everyone loves.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="rounded-full bg-[#d86436] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(216,100,54,.22)] transition hover:-translate-y-0.5"
              >
                Browse today&apos;s bakes
              </a>

              <a
                href="tel:+918767342441"
                className="rounded-full border border-[#4b2719]/20 px-6 py-3.5 text-sm font-bold transition hover:border-[#4b2719]"
              >
                Call to order
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[#835c4b]/20 pt-5 text-center">
              <p>
                <b className="block font-display text-2xl">4.9/5</b>
                <span className="text-[11px] text-[#805f50]">
                  local love
                </span>
              </p>

              <p>
                <b className="block font-display text-2xl">7 AM</b>
                <span className="text-[11px] text-[#805f50]">
                  fresh from oven
                </span>
              </p>

              <p>
                <b className="block font-display text-2xl">₹200+</b>
                <span className="text-[11px] text-[#805f50]">
                  free delivery
                </span>
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-4 rounded-[3rem] bg-[#d98257]/20 blur-2xl" />

            <div className="relative aspect-[1.13] overflow-hidden rounded-[2rem] shadow-2xl shadow-[#7e432b]/20 sm:rounded-[3rem]">
              <Image
                src="/images/hero-bakery.webp"
                alt="Freshly baked cakes, pastries and bakery treats at Piyush's Bakery in Pune"
                width={1440}
                height={960}
                priority
                className="absolute inset-0 size-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-1 rounded-2xl bg-[#fffaf2] p-4 shadow-lg sm:-left-7">
              <p className="font-display text-xl">Made fresh, daily</p>

              <p className="mt-1 text-xs text-[#896b5b]">
                for your every kind of day
              </p>
            </div>

            <div className="absolute -right-3 top-8 grid size-20 place-items-center rounded-full bg-[#c85331] text-center text-[10px] font-bold uppercase leading-3 tracking-wider text-white shadow-lg sm:-right-6">
              100%
              <br />
              fresh
              <br />
              bakes
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#4b2719] px-5 py-6 text-[#fff6e9]">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3 md:gap-0">
          <div className="flex gap-3 md:border-r md:border-white/15">
            <span className="text-xl">✦</span>

            <p>
              <b className="block font-display text-lg">
                Small-batch goodness
              </b>

              <span className="text-sm text-white/65">
                Made in our BVP kitchen
              </span>
            </p>
          </div>

          <div className="flex gap-3 md:justify-center md:border-r md:border-white/15">
            <span className="text-xl">↗</span>

            <p>
              <b className="block font-display text-lg">
                Free home delivery
              </b>

              <span className="text-sm text-white/65">
                On all orders above ₹200
              </span>
            </p>
          </div>

          <div className="flex gap-3 md:justify-end">
            <span className="text-xl">♥</span>

            <p>
              <b className="block font-display text-lg">
                For every generation
              </b>

              <span className="text-sm text-white/65">
                Little ones, students & families
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="bg-[#f6c873] px-5 py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.17em] text-[#9a3c24]">
              Last chance from today&apos;s bake
            </p>

            <h2 className="mt-1 font-display text-2xl text-[#54291b]">
              Save up to 20% on selected treats — best before 2 days.
            </h2>
          </div>

          <a
            href="#menu"
            className="shrink-0 rounded-full bg-[#4b2719] px-5 py-3 text-sm font-bold text-white"
          >
            Shop markdowns →
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="menu"
        className="mx-auto max-w-7xl px-5 py-16 lg:px-8"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Just out of the oven</p>

            <h2 className="section-title">Today&apos;s favourites</h2>

            <p className="mt-2 text-sm text-[#816456]">
              Fresh, limited, and ready for your table.
            </p>
          </div>

          <a
            href="#visit"
            className="text-sm font-bold text-[#c65334] underline decoration-1 underline-offset-4"
          >
            Check availability →
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_250px]">
          <ProductMenu products={products} />

          <aside className="rounded-[1.6rem] bg-[#f2e1cb] p-6">
            <p className="eyebrow">Need something else?</p>

            <h3 className="mt-2 font-display text-2xl leading-7">
              More from our oven
            </h3>

            <div className="mt-5 border-y border-[#6e4532]/15 py-2">
              {quickBakes.map((item) => (
                <a
                  key={item}
                  href={createWhatsAppLink(
                    `Hello Piyush's Bakery! I'd like to know the availability and price for ${item.toLowerCase()}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask about ${item} on WhatsApp`}
                  className="flex w-full items-center justify-between border-b border-[#6e4532]/10 py-3 text-left text-sm font-semibold last:border-0 hover:text-[#c65334]"
                >
                  <span>{item}</span>
                  <span>→</span>
                </a>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#6e4532]/10 bg-[#fffaf2]/70 p-4">
              <p className="text-sm font-bold text-[#4b2719]">
                Planning something special?
              </p>

              <p className="mt-2 text-sm leading-6 text-[#76584a]">
                Birthday cake, custom design, college event, party box or a
                larger bakery order? Talk directly with our team about
                flavours, sizes, pricing and availability.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={createWhatsAppLink(
                    "Hello Piyush's Bakery! I'd like to discuss a birthday, custom cake, party order or bulk bakery order.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#4b2719] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#d86436]"
                >
                  Talk to our cake team →
                </a>

                <a
                  href="/pre-order"
                  className="rounded-full border border-[#4b2719]/20 px-4 py-2.5 text-xs font-bold text-[#4b2719] transition hover:bg-[#f2e1cb]"
                >
                  Pre-order
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* STORY */}
      <section
        id="story"
        className="my-4 overflow-hidden bg-[#e5a073]"
      >
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[390px]">
            <Image
              src="/images/product-3.webp"
              alt="Fresh loaves of bread from Piyush's Bakery"
              width={900}
              height={1200}
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <div className="flex items-center bg-[#f2d6b2] px-7 py-16 lg:px-14">
            <div className="max-w-lg">
              <p className="eyebrow">
                The Piyush&apos;s Bakery promise
              </p>

              <h2 className="section-title">Joy is homemade.</h2>

              <p className="mt-6 leading-7 text-[#6d5145]">
                Right in the middle of Bharati Vidyapeeth&apos;s everyday
                rush, we wanted to create a small pause: a warm bakery for
                students, families, celebrations and simple cravings.
              </p>

              <p className="mt-4 leading-7 text-[#6d5145]">
                We bake in small batches, use ingredients we&apos;d choose
                for our own table, and make sure something good is always
                waiting for you.
              </p>

              <a
                href="#visit"
                className="mt-8 inline-block rounded-full border border-[#4b2719]/25 px-5 py-3 text-sm font-bold hover:bg-[#4b2719] hover:text-white"
              >
                Find our bakery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STRENGTHS */}
      <section className="bg-[#fff2df] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="eyebrow">Why choose Piyush&apos;s Bakery</p>

            <h2 className="section-title">Our Strengths</h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["01", "Consistency & excellence"],
              ["02", "Artisanal quality baked products"],
              ["03", "Diverse culinary experienced chefs"],
              ["04", "Ambience and experience"],
              ["05", "State-of-the-art hygienic kitchen"],
            ].map(([number, strength]) => (
              <article
                key={number}
                className="rounded-3xl bg-white p-6 shadow-[0_6px_22px_rgba(75,39,25,.07)]"
              >
                <p className="text-xs font-extrabold tracking-[.2em] text-[#d86436]">
                  {number}
                </p>

                <h3 className="mt-5 font-display text-2xl leading-7 text-[#4b2719]">
                  {strength}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="reviews"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <Reviews />
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="bg-[#f2e1cb] px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="eyebrow">Need to know?</p>

            <h2 className="section-title">
              Frequently asked questions
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[#816456]">
              Quick answers about ordering, delivery, cakes, payments, and
              visiting Piyush&apos;s Bakery.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-[#4b2719]/10 bg-[#fffaf2]">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-[#4b2719]/10 last:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-bold text-[#4b2719] marker:hidden">
                  <span>{faq.question}</span>

                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f2e1cb] text-lg transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-6 pb-5 pr-16 text-sm leading-6 text-[#76584a]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#76584a]">
              Still have a question?
            </p>

            <a
              href="#visit"
              className="mt-2 inline-block font-bold text-[#b64c2d] underline underline-offset-4"
            >
              Contact our bakery team →
            </a>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section
        id="visit"
        className="mx-5 mb-10 overflow-hidden rounded-[2rem] bg-[#4b2719] lg:mx-8"
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-7 py-12 text-[#fff9ed] md:grid-cols-[1.2fr_.8fr] lg:px-12">
          <div>
            <p className="eyebrow !text-[#f5ba77]">
              Come say hello
            </p>

            <h2 className="mt-2 font-display text-4xl">
              Your bakery break is nearby.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
              Near Bharati Vidyapeeth, Pune. Drop by for warm bakes, call
              for a cake pre-order, or message us for a quick delivery.
            </p>
          </div>

          <div className="md:border-l md:border-white/15 md:pl-8">
            <p className="font-bold">Open every day</p>

            <p className="mt-1 text-sm text-white/70">
              8:00 AM – 10:00 PM
            </p>

            <p className="mt-5 font-bold">
              Bharati Vidyapeeth, Pune
            </p>

            <div className="mt-4 flex gap-3">
              <a
                href="tel:+918767342441"
                className="rounded-full bg-[#d86436] px-4 py-2.5 text-xs font-bold"
              >
                Call us
              </a>

              <a
                href="https://wa.me/918767342441"
                className="rounded-full border border-white/30 px-4 py-2.5 text-xs font-bold"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#4b2719]/10 bg-[#f5e7d4] px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 text-sm text-[#775a4b] sm:grid-cols-2 lg:grid-cols-4">
          {/* FOOTER BRAND */}
          <div>
            <Image
              src="/images/logo.webp"
              alt="Piyush's Bakery logo"
              width={100}
              height={100}
              className="size-16 rounded-full object-cover"
            />

            <p className="mt-3 leading-6">
              A little neighbourhood bakery with a whole lot of heart.
            </p>

            <p className="mt-4 text-xs">
              Bharati Vidyapeeth, Pune, Maharashtra
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="footer-heading">Explore</p>

            <div className="footer-links">
              <a href="#menu">Today&apos;s bakes</a>

              <a href="#offers">Offers</a>

              <a href="#story">Our story</a>

              <a href="#reviews">Customer reviews</a>

              <a href="#faq">
                Frequently asked questions
              </a>

              <a href="/order">
                Order online
              </a>

              <a href="/pre-order">
                Pre-order a cake
              </a>

              <a href="/delivery-policy">
                Delivery policy
              </a>
            </div>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <p className="footer-heading">Customer care</p>

            <div className="footer-links">
              <a href="tel:+918767342441">
                Call to order
              </a>

              <a href="https://wa.me/918767342441">
                WhatsApp us
              </a>

              <a href="#visit">
                Delivery & pickup
              </a>

              <a href="mailto:hello@piyushsbakery.in">
                hello@piyushsbakery.in
              </a>

              <a href="/privacy-policy">
                Privacy policy
              </a>

              <a href="/terms">
                Terms & conditions
              </a>

              <a href="/refund-policy">
                Refund & cancellation
              </a>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <p className="footer-heading">
              Stay in the loop
            </p>

            <p className="mt-3 text-xs leading-5">
              Fresh bakes, new flavours and sweet little offers.
            </p>

            <form
              action="/api/newsletter"
              method="post"
              className="mt-3 flex rounded-full border border-[#4b2719]/15 bg-white p-1"
            >
              <input
                name="email"
                required
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-3 text-xs outline-none"
              />

              <button
                type="submit"
                className="rounded-full bg-[#d86436] px-3 py-2 text-xs font-bold text-white"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-[#4b2719]/10 pt-5 text-xs text-[#87695a] sm:flex-row">
          <p>
            © 2026 Piyush&apos;s Bakery. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href="/privacy-policy"
              className="transition hover:text-[#d86436]"
            >
              Privacy policy
            </a>

            <a
              href="/terms"
              className="transition hover:text-[#d86436]"
            >
              Terms & conditions
            </a>

            <a
              href="/refund-policy"
              className="transition hover:text-[#d86436]"
            >
              Refund & cancellation
            </a>
          </div>
        </div>
      </footer>

      {/* PHONE VERIFICATION */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 lg:px-8">
        <MSG91OTP />
      </section>

      <CookieConsent />

      <AIFoodAssistant />

      {/* WELCOME TOAST */}
      <WelcomeToast />
    </main>
  );
}