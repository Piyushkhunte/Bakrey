import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Piyush's Bakery Pune",
  description:
    "Read Piyush's Bakery refund and cancellation policy covering order cancellations, fresh and customised products, damaged orders, failed payments and refunds in Pune.",
  alternates: {
    canonical: "/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Refund & Cancellation Policy | Piyush's Bakery Pune",
    description:
      "Learn about cancellations, refunds, damaged orders and payment issues at Piyush's Bakery.",
    type: "website",
    locale: "en_IN",
    siteName: "Piyush's Bakery",
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#4b2719]">
      <section className="bg-[#4b2719] px-6 py-20 text-center text-[#fffaf2]">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f0a16f]">
          Piyush&apos;s Bakery
        </p>

        <h1 className="mt-4 font-display text-5xl md:text-6xl">
          Refund &amp; Cancellation
        </h1>

        <p className="mt-5 text-sm text-[#f2e1cb]">
          Last updated: August 2026
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <div className="space-y-6">
          <PolicyCard title="1. Our Policy">
            <p>
              Piyush&apos;s Bakery prepares many products fresh and may prepare
              customised products specifically for individual orders.
              Therefore, cancellation and refund eligibility can depend on
              the type of product and whether preparation has started.
            </p>
          </PolicyCard>

          <PolicyCard title="2. Cancellation Before Preparation">
            <p>
              If you need to cancel an order, contact us as soon as possible
              after placing it.
            </p>

            <p>
              Where the order has not yet entered preparation and cancellation
              is reasonably possible, we may accept the cancellation and
              process an eligible refund.
            </p>
          </PolicyCard>

          <PolicyCard title="3. Fresh and Customised Products">
            <p>
              Once preparation of a fresh, customised or specially prepared
              product has started, cancellation may no longer be possible.
            </p>

            <p>
              Custom cake designs, names, messages and other personalised
              requests may require advance preparation and therefore may be
              subject to stricter cancellation conditions.
            </p>
          </PolicyCard>

          <PolicyCard title="4. Wrong or Damaged Order">
            <p>
              If you receive an incorrect product or an order that has been
              materially damaged before delivery, contact us as soon as
              reasonably possible with your order details and, where
              appropriate, photographs of the issue.
            </p>

            <p>
              After reviewing the issue, we may offer an appropriate remedy,
              which may include replacement, store credit or refund where
              applicable.
            </p>
          </PolicyCard>

          <PolicyCard title="5. Failed or Duplicate Payments">
            <p>
              If money is deducted from your account but the order is not
              successfully created or confirmed, the payment will be
              investigated using the relevant payment transaction details.
            </p>

            <p>
              If a duplicate payment is confirmed, the duplicate amount will
              be handled according to the applicable payment and refund
              process.
            </p>
          </PolicyCard>

          <PolicyCard title="6. Payment Gateway">
            <p>
              Online payments may be processed through Razorpay. Payment
              processing, authentication and certain transaction-related
              information may therefore be handled by the payment provider in
              accordance with its applicable policies.
            </p>
          </PolicyCard>

          <PolicyCard title="7. Refund Method">
            <p>
              Where a refund is approved for an online payment, it will
              normally be initiated through the payment method or payment
              provider used for the original transaction, where technically
              possible.
            </p>

            <p>
              The time taken for the amount to appear in your account may
              depend on the payment provider, bank or financial institution.
            </p>
          </PolicyCard>

          <PolicyCard title="8. Delivery Failure">
            <p>
              If delivery cannot be completed because incorrect or incomplete
              customer information was provided, the customer was unavailable,
              or the delivery location was outside the applicable service
              area, the order may require additional arrangements before a
              refund or replacement is considered.
            </p>
          </PolicyCard>

          <PolicyCard title="9. How to Request Cancellation or Refund">
            <p>Contact us with:</p>

            <ul className="list-disc space-y-1 pl-6">
              <li>Order ID</li>
              <li>Customer name</li>
              <li>Phone number</li>
              <li>Reason for the request</li>
              <li>Relevant payment details, where necessary</li>
              <li>
                Photographs, where the request concerns product damage
              </li>
            </ul>

            <div className="mt-5 rounded-2xl bg-[#f2e1cb] p-5">
              <p className="font-bold">Piyush&apos;s Bakery</p>
              <p>Phone: +91 87673 42441</p>
              <p>Bharati Vidyapeeth, Pune, Maharashtra</p>
            </div>
          </PolicyCard>

          <PolicyCard title="10. Policy Changes">
            <p>
              We may update this Refund &amp; Cancellation Policy when our
              products, ordering process, payment arrangements or applicable
              requirements change.
            </p>
          </PolicyCard>
        </div>
      </section>
    </main>
  );
}

function PolicyCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-[#4b2719]/10 bg-white p-6 shadow-[0_8px_30px_rgba(75,39,25,.05)] md:p-8">
      <h2 className="font-display text-2xl text-[#4b2719] md:text-3xl">
        {title}
      </h2>

      <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#76584a]">
        {children}
      </div>
    </article>
  );
}