import type { Metadata } from "next";
import CheckoutPage from "./CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your Piyush's Bakery order with secure online payment and choose home delivery or store pickup in Pune.",
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheckoutPageRoute() {
  return <CheckoutPage />;
}