"use client";

import { useState } from "react";
import { urlFor } from "../../sanity/lib/image";

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

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category?.name === selectedCategory
        );

  return (
    <div>
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
                  {product.isFeatured ? "Featured" : "Fresh today"}
                </span>
              </div>

              <div className="p-3.5">
                <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-[#a57d69]">
                  {product.category?.name || "Bakery favourite"}
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

                <a
                  href="tel:+919000000000"
                  className="mt-3 inline-block text-[10px] font-bold uppercase tracking-wider text-[#6d5145] transition hover:text-[#d86436]"
                >
                  Call to order +
                </a>
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
  );
}