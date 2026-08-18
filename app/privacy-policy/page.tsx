import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Piyush's Bakery privacy policy covering customer information, orders, payments, cookies, data security, retention and third-party services.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Piyush's Bakery",
    description:
      "Learn how Piyush's Bakery collects, uses and protects customer information.",
    type: "website",
    locale: "en_IN",
    siteName: "Piyush's Bakery",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#402b22]">
      {/* HEADER */}
      <header className="bg-[#4b2719] px-5 py-14 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            ← Back to Home
          </a>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f5ba77]">
              Piyush&apos;s Bakery
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
              Your privacy matters to us. This page explains what information
              we collect, why we collect it, and how we protect it when you
              use our website and ordering services.
            </p>

            <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
              Last updated: August 2026
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <article className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* MAIN POLICY */}
          <div className="rounded-3xl border border-[#4b2719]/10 bg-white p-6 shadow-[0_10px_40px_rgba(75,39,25,.06)] sm:p-10">
            <div className="space-y-10">
              {/* 1 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  1. Introduction
                </h2>

                <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#76584a]">
                  <p>
                    Piyush&apos;s Bakery respects your privacy. This Privacy
                    Policy explains what information we collect when you visit
                    our website, place an order, contact us, or otherwise use
                    our services.
                  </p>

                  <p>
                    Our bakery operates from Bharati Vidyapeeth, Pune,
                    Maharashtra, and this policy applies to information
                    collected through this website and our order-related
                    communications.
                  </p>
                </div>
              </section>

              {/* 2 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  2. Information We Collect
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#76584a]">
                  Depending on how you use the website, we may collect:
                </p>

                <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#76584a]">
                  <li className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d86436]" />
                    <span>Your name.</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d86436]" />
                    <span>Your phone number and email address.</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d86436]" />
                    <span>Delivery or pickup information.</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d86436]" />
                    <span>
                      Order details, products purchased, quantities and
                      amounts.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d86436]" />
                    <span>Payment and transaction references.</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d86436]" />
                    <span>
                      Messages or information you send when contacting us.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#d86436]" />
                    <span>
                      Basic technical information required to operate and
                      secure the website.
                    </span>
                  </li>
                </ul>
              </section>

              {/* 3 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  3. How We Use Your Information
                </h2>

                <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#76584a]">
                  <li>• To process and fulfil your orders.</li>
                  <li>• To arrange delivery or pickup.</li>
                  <li>• To contact you about your order.</li>
                  <li>• To process and verify online payments.</li>
                  <li>• To respond to customer support requests.</li>
                  <li>• To prevent fraud and misuse.</li>
                  <li>• To improve our website and customer experience.</li>
                  <li>
                    • To send promotional communications where permitted.
                  </li>
                </ul>
              </section>

              {/* 4 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  4. Payments
                </h2>

                <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#76584a]">
                  <p>
                    Online payments may be processed through Razorpay or
                    another payment service displayed at checkout. Payment
                    providers process payment information according to their
                    own privacy policies and security practices.
                  </p>

                  <p>
                    Piyush&apos;s Bakery does not need your full card, UPI or
                    banking credentials to fulfil an order and should never
                    request them by phone, WhatsApp or email.
                  </p>
                </div>
              </section>

              {/* 5 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  5. Cookies and Similar Technologies
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#76584a]">
                  The website may use cookies, local storage or similar
                  technologies for essential functionality such as maintaining
                  your cart, improving navigation and remembering relevant
                  preferences.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  6. Sharing of Information
                </h2>

                <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#76584a]">
                  <p>
                    We may share limited information with service providers
                    when necessary to operate the website or fulfil your order,
                    including payment processing, hosting, database, delivery
                    or communication services.
                  </p>

                  <p>
                    We do not sell your personal information as a product. We
                    may disclose information when required by applicable law or
                    legal process.
                  </p>
                </div>
              </section>

              {/* 7 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  7. Data Security
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#76584a]">
                  We take reasonable technical and organisational measures to
                  protect information against unauthorised access, alteration,
                  disclosure or destruction. However, no internet system can be
                  guaranteed to be completely secure.
                </p>
              </section>

              {/* 8 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  8. Data Retention
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#76584a]">
                  We retain order and contact information for as long as
                  reasonably necessary for order fulfilment, customer support,
                  accounting, dispute resolution, security and legal
                  requirements.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  9. Your Choices
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#76584a]">
                  You may contact us to ask about the personal information we
                  hold about you, request correction of inaccurate information,
                  or ask questions about how your information is used.
                </p>
              </section>

              {/* 10 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  10. Children
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#76584a]">
                  Our website is intended for general customers and is not
                  designed to knowingly collect personal information from
                  children without appropriate parental involvement.
                </p>
              </section>

              {/* 11 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  11. Third-Party Services
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#76584a]">
                  Links or integrations with third-party services may take you
                  to websites governed by their own terms and privacy policies.
                </p>
              </section>

              {/* 12 */}
              <section>
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  12. Changes to This Policy
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#76584a]">
                  We may update this Privacy Policy when our services,
                  technology or legal requirements change. The updated version
                  will be posted on this page with a revised update date.
                </p>
              </section>

              {/* 13 */}
              <section className="rounded-2xl border border-[#d86436]/20 bg-[#fff7ed] p-6">
                <h2 className="text-2xl font-bold text-[#4b2719]">
                  13. Contact &amp; Jurisdiction
                </h2>

                <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#76584a]">
                  <p>
                    For privacy questions or requests, contact Piyush&apos;s
                    Bakery through the phone number, WhatsApp or email
                    displayed on our website.
                  </p>

                  <div className="rounded-xl bg-white p-4">
                    <p>
                      <strong className="text-[#4b2719]">
                        Business Location:
                      </strong>{" "}
                      Bharati Vidyapeeth, Pune, Maharashtra, India.
                    </p>

                    <p className="mt-2">
                      <strong className="text-[#4b2719]">
                        Jurisdiction:
                      </strong>{" "}
                      Subject to applicable law, disputes relating to this
                      policy or the website shall be subject to the
                      appropriate courts having jurisdiction in Pune,
                      Maharashtra.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="h-fit space-y-4 lg:sticky lg:top-6">
            <div className="rounded-3xl bg-[#4b2719] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5ba77]">
                Piyush&apos;s Bakery
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Need help?
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                If you have questions about your personal information or an
                order, contact our bakery team.
              </p>

              <a
                href="tel:+918767342441"
                className="mt-5 block rounded-full bg-[#d86436] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#c65334]"
              >
                Call 8767342441
              </a>
            </div>

            <div className="rounded-3xl border border-[#4b2719]/10 bg-[#f2e1cb] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#99523a]">
                Legal
              </p>

              <div className="mt-4 space-y-3 text-sm font-semibold">
                <a
                  href="/privacy-policy"
                  className="block text-[#4b2719] hover:text-[#d86436]"
                >
                  Privacy Policy
                </a>

                <a
                  href="/terms"
                  className="block text-[#4b2719] hover:text-[#d86436]"
                >
                  Terms &amp; Conditions
                </a>

                <a
                  href="/refund-policy"
                  className="block text-[#4b2719] hover:text-[#d86436]"
                >
                  Refund &amp; Cancellation
                </a>
              </div>
            </div>

            <a
              href="/"
              className="block rounded-full border border-[#4b2719]/15 bg-white px-5 py-3 text-center text-sm font-bold text-[#4b2719] transition hover:border-[#d86436] hover:text-[#d86436]"
            >
              ← Return to Piyush&apos;s Bakery
            </a>
          </aside>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="border-t border-[#4b2719]/10 bg-[#fff7ed] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 text-center text-sm text-[#76584a] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © 2026 Piyush&apos;s Bakery. All rights reserved.
          </p>

          <a
            href="/"
            className="font-bold text-[#4b2719] transition hover:text-[#d86436]"
          >
            Back to Home →
          </a>
        </div>
      </footer>
    </main>
  );
}