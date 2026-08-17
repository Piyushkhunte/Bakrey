import Link from "next/link";

type OrderSuccessPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#fffaf2] px-5 py-16 text-[#402b22]">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-[2rem] bg-white p-8 text-center shadow-[0_10px_40px_rgba(75,39,25,.08)] md:p-12">

          {/* SUCCESS ICON */}
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#4b2719] text-3xl font-bold text-white">
            ✓
          </div>

          {/* LABEL */}
          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-[#a57d69]">
            Payment successful
          </p>

          {/* HEADING */}
          <h1 className="mt-3 font-display text-4xl leading-tight text-[#45271c] md:text-5xl">
            Thank you for your order!
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-5 max-w-lg leading-7 text-[#76584a]">
            Your payment has been successfully verified and
            your bakery order has been confirmed.
          </p>

          {/* ORDER ID */}
          {params.orderId && (
            <div className="mt-8 rounded-2xl bg-[#f2e1cb] p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#825b4a]">
                Order ID
              </p>

              <p className="mt-2 break-all font-mono text-sm font-bold text-[#4b2719]">
                {params.orderId}
              </p>
            </div>
          )}

          {/* PAYMENT STATUS */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-[#4b2719]">
            <span className="grid size-6 place-items-center rounded-full bg-[#4b2719] text-xs text-white">
              ✓
            </span>

            Payment verified
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-[#4b2719] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#d86436]"
            >
              Back to home
            </Link>

            <Link
              href="/order"
              className="rounded-full border border-[#4b2719]/15 px-7 py-3.5 text-sm font-bold text-[#4b2719] transition hover:border-[#d86436] hover:text-[#d86436]"
            >
              Order more
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}