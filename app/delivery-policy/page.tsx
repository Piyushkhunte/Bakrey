export default function DeliveryPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] text-[#4b2719]">
      <section className="bg-[#4b2719] px-6 py-20 text-center text-[#fffaf2]">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f0a16f]">
          Piyush&apos;s Bakery
        </p>

        <h1 className="mt-4 font-display text-5xl md:text-6xl">
          Delivery Policy
        </h1>

        <p className="mt-5 text-sm text-[#f2e1cb]">
          Freshly baked. Carefully delivered.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <div className="space-y-6">
          <PolicyCard title="1. Delivery Area">
            <p>
              Piyush&apos;s Bakery is based in Bharati Vidyapeeth, Pune,
              Maharashtra.
            </p>

            <p>
              Delivery is available only to locations that are serviceable
              by the bakery at the time of the order.
            </p>

            <p>
              Delivery availability may depend on distance, delivery
              capacity, weather, traffic and other operational conditions.
            </p>
          </PolicyCard>

          <PolicyCard title="2. Free Home Delivery">
            <div className="rounded-2xl bg-[#f2e1cb] p-6">
              <p className="text-lg font-bold text-[#4b2719]">
                Free home delivery on orders above ₹200.
              </p>

              <p className="mt-2 text-sm">
                Delivery is subject to serviceability and the applicable
                delivery conditions.
              </p>
            </div>
          </PolicyCard>

          <PolicyCard title="3. Delivery Charges">
            <p>
              Orders below the applicable free-delivery threshold may be
              subject to a delivery charge where applicable.
            </p>

            <p>
              Any applicable delivery fee should be displayed during the
              checkout process before the customer completes payment.
            </p>
          </PolicyCard>

          <PolicyCard title="4. Delivery Address">
            <p>
              Customers are responsible for providing a complete and accurate
              delivery address, including:
            </p>

            <ul className="list-disc space-y-1 pl-6">
              <li>House/building number</li>
              <li>Street or locality</li>
              <li>Area</li>
              <li>City</li>
              <li>Landmark where useful</li>
              <li>Correct contact number</li>
            </ul>

            <p>
              An incorrect or incomplete address may result in delayed or
              unsuccessful delivery.
            </p>
          </PolicyCard>

          <PolicyCard title="5. Receiving Your Order">
            <p>
              Customers should remain reasonably available at the provided
              delivery address around the expected delivery period.
            </p>

            <p>
              If the customer is unavailable, the delivery may need to be
              rescheduled or otherwise handled according to the circumstances
              of the order.
            </p>
          </PolicyCard>

          <PolicyCard title="6. Fresh Bakery Products">
            <p>
              Bakery products are prepared with freshness in mind. Customers
              should consume and store products according to any storage
              instructions provided with the order.
            </p>

            <p>
              Certain products may require refrigeration or other appropriate
              storage after delivery.
            </p>
          </PolicyCard>

          <PolicyCard title="7. Delays Beyond Our Control">
            <p>
              Delivery times may be affected by traffic, severe weather,
              road restrictions, unexpected operational problems, public
              events, technical issues or other circumstances beyond our
              reasonable control.
            </p>

            <p>
              We will make reasonable efforts to communicate significant
              delays where possible.
            </p>
          </PolicyCard>

          <PolicyCard title="8. Incorrect or Damaged Orders">
            <p>
              If you receive the wrong product or a product that appears to
              have been materially damaged during delivery, contact us as
              soon as reasonably possible.
            </p>

            <p>
              Please provide your order ID and photographs where appropriate
              so that we can investigate and determine the appropriate
              resolution.
            </p>
          </PolicyCard>

          <PolicyCard title="9. Pickup Orders">
            <p>
              Where pickup is offered, the customer will be informed of the
              applicable pickup arrangements. Customers should collect the
              order within the agreed or communicated collection period.
            </p>
          </PolicyCard>

          <PolicyCard title="10. Contact">
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
  children: React.ReactNode;
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