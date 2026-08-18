"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { urlFor } from "../../sanity/lib/image";
import { useCart } from "../context/cartContext";

type Product = { _id: string; name: string; price: number; description?: string; isAvailable?: boolean; image?: any; category?: { name?: string } };
type Message = { role: "assistant" | "user"; text: string; products?: Product[] };
const starter = "Hi! 👋 I'm Piyush AI. Tell me what you're craving, your budget, or what you're ordering for and I'll help you find something from our bakery.";
const quickActions = ["🍰 Something sweet", "🥪 Something filling", "☕ Tea-time", "💰 Under ₹200", "🎉 Party / gathering", "🤷 Surprise me"];

export default function AIFoodAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: starter }]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const escape = (event: globalThis.KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  async function sendMessage(value = input) {
    const text = value.trim();
    if (!text || loading) return;
    setMessages((current) => [...current, { role: "user", text }]);
    setInput(""); setLoading(true);
    try {
      const response = await fetch("/api/ai/food-assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) });
      const data = await response.json();
      setMessages((current) => [...current, { role: "assistant", text: response.ok ? data.message : data.error, products: response.ok ? data.recommendations : undefined }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: "Sorry, I'm having trouble right now. Please try again or browse our menu." }]);
    } finally { setLoading(false); }
  }

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); sendMessage(); }
  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }

  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label="Open Piyush AI food assistant" className="fixed bottom-5 right-5 z-50 rounded-full bg-[#4b2719] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_35px_rgba(75,39,25,.32)] transition hover:bg-[#d86436] focus:outline-none focus:ring-4 focus:ring-[#d86436]/30">✨ Piyush AI</button>
    {open && <section role="dialog" aria-modal="true" aria-label="Piyush AI food assistant" className="fixed bottom-5 right-5 z-[60] flex h-[min(680px,calc(100vh-2.5rem))] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-[2rem] border border-[#4b2719]/15 bg-[#fffaf2] shadow-2xl">
      <header className="flex items-center justify-between bg-[#4b2719] px-5 py-4 text-white"><div><h2 className="font-display text-2xl">✨ Piyush AI</h2><p className="text-xs text-white/70">Your personal food assistant</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Close Piyush AI" className="grid size-9 place-items-center rounded-full text-xl hover:bg-white/10">×</button></header>
      <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">{messages.map((message, index) => <div key={index} className={message.role === "user" ? "ml-10 rounded-2xl bg-[#d86436] p-3 text-sm leading-5 text-white" : "mr-4 rounded-2xl bg-[#f2e1cb] p-3 text-sm leading-5 text-[#4b2719]"}>{message.text}{message.products?.length ? <div className="mt-3 grid gap-2">{message.products.map((product) => <article key={product._id} className="flex gap-3 rounded-xl bg-white p-2 shadow-sm">{product.image && <img src={urlFor(product.image).width(120).height(120).fit("crop").url()} alt="" className="size-14 rounded-lg object-cover" />}<div className="min-w-0 flex-1"><p className="font-bold">{product.name}</p><p className="text-xs text-[#c65334]">₹{product.price} · Available</p><button type="button" onClick={() => addToCart(product)} className="mt-1 text-xs font-bold text-[#b64c2d] underline">Add to cart</button></div></article>)}</div> : null}</div>)}{loading && <p className="rounded-2xl bg-[#f2e1cb] p-3 text-sm text-[#76584a]">Piyush AI is thinking...</p>}</div>
      <div className="border-t border-[#4b2719]/10 p-3"><div className="mb-3 flex gap-2 overflow-x-auto pb-1">{quickActions.map((action) => <button key={action} type="button" onClick={() => sendMessage(action)} className="shrink-0 rounded-full border border-[#4b2719]/15 px-3 py-1.5 text-xs font-bold text-[#76584a] hover:border-[#d86436]">{action}</button>)}</div><form onSubmit={submit} className="flex gap-2"><textarea ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={onKeyDown} maxLength={500} rows={1} aria-label="Ask Piyush AI about bakery food" placeholder="What are you craving?" className="min-h-11 flex-1 resize-none rounded-xl border border-[#4b2719]/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#d86436]" /><button type="submit" disabled={loading || !input.trim()} className="rounded-xl bg-[#d86436] px-4 text-sm font-bold text-white disabled:opacity-50">Send</button></form></div>
    </section>}
  </>;
}
