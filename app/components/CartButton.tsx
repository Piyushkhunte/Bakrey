"use client";

import Link from "next/link";
import { useCart } from "../context/cartContext";

export default function CartButton() {
  const { items } = useCart();

  const itemCount = items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  return (
    <Link
      href="/cart"
      aria-label={`Shopping cart with ${itemCount} item${
        itemCount === 1 ? "" : "s"
      }`}
      className="relative grid size-11 place-items-center rounded-full border border-[#4b2719]/15 bg-white text-[#4b2719] transition hover:border-[#d86436] hover:text-[#d86436]"
    >
      <span className="text-xl" aria-hidden="true">
        🛒
      </span>

      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#d86436] px-1 text-[10px] font-bold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}