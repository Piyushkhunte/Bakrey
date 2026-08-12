"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

const products = [
  { name: "Chocolate Cloud", type: "Signature cake", price: "₹699", emoji: "🍫", color: "#f4c3a0" },
  { name: "Berry Bliss", type: "Fresh cream cake", price: "₹749", emoji: "🍓", color: "#ecc3ce" },
  { name: "Butter Croissant", type: "Baked fresh daily", price: "₹79", emoji: "🥐", color: "#efd29b" },
  { name: "Fudge Brownie", type: "Rich & gooey", price: "₹99", emoji: "🍪", color: "#c89a78" },
];

const reviews = [
  ["Aarav M.", "Student, BVP", "The best post-lecture stop. Their brownies disappear in minutes!"],
  ["Neha Kulkarni", "Katraj resident", "Beautiful cakes, thoughtful service, and always so fresh."],
  ["Rohan & family", "Pune", "Our daughter now asks for the strawberry cake for every celebration."],
];

export default function Home() {
  const [toast, setToast] = useState("");
  const [offerOpen, setOfferOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setOfferOpen(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const followCursor = (event: PointerEvent) => {
      particleRefs.current.forEach((particle, index) => {
        if (!particle) return;
        const delay = index * 14;
        window.setTimeout(() => {
          particle.style.transform = `translate3d(${event.clientX + index * 15}px, ${event.clientY + index * 10}px, 0) scale(${1 - index * 0.15})`;
          particle.style.opacity = "0.6";
        }, delay);
      });
    };
    window.addEventListener("pointermove", followCursor);
    return () => window.removeEventListener("pointermove", followCursor);
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3600);
  };
  const submitOffer = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return notify("Please enter a valid email address.");
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (!response.ok && response.status !== 503) throw new Error("Subscription failed");
      setOfferOpen(false);
      setEmail("");
      notify(response.status === 503 ? "Your 15% treat is reserved—connect Supabase to start collecting emails." : "Your 15% welcome treat is on its way! ✨");
    } catch {
      notify("We could not save your email. Please try again.");
    }
  };

  return (
    <main className="overflow-hidden bg-[#fffaf2] text-[#402b22]">
      <div className="grain" aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#502c1a]/10 bg-[#fffaf2]/85 backdrop-blur-lg">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="font-display text-2xl tracking-tight text-[#4b2719]">crumb<span className="text-[#d86436]">&</span>co.</a>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#menu" className="hover:text-[#d86436]">Our bakes</a><a href="#story" className="hover:text-[#d86436]">Our story</a><a href="#reviews" className="hover:text-[#d86436]">Sweet words</a>
          </div>
          <button onClick={() => notify("Online ordering opens at 8 AM. Call us for a pre-order!")} className="hidden rounded-full bg-[#4b2719] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d86436] sm:block">Order now <span className="ml-1">→</span></button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center rounded-full border border-[#4b2719]/15 md:hidden" aria-label="Toggle menu">☰</button>
        </nav>
        {menuOpen && <div className="border-t border-[#4b2719]/10 bg-[#fffaf2] px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-medium"><a onClick={() => setMenuOpen(false)} href="#menu">Our bakes</a><a onClick={() => setMenuOpen(false)} href="#story">Our story</a><a onClick={() => setMenuOpen(false)} href="#reviews">Sweet words</a></div></div>}
      </header>

      <section id="top" className="relative min-h-[760px] pt-20 lg:min-h-[790px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_17%,#f5d5aa_0,transparent_28%),radial-gradient(circle_at_90%_80%,#efb797_0,transparent_25%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-16 lg:grid-cols-[.94fr_1.06fr] lg:px-8 lg:pt-24">
          <div className="z-10 max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-[#b95735]"><span className="h-px w-8 bg-[#b95735]" /> baked with love in Katraj</p>
            <h1 className="font-display text-5xl leading-[.93] tracking-tight text-[#45271c] sm:text-6xl lg:text-7xl">A little slice<br />of <em className="font-normal text-[#d86436]">happiness</em>,<br />every day.</h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[#6d5145]">Warm bread for your morning rush, celebration cakes for your biggest days, and everything delicious in between.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#menu" className="rounded-full bg-[#d86436] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(216,100,54,.22)] transition hover:-translate-y-0.5">Explore the menu</a><a href="#story" className="rounded-full border border-[#4b2719]/20 px-6 py-3.5 text-sm font-bold transition hover:border-[#4b2719]">Our little story</a></div>
            <div className="mt-12 flex items-center gap-4"><div className="flex -space-x-2"><span className="avatar">A</span><span className="avatar bg-[#eebf95]">N</span><span className="avatar bg-[#b4d1b3]">R</span></div><p className="text-sm text-[#6d5145]"><b className="text-[#45271c]">4.9/5</b> loved by 1,200+ locals</p></div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="absolute -inset-4 rounded-[3rem] bg-[#eaa379]/20 blur-2xl" />
            <div className="relative aspect-[1.08] overflow-hidden rounded-[2rem] shadow-2xl shadow-[#7e432b]/20 sm:rounded-[3rem]"><Image src="/images/hero-bakery.png" alt="A beautiful assortment of fresh bakery treats" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div>
            <div className="absolute -bottom-5 -left-2 rounded-2xl bg-[#fffaf2] p-4 shadow-lg sm:-left-8"><p className="font-display text-xl">Made fresh, daily</p><p className="mt-1 text-xs text-[#896b5b]">from our oven to you</p></div>
            <div className="absolute -right-3 top-9 grid size-20 place-items-center rounded-full bg-[#c85331] text-center text-[10px] font-bold uppercase leading-3 tracking-wider text-white shadow-lg sm:-right-6">100%<br />fresh<br />bakes</div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#fffaf2] [clip-path:polygon(0_68%,10%_30%,20%_70%,30%_32%,40%_75%,50%_30%,60%_73%,70%_35%,80%_70%,90%_30%,100%_70%,100%_100%,0_100%)]" />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="grid gap-5 rounded-3xl bg-[#4b2719] px-7 py-8 text-[#fff6e9] md:grid-cols-3 md:gap-0 md:px-10"><div className="flex gap-4 md:border-r md:border-white/15"><span className="text-2xl">🌾</span><p><b className="block font-display text-xl">Small-batch goodness</b><span className="text-sm text-white/65">Baked in our Katraj kitchen</span></p></div><div className="flex gap-4 md:justify-center md:border-r md:border-white/15"><span className="text-2xl">⏱️</span><p><b className="block font-display text-xl">Quick pick-up</b><span className="text-sm text-white/65">Perfect for your busy day</span></p></div><div className="flex gap-4 md:justify-end"><span className="text-2xl">♥</span><p><b className="block font-display text-xl">Made for everyone</b><span className="text-sm text-white/65">From age 6 to 80 and beyond</span></p></div></div></section>

      <section id="menu" className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">A little something for you</p><h2 className="section-title">Today&apos;s favourites</h2></div><button onClick={() => notify("Our full menu is being baked up—call us to reserve your favourite!")} className="text-sm font-bold text-[#c65334] underline decoration-1 underline-offset-4">See full menu →</button></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <article key={product.name} className="group rounded-[1.7rem] bg-white p-3 shadow-[0_8px_30px_rgba(75,39,25,.06)]"><div className="grid aspect-square place-items-center overflow-hidden rounded-[1.25rem] text-7xl transition duration-300 group-hover:scale-[.98]" style={{ background: `linear-gradient(135deg, ${product.color}, #fff6e8)` }}>{product.emoji}</div><div className="p-3 pb-2"><p className="text-xs font-semibold uppercase tracking-wider text-[#a57d69]">{product.type}</p><div className="mt-1 flex items-center justify-between"><h3 className="font-display text-xl">{product.name}</h3><span className="font-bold text-[#c65334]">{product.price}</span></div><button onClick={() => notify(`${product.name} added to your sweet wish-list!`)} className="mt-4 text-xs font-bold uppercase tracking-widest text-[#6d5145] transition group-hover:text-[#d86436]">Add to order +</button></div></article>)}</div></section>

      <section id="story" className="relative my-10 bg-[#f3dfc7] py-20"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8"><div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center rounded-full bg-[#e6b080] text-center"><div className="absolute inset-4 rounded-full border border-dashed border-[#fff8ed]/80" /><span className="text-8xl">🧁</span><p className="absolute bottom-16 font-display text-2xl text-[#643421]">joy is homemade</p></div><div className="max-w-lg"><p className="eyebrow">The crumb & co. promise</p><h2 className="section-title">Your happy place, around the corner.</h2><p className="mt-6 leading-7 text-[#6d5145]">In the middle of Bharati Vidyapeeth&apos;s bustle, we wanted to make a pause button: a bright little bakery where students, families and friends can share something warm.</p><p className="mt-4 leading-7 text-[#6d5145]">Every recipe starts with honest ingredients, a generous hand, and the belief that the everyday deserves a celebration too.</p><a href="#reviews" className="mt-8 inline-block rounded-full border border-[#4b2719]/25 px-5 py-3 text-sm font-bold hover:bg-[#4b2719] hover:text-white">Meet our regulars</a></div></div></section>

      <section id="reviews" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="text-center"><p className="eyebrow">From our lovely customers</p><h2 className="section-title">Sweet words mean the world</h2><p className="mt-3 text-[#816456]">Real smiles from right here in Pune.</p></div><div className="mt-11 grid gap-5 md:grid-cols-3">{reviews.map(([name, role, quote]) => <figure key={name} className="rounded-[1.5rem] border border-[#e8d4bf] bg-white p-7"><div className="mb-5 text-[#db6b40]">★★★★★</div><blockquote className="font-display text-xl leading-7">“{quote}”</blockquote><figcaption className="mt-6 text-sm"><b>{name}</b><span className="ml-2 text-[#8b6c5c]">· {role}</span></figcaption></figure>)}</div></section>

      <section className="mx-5 mb-10 overflow-hidden rounded-[2rem] bg-[#d86436] lg:mx-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-7 py-12 text-center text-white md:flex-row md:text-left lg:px-12"><div><p className="font-display text-3xl">Something sweet is waiting.</p><p className="mt-2 text-white/75">Pre-order a cake, save your favourites, or just say hello.</p></div><button onClick={() => setOfferOpen(true)} className="shrink-0 rounded-full bg-[#fffaf2] px-6 py-3.5 text-sm font-bold text-[#a4422b] transition hover:bg-white">Get my welcome treat</button></div></section>

      <footer className="border-t border-[#4b2719]/10 px-5 py-10 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-[#775a4b] md:flex-row"><div><p className="font-display text-2xl text-[#4b2719]">crumb<span className="text-[#d86436]">&</span>co.</p><p className="mt-2">Near Bharati Vidyapeeth, Katraj · Pune</p></div><div className="flex gap-6"><a href="tel:+919000000000">Call us</a><a href="https://wa.me/919000000000">WhatsApp</a><a href="https://instagram.com">Instagram</a></div><p>© 2026 Crumb & Co.</p></div></footer>

      <div className="pointer-events-none fixed inset-0 z-30 hidden lg:block" aria-hidden="true"><span ref={(element) => { particleRefs.current[0] = element; }} className="cursor-particle cursor-particle-one" /><span ref={(element) => { particleRefs.current[1] = element; }} className="cursor-particle cursor-particle-two" /><span ref={(element) => { particleRefs.current[2] = element; }} className="cursor-particle cursor-particle-three" /></div>
      {toast && <div role="status" className="fixed bottom-5 right-5 z-50 max-w-sm animate-[slideUp_.35s_ease-out] rounded-2xl bg-[#4b2719] px-5 py-4 text-sm font-semibold text-white shadow-2xl">{toast}</div>}
      {offerOpen && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-[#321a13]/45 p-5 backdrop-blur-sm"><div className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-[#fffaf2] p-8 text-center shadow-2xl"><button onClick={() => setOfferOpen(false)} className="absolute right-5 top-4 text-xl text-[#87675a]" aria-label="Close offer">×</button><div className="mx-auto grid size-16 place-items-center rounded-full bg-[#f3d4a8] text-3xl">🥐</div><p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-[#c65334]">A warm welcome</p><h2 className="mt-2 font-display text-4xl leading-none">15% off your first treat</h2><p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#76584a]">Join our little list for a delicious welcome code and fresh-bake news. No spam, ever.</p><form onSubmit={submitOffer} className="mt-6 flex flex-col gap-2 sm:flex-row"><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Your email address" className="min-w-0 flex-1 rounded-full border border-[#4b2719]/15 bg-white px-5 py-3 text-sm outline-none focus:border-[#d86436]" /><button className="rounded-full bg-[#d86436] px-5 py-3 text-sm font-bold text-white">Unlock 15% off</button></form><button onClick={() => setOfferOpen(false)} className="mt-5 text-xs text-[#87675a] underline underline-offset-4">No thanks, I&apos;ll pay full price</button></div></div>}
    </main>
  );
}
