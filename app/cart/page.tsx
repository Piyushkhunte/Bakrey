import type { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your selected cakes, pastries, snacks, savouries and other fresh bakes from Piyush's Bakery before checkout.",
  alternates: {
    canonical: "/cart",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPageRoute() {
  return <CartPage />;
}
