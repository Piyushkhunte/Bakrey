"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/image";
import { useCart } from "../context/cartContext";

type Product = {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
  description?: string;
  price: number;
  isFeatured?: boolean;
  isAvailable?: boolean;
  image?: any;
  category?: {
    _id: string;
    name: string;
    slug?: {
      current: string;
    };
  };
};

type ProductMenuProps = {
  products: Product[];
};

const categories = [
  "All",
  "Cakes",
  "Pastries",
  "Breads",
  "Savouries",
];

export default function ProductMenu({ products }: ProductMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [toast, setToast] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);

    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category?.name === selectedCategory,
        );

  const handleAddToCart = (product: Product) => {
    if (product.isAvailable === false) {
      return;
    }

    console.log("ADD TO CART CLICKED:", product.name);

    addToCart({
      _id: product._id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    });

    // Clear previous toast timer
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    // Show toast
    setToast(`${product.name} added to cart`);

    // Hide after 3 seconds
    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const closeToast = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToast(null);
  };

  return (
    <>
      {/* ================================
          TOAST
          ================================ */}
      {mounted &&
        toast &&
        createPortal(
          <div
            role="status"
            aria-live="polite"
            style={{
              position: "fixed",
              top: "24px",
              right: "24px",
              zIndex: 2147483647,
            }}
            className="flex w-[calc(100vw-32px)] max-w-[390px] items-center gap-3 rounded-2xl bg-[#4b2719] px-5 py-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            {/* SUCCESS ICON */}
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#d86436] text-xl font-black">
              ✓
            </div>

            {/* MESSAGE */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">
                Added to cart
              </p>

              <p className="mt-0.5 truncate text-xs text-white/75">
                {toast}
              </p>

              <Link
                href="/cart"
                onClick={closeToast}
                className="mt-1.5 inline-block text-xs font-bold text-[#f5ba77] underline underline-offset-2 hover:text-white"
              >
                View cart →
              </Link>
            </div>

            {/* CLOSE */}
            <button
              type="button"
              onClick={closeToast}
              aria-label="Close notification"
              className="grid size-8 shrink-0 place-items-center rounded-full text-lg text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </div>,
          document.body,
        )}

      {/* ================================
          PRODUCT MENU
          ================================ */}
      <div className="relative">
        {/* CATEGORY FILTER */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? "bg-[#4b2719] text-white"
                    : "border border-[#4b2719]/15 bg-white text-[#6d5145] hover:border-[#d86436] hover:text-[#d86436]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {filteredProducts.map((product) => (
              <article
                key={product._id}
                className="group overflow-hidden rounded-2xl bg-white shadow-[0_6px_22px_rgba(75,39,25,.07)]"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={
                      product.image
                        ? urlFor(product.image)
                            .width(640)
                            .height(480)
                            .fit("crop")
                            .url()
                        : "/images/desserts.webp"
                    }
                    alt={product.name}
                    width="640"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-2 top-2 rounded-full bg-[#fffaf2] px-2 py-1 text-[8px] font-extrabold uppercase tracking-wider text-[#99523a]">
                    {product.isFeatured
                      ? "Featured"
                      : "Fresh today"}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="p-3.5">
                  <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-[#a57d69]">
                    {product.category?.name ||
                      "Bakery favourite"}
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-1">
                    <h3 className="font-display text-[1.08rem] leading-5">
                      {product.name}
                    </h3>

                    <span className="text-sm font-bold text-[#c65334]">
                      ₹{product.price}
                    </span>
                  </div>

                  {product.description && (
                    <p className="mt-2 text-xs leading-5 text-[#76584a]">
                      {product.description}
                    </p>
                  )}

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    disabled={product.isAvailable === false}
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className={`mt-4 w-full rounded-full px-4 py-2.5 text-xs font-bold transition ${
                      product.isAvailable === false
                        ? "cursor-not-allowed bg-[#eadfd5] text-[#a58d7d]"
                        : "bg-[#4b2719] text-white hover:bg-[#d86436] active:scale-[0.97]"
                    }`}
                  >
                    {product.isAvailable === false
                      ? "Currently unavailable"
                      : "Add to cart +"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#f2e1cb] px-6 py-10 text-center">
            <p className="font-display text-xl">
              No products in this category yet.
            </p>

            <p className="mt-2 text-sm text-[#76584a]">
              Check back soon for fresh bakes.
            </p>
          </div>
        )}
      </div>
    </>
  );
}