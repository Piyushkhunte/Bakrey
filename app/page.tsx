 import { client } from "../sanity/lib/client";
import ProductMenu from "../app/components/productMenu";

const quickBakes = [
  "Tea cakes",
  "Cookies & rusks",
  "Birthday cakes",
  "Puffs & savoury",
  "Breads",
  "Dessert jars",
];

const reviews = [
  [
    "Aarav M.",
    "Student, Bharati Vidyapeeth",
    "The best post-lecture stop. Their brownies disappear in minutes!",
  ],
  [
    "Neha Kulkarni",
    "BVP neighbourhood",
    "Beautiful cakes, thoughtful service, and always so fresh.",
  ],
  [
    "Rohan & family",
    "Pune",
    "Our daughter asks for the strawberry cake for every celebration.",
  ],
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
    }
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
            <img
              src="/images/logo.webp"
              alt="Piyush's Bakery logo"
              width="54"
              height="54"
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
            <a href="#visit" className="hover:text-[#d86436]">
              Visit us
            </a>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="tel:+919000000000"
              className="text-xs font-bold text-[#825b4a]"
            >
              Call to pre-order
            </a>

            <a
              href="tel:+919000000000"
              className="rounded-full bg-[#4b2719] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#d86436]"
            >
              Order now →
            </a>
          </div>

          <details className="relative lg:hidden">
            <summary
              className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-[#4b2719]/15"
              aria-label="Open menu"
            >
              ☰
            </summary>

            <div className="absolute right-0 top-12 w-56 rounded-2xl border border-[#4b2719]/10 bg-[#fffaf2] p-5 shadow-xl">
              <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
                <a href="#menu">Our bakes</a>
                <a href="#offers">Offers</a>
                <a href="#story">Our story</a>
                <a href="#reviews">Reviews</a>
                <a href="#visit">Visit us</a>
                <a href="tel:+919000000000">Call to pre-order</a>
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
                href="tel:+919000000000"
                className="rounded-full border border-[#4b2719]/20 px-6 py-3.5 text-sm font-bold transition hover:border-[#4b2719]"
              >
                Call to order
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[#835c4b]/20 pt-5 text-center">
              <p>
                <b className="block font-display text-2xl">4.9/5</b>
                <span className="text-[11px] text-[#805f50]">local love</span>
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
              <img
                src="/images/hero-bakery.webp"
                alt="A beautiful assortment of freshly baked treats"
                width="1440"
                height="960"
                fetchPriority="high"
                decoding="async"
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
              <b className="block font-display text-lg">Small-batch goodness</b>
              <span className="text-sm text-white/65">
                Made in our BVP kitchen
              </span>
            </p>
          </div>

          <div className="flex gap-3 md:justify-center md:border-r md:border-white/15">
            <span className="text-xl">↗</span>
            <p>
              <b className="block font-display text-lg">Free home delivery</b>
              <span className="text-sm text-white/65">
                On all orders above ₹200
              </span>
            </p>
          </div>

          <div className="flex gap-3 md:justify-end">
            <span className="text-xl">♥</span>
            <p>
              <b className="block font-display text-lg">For every generation</b>
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
      <section id="menu" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
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
                  href="tel:+919000000000"
                  className="flex w-full items-center justify-between border-b border-[#6e4532]/10 py-3 text-left text-sm font-semibold last:border-0 hover:text-[#c65334]"
                >
                  <span>{item}</span>
                  <span>→</span>
                </a>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-[#76584a]">
              Planning a birthday or college event?
            </p>

            <a
              href="tel:+919000000000"
              className="mt-3 inline-block text-sm font-bold text-[#b64c2d] underline underline-offset-4"
            >
              Talk to our cake team
            </a>
          </aside>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="my-4 overflow-hidden bg-[#e5a073]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[390px]">
            <img
              src="/images/product-3.webp"
              alt="Fresh loaves of bread from the bakery"
              width="900"
              height="1200"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <div className="flex items-center bg-[#f2d6b2] px-7 py-16 lg:px-14">
            <div className="max-w-lg">
              <p className="eyebrow">The Piyush&apos;s Bakery promise</p>

              <h2 className="section-title">Joy is homemade.</h2>

              <p className="mt-6 leading-7 text-[#6d5145]">
                Right in the middle of Bharati Vidyapeeth&apos;s everyday rush,
                we wanted to create a small pause: a warm bakery for students,
                families, celebrations and simple cravings.
              </p>

              <p className="mt-4 leading-7 text-[#6d5145]">
                We bake in small batches, use ingredients we&apos;d choose for
                our own table, and make sure something good is always waiting
                for you.
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

      {/* REVIEWS */}
      <section
        id="reviews"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <div className="text-center">
          <p className="eyebrow">From our lovely customers</p>

          <h2 className="section-title">Sweet words mean the world</h2>

          <p className="mt-3 text-[#816456]">
            Real smiles from right here in Pune.
          </p>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {reviews.map(([name, role, quote]) => (
            <figure
              key={name}
              className="rounded-[1.5rem] border border-[#e8d4bf] bg-white p-7"
            >
              <div className="mb-5 text-[#db6b40]">★★★★★</div>

              <blockquote className="font-display text-xl leading-7">
                “{quote}”
              </blockquote>

              <figcaption className="mt-6 text-sm">
                <b>{name}</b>
                <span className="ml-2 text-[#8b6c5c]">· {role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* VISIT */}
      <section
        id="visit"
        className="mx-5 mb-10 overflow-hidden rounded-[2rem] bg-[#4b2719] lg:mx-8"
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-7 py-12 text-[#fff9ed] md:grid-cols-[1.2fr_.8fr] lg:px-12">
          <div>
            <p className="eyebrow !text-[#f5ba77]">Come say hello</p>

            <h2 className="mt-2 font-display text-4xl">
              Your bakery break is nearby.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
              Near Bharati Vidyapeeth, Pune. Drop by for warm bakes, call for a
              cake pre-order, or message us for a quick delivery.
            </p>
          </div>

          <div className="md:border-l md:border-white/15 md:pl-8">
            <p className="font-bold">Open every day</p>

            <p className="mt-1 text-sm text-white/70">8:00 AM – 10:00 PM</p>

            <p className="mt-5 font-bold">Bharati Vidyapeeth, Pune</p>

            <div className="mt-4 flex gap-3">
              <a
                href="tel:+919000000000"
                className="rounded-full bg-[#d86436] px-4 py-2.5 text-xs font-bold"
              >
                Call us
              </a>

              <a
                href="https://wa.me/919000000000"
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
          <div>
            <img
              src="/images/logo.webp"
              alt="Piyush's Bakery"
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
              className="size-16 rounded-full object-cover"
            />

            <p className="mt-3 leading-6">
              A little neighbourhood bakery with a whole lot of heart.
            </p>

            <p className="mt-4 text-xs">
              Bharati Vidyapeeth, Pune, Maharashtra
            </p>
          </div>

          <div>
            <p className="footer-heading">Explore</p>

            <div className="footer-links">
              <a href="#menu">Today&apos;s bakes</a>
              <a href="#offers">Offers</a>
              <a href="#story">Our story</a>
              <a href="#reviews">Customer reviews</a>
            </div>
          </div>

          <div>
            <p className="footer-heading">Customer care</p>

            <div className="footer-links">
              <a href="tel:+919000000000">Call to order</a>
              <a href="https://wa.me/919000000000">WhatsApp us</a>
              <a href="#visit">Delivery & pickup</a>
              <a href="mailto:hello@piyushsbakery.in">
                hello@piyushsbakery.in
              </a>
            </div>
          </div>

          <div>
            <p className="footer-heading">Stay in the loop</p>

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

              <button className="rounded-full bg-[#d86436] px-3 py-2 text-xs font-bold text-white">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-[#4b2719]/10 pt-5 text-xs text-[#87695a] sm:flex-row">
          <p>© 2026 Piyush&apos;s Bakery. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#">Privacy policy</a>
            <a href="#">Terms & conditions</a>
            <a href="#">Refund & cancellation</a>
          </div>
        </div>
      </footer>

      {/* WELCOME TOAST */}
      <aside
        role="status"
        className="welcome-toast fixed bottom-5 right-5 z-[70] flex max-w-sm gap-3 rounded-2xl border border-white/10 bg-[#4b2719] p-4 text-sm font-medium leading-5 text-white shadow-2xl"
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#d86436]">
          ✦
        </span>

        <p>
          A warm welcome! Get 15% off your first online order — use code
          WELCOME15.
        </p>
      </aside>
    </main>
  );
}