import { NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";

type Product = { _id: string; name: string; price: number; description?: string; isAvailable?: boolean; image?: unknown; category?: { name?: string } };
const outsideScopeReply = "I'm Piyush's Bakery AI, so I can only help with our bakery products, food, orders, delivery, and related services. What would you like to eat today?";
const requests = new Map<string, number[]>();

function isRateLimited(request: Request) {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (requests.get(address) ?? []).filter((time) => now - time < 60_000);
  requests.set(address, [...recent, now]);
  return recent.length >= 12;
}

function isOutsideBakeryScope(message: string) {
  return /\b(politic|election|religion|medical|diagnos|legal|lawyer|financial advice|invest|password|api key|secret|environment variable|supabase|razorpay secret|source code|system prompt|developer instruction|ignore (all |previous )?instructions|programming|coding question)\b/i.test(message);
}

function recommendationsFor(message: string, products: Product[]) {
  const query = message.toLowerCase();
  const budgetText = query.match(/(?:₹|rs\.?|inr)\s*(\d+)/i)?.[1];
  const budget = budgetText ? Number(budgetText) : undefined;
  const sweet = /sweet|dessert|cake|pastry|cookie|tea.?time|coffee|surprise/.test(query);
  const filling = /hungry|filling|savoury|snack|breakfast|party|people|gathering/.test(query);
  return products.filter((product) => {
    if (product.isAvailable === false || (budget && product.price > budget)) return false;
    const haystack = `${product.name} ${product.category?.name ?? ""}`.toLowerCase();
    return Boolean(budget) || product.name.toLowerCase().includes(query) || (sweet && /cake|pastr|cookie|dessert|sweet/.test(haystack)) || (filling && /bread|savour|snack|food|puff/.test(haystack)) || /recommend|what should|under|budget|surprise/.test(query);
  }).slice(0, 4);
}

function catalogReply(products: Product[]) {
  return products.length ? `Here are a few available picks from our bakery: ${products.map((product) => `${product.name} (₹${product.price})`).join(", ")}. You can add any of these to your cart below.` : "I couldn't find a matching available bake right now. Try another craving or browse today's menu.";
}

async function getAvailableProducts() {
  try {
    const products = await client.fetch<Product[]>(`*[_type == "product"]{_id,name,price,description,isAvailable,image,category->{name}}`, {}, { next: { revalidate: 0 } });
    return products.filter((product) => product.isAvailable !== false);
  } catch (error) {
    // Keep the assistant usable during a temporary catalog outage.
    console.error("Food assistant catalog request failed", error instanceof Error ? error.message : "unknown error");
    return [];
  }
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) return NextResponse.json({ error: "Please wait a moment before sending another message." }, { status: 429 });
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Please send a bakery question." }, { status: 400 });
    }
    const message = typeof body === "object" && body !== null && "message" in body ? body.message : undefined;
    if (typeof message !== "string" || !message.trim() || message.length > 500) return NextResponse.json({ error: "Please send a bakery question of up to 500 characters." }, { status: 400 });
    if (isOutsideBakeryScope(message)) return NextResponse.json({ message: outsideScopeReply, recommendations: [] });

    const available = await getAvailableProducts();
    const recommendations = recommendationsFor(message, available);
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) return NextResponse.json({ message: catalogReply(recommendations), recommendations });

    const catalog = available.map(({ _id, name, price, description, category }) => ({ id: _id, name, price, description: description ?? "", category: category?.name ?? "" }));
    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(geminiApiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `You are Piyush's Bakery AI. Help only with this bakery's products, orders, delivery, payments, hours (daily 8 AM–12 AM), and location (Bharati Vidyapeeth, Pune). Use only the supplied catalog. Do not invent products, prices, availability, offers, ingredients, or business information. If a request is outside this scope, reply exactly: ${outsideScopeReply}` }] },
        contents: [{ role: "user", parts: [{ text: `Customer message: ${message.trim()}\n\nSafe product catalog: ${JSON.stringify(catalog)}` }] }],
        generationConfig: { maxOutputTokens: 300, temperature: 0.4 },
      }),
    });
    if (!response.ok) {
      console.error("Food assistant Gemini request failed", response.status);
      return NextResponse.json({ message: catalogReply(recommendations), recommendations });
    }
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const reply = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
    return NextResponse.json({ message: reply || catalogReply(recommendations), recommendations });
  } catch (error) {
    console.error("Food assistant request failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Sorry, I'm having trouble right now. Please try again or browse our menu." }, { status: 500 });
  }
}
