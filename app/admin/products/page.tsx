import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] px-5 py-10 text-[#4b2719] lg:px-8">
      <header className="border-b border-[#4b2719]/10 bg-[#fffaf2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link
            href="/admin"
            className="font-display text-2xl font-bold text-[#4b2719]"
          >
            Piyush&apos;s Bakery Admin
          </Link>

          <Link
            href="/"
            className="text-sm font-bold text-[#825b4a] hover:text-[#d86436]"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c65334]">
          Piyush&apos;s Bakery
        </p>

        <h1 className="mt-2 font-display text-4xl font-bold">
          Products
        </h1>

        <p className="mt-2 text-[#76584a]">
          Manage cakes, pastries, food, snacks and savouries.
        </p>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-center text-[#76584a]">
            Product management will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}