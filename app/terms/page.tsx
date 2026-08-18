import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions for using the Piyush's Bakery website, placing orders, payments, delivery, cancellations, refunds and custom bakery orders.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Piyush's Bakery",
    description:
      "Terms and conditions for Piyush's Bakery website use, orders, payments, delivery and bakery services.",
    type: "website",
    locale: "en_IN",
    siteName: "Piyush's Bakery",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#4b2719]">
      <section className="bg-[#4b2719] px-6 py-20 text-center text-[#fffaf2]">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f0a16f]">
          Piyush&apos;s Bakery
        </p>

        <h1 className="mt-4 font-display text-5xl md:text-6xl">
          Terms &amp; Conditions
        </h1>

        <p className="mt-5 text-sm text-[#f2e1cb]">
          Last updated: August 2026
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <div className="space-y-6">
          <PolicyCard title="1. About These Terms">
            <p>
              These Terms &amp; Conditions govern your use of the Piyush&apos;s
              Bakery website and your purchase of bakery products and related
              services through the website.
            </p>

            <p>
              By using the website or placing an order, you agree to these
              Terms &amp; Conditions.
            </p>
          </PolicyCard>

          <PolicyCard title="2. Our Products">
            <p>
              Bakery products are prepared fresh and may vary slightly in
              appearance, decoration, colour, size or finish from photographs
              displayed on the website.
            </p>

            <p>
              Product availability may change depending on stock,
              ingredients, preparation capacity and seasonal availability.
            </p>
          </PolicyCard>

          <PolicyCard title="3. Product Information">
            <p>
              We make reasonable efforts to ensure that product names,
              descriptions, prices and images are accurate.
            </p>

            <p>
              If an important product detail differs from what was displayed
              at the time of purchase, please contact us promptly.
            </p>
          </PolicyCard>

          <PolicyCard title="4. Placing an Order">
            <p>When placing an order, you are responsible for providing:</p>

            <ul className="list-disc space-y-1 pl-6">
              <li>Correct name</li>
              <li>Valid phone number</li>
              <li>Valid email address where requested</li>
              <li>Correct delivery address where applicable</li>
              <li>Accurate product and quantity information</li>
            </ul>

            <p>
              An order is subject to product availability and successful
              payment where online payment is required.
            </p>
          </PolicyCard>

          <PolicyCard title="5. Prices and Payment">
            <p>
              Product prices are displayed in Indian Rupees (INR).
            </p>

            <p>
              Applicable delivery charges, discounts or other charges will be
              shown during the ordering process where applicable.
            </p>

            <p>
              Online payments may be processed through Razorpay or another
              authorised payment provider.
            </p>
          </PolicyCard>

          <PolicyCard title="6. Custom and Pre-Orders">
            <p>
              Custom cakes and advance orders may require additional
              preparation time and confirmation from the bakery.
            </p>

            <p>
              Customisation requests such as names, messages, colours,
              designs or other specifications should be confirmed carefully
              before preparation begins.
            </p>

            <p>
              Once preparation of a customised or perishable order has
              started, cancellation or modification may not be possible.
            </p>
          </PolicyCard>

          <PolicyCard title="7. Delivery and Pickup">
            <p>
              Delivery is subject to serviceability, availability and the
              delivery arrangements applicable to the order.
            </p>

            <p>
              Customers are responsible for providing accurate delivery
              information and being reasonably available to receive the
              order.
            </p>
          </PolicyCard>

          <PolicyCard title="8. Cancellations and Refunds">
            <p>
              Cancellation and refund requests are handled according to our
              Refund &amp; Cancellation Policy.
            </p>

            <p>
              Fresh and customised bakery products may have different
              cancellation conditions because they are prepared specifically
              for an order.
            </p>
          </PolicyCard>

          <PolicyCard title="9. Website Use">
            <p>You agree not to:</p>

            <ul className="list-disc space-y-1 pl-6">
              <li>Use the website for unlawful purposes</li>
              <li>Attempt to interfere with website security</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to access unauthorised systems or data</li>
              <li>Copy or misuse website content without permission</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="10. Intellectual Property">
            <p>
              The Piyush&apos;s Bakery name, logo, website design, text,
              photographs, graphics and other original content are owned by
              or used with permission by the business.
            </p>

            <p>
              Such content may not be copied, reproduced, modified or
              commercially exploited without appropriate permission.
            </p>
          </PolicyCard>

          <PolicyCard title="11. Service Availability">
            <p>
              We may temporarily suspend or restrict website functionality
              for maintenance, technical issues, security reasons, supply
              limitations or circumstances beyond our reasonable control.
            </p>
          </PolicyCard>

          <PolicyCard title="12. Governing Law">
            <p>
              These Terms &amp; Conditions shall be interpreted in accordance
              with the laws applicable in India, subject to applicable
              consumer-protection and other mandatory legal rights.
            </p>
          </PolicyCard>

          <PolicyCard title="13. Jurisdiction">
            <p>
              Piyush&apos;s Bakery operates from Bharati Vidyapeeth, Pune,
              Maharashtra.
            </p>

            <p>
              Subject to applicable law, disputes arising from these Terms or
              purchases through the website shall be subject to the competent
              courts and authorities having jurisdiction in Pune, Maharashtra.
            </p>
          </PolicyCard>

          <PolicyCard title="14. Contact">
            <div className="rounded-2xl bg-[#f2e1cb] p-5">
              <p className="font-bold">Piyush&apos;s Bakery</p>
              <p>Bharati Vidyapeeth, Pune, Maharashtra</p>
              <p>Phone: +91 87673 42441</p>
            </div>
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