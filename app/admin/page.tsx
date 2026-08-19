"use client";

import Link from "next/link";

const adminCards = [
  {
    title: "Orders",
    description: "View and manage customer orders.",
    href: "/admin/orders",
    icon: "📦",
  },
  {
    title: "Products",
    description: "Manage bakery products and availability.",
    href: "/admin/products",
    icon: "🧁",
  },
  {
    title: "Categories",
    description: "Manage product categories.",
    href: "/admin/categories",
    icon: "🏷️",
  },
  {
    title: "Reviews",
    description: "Review customer feedback.",
    href: "/admin/reviews",
    icon: "⭐",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#4b2719]">
      <header className="bg-[#4b2719] px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0a16f]">
            Piyush&apos;s Bakery
          </p>

          <h1 className="mt-3 font-display text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-white/70">
            Manage your bakery website from one place.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* STATISTICS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Orders" value="—" />
          <StatCard title="Products" value="—" />
          <StatCard title="Reviews" value="—" />
          <StatCard title="Revenue" value="₹—" />
        </div>

        {/* MANAGEMENT */}
        <div className="mt-10">
          <h2 className="font-display text-2xl font-bold">
            Management
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {adminCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-3xl border border-[#4b2719]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="text-3xl"
                  aria-hidden="true"
                >
                  {card.icon}
                </div>

                <h3 className="mt-4 font-display text-xl font-bold">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#76584a]">
                  {card.description}
                </p>

                <p className="mt-5 text-sm font-bold text-[#d86436]">
                  Manage →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm text-[#76584a]">
        {title}
      </p>

      <p className="mt-2 font-display text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}