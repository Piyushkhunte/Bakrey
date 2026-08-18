"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  email?: string | null;
  fulfillment_type: "delivery" | "pickup";
  delivery_address?: string | null;
  notes?: string | null;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  order_status: string;
  payment_status: string;
  razorpay_order_id?: string | null;
  created_at: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/admin/orders", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to load orders.",
          );
        }

        setOrders(result.orders ?? []);
      } catch (error) {
        console.error("Failed to load admin orders:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load orders.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  const paidOrders = orders.filter(
    (order) => order.payment_status === "paid",
  );

  const pendingOrders = orders.filter(
    (order) => order.payment_status === "pending",
  );

  const totalRevenue = paidOrders.reduce(
    (total, order) => total + Number(order.total_amount),
    0,
  );

  return (
    <main className="min-h-screen bg-[#fffaf2] px-5 py-10 text-[#4b2719] lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c65334]">
              Piyush&apos;s Bakery
            </p>

            <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
              Orders
            </h1>

            <p className="mt-2 text-[#76584a]">
              Manage customer orders and payment status.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Orders"
            value={orders.length.toString()}
            icon="📦"
          />

          <StatCard
            title="Paid Orders"
            value={paidOrders.length.toString()}
            icon="✓"
          />

          <StatCard
            title="Pending Payment"
            value={pendingOrders.length.toString()}
            icon="⏳"
          />

          <StatCard
            title="Revenue"
            value={`₹${totalRevenue.toFixed(2)}`}
            icon="₹"
          />

        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="text-4xl">📦</div>

            <p className="mt-4 font-semibold">
              Loading orders...
            </p>
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="mt-8 rounded-3xl bg-red-50 p-6 text-red-700">
            <p className="font-bold">
              Failed to load orders
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        )}

        {/* ORDERS */}
        {!loading && !error && (
          <div className="mt-8 space-y-5">

            {orders.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
                <div className="text-5xl">📦</div>

                <h2 className="mt-4 font-display text-2xl font-bold">
                  No orders yet
                </h2>

                <p className="mt-2 text-[#76584a]">
                  Orders will appear here after customers place them.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))
            )}

          </div>
        )}

      </div>
    </main>
  );
}

/* ---------------------------------- */
/* STAT CARD */
/* ---------------------------------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(75,39,25,.05)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-[#a57d69]">
          {title}
        </p>

        <span className="grid size-9 place-items-center rounded-full bg-[#f2e1cb] text-sm">
          {icon}
        </span>
      </div>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* ORDER CARD */
/* ---------------------------------- */

function OrderCard({
  order,
}: {
  order: Order;
}) {
  const formattedDate = new Date(
    order.created_at,
  ).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(75,39,25,.06)]">

      {/* TOP */}
      <div className="flex flex-col gap-4 border-b border-[#4b2719]/10 p-6 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#a57d69]">
            Order ID
          </p>

          <p className="mt-1 break-all font-mono text-sm font-semibold">
            {order.id}
          </p>

          <p className="mt-2 text-xs text-[#76584a]">
            {formattedDate}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusBadge
            type="payment"
            value={order.payment_status}
          />

          <StatusBadge
            type="order"
            value={order.order_status}
          />
        </div>

      </div>

      {/* CUSTOMER + ORDER */}
      <div className="grid gap-6 p-6 lg:grid-cols-3">

        {/* CUSTOMER */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#a57d69]">
            Customer
          </p>

          <h3 className="mt-2 text-lg font-bold">
            {order.customer_name}
          </h3>

          <p className="mt-1 text-sm text-[#76584a]">
            📞 {order.phone}
          </p>

          {order.email && (
            <p className="mt-1 break-all text-sm text-[#76584a]">
              ✉️ {order.email}
            </p>
          )}
        </div>

        {/* FULFILLMENT */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#a57d69]">
            Fulfillment
          </p>

          <p className="mt-2 font-bold capitalize">
            {order.fulfillment_type === "delivery"
              ? "🚚 Delivery"
              : "🏪 Pickup"}
          </p>

          {order.delivery_address && (
            <p className="mt-2 text-sm leading-6 text-[#76584a]">
              {order.delivery_address}
            </p>
          )}

          {order.notes && (
            <div className="mt-3 rounded-xl bg-[#fffaf2] p-3">
              <p className="text-xs font-bold uppercase text-[#a57d69]">
                Notes
              </p>

              <p className="mt-1 text-sm text-[#76584a]">
                {order.notes}
              </p>
            </div>
          )}
        </div>

        {/* AMOUNT */}
        <div className="rounded-2xl bg-[#f2e1cb] p-5">

          <p className="text-xs font-bold uppercase tracking-wider text-[#a57d69]">
            Payment Summary
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{Number(order.subtotal).toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                ₹{Number(order.delivery_fee).toFixed(2)}
              </span>
            </div>

            <div className="my-3 border-t border-[#4b2719]/10" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                ₹{Number(order.total_amount).toFixed(2)}
              </span>
            </div>
          </div>

          {order.razorpay_order_id && (
            <p className="mt-4 break-all text-[11px] text-[#76584a]">
              Razorpay: {order.razorpay_order_id}
            </p>
          )}

        </div>

      </div>

    </article>
  );
}

/* ---------------------------------- */
/* STATUS BADGE */
/* ---------------------------------- */

function StatusBadge({
  type,
  value,
}: {
  type: "payment" | "order";
  value: string;
}) {
  let className =
    "bg-gray-100 text-gray-700";

  if (type === "payment") {
    if (value === "paid") {
      className = "bg-green-100 text-green-700";
    } else if (value === "pending") {
      className = "bg-yellow-100 text-yellow-700";
    } else if (value === "failed") {
      className = "bg-red-100 text-red-700";
    }
  }

  if (type === "order") {
    if (value === "confirmed") {
      className = "bg-blue-100 text-blue-700";
    } else if (value === "preparing") {
      className = "bg-orange-100 text-orange-700";
    } else if (value === "ready") {
      className = "bg-purple-100 text-purple-700";
    } else if (value === "delivered") {
      className = "bg-green-100 text-green-700";
    } else if (value === "cancelled") {
      className = "bg-red-100 text-red-700";
    }
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${className}`}
    >
      {type === "payment"
        ? `Payment: ${value}`
        : value}
    </span>
  );
}