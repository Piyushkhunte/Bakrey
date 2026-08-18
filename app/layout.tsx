import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/cartContext";

export const metadata: Metadata = {
  title: {
    default:
      "Piyush's Bakery | Cakes, Pastries, Food & Snacks in Pune",
    template: "%s | Piyush's Bakery",
  },

  description:
    "Piyush's Bakery near Bharati Vidyapeeth, Pune offers freshly baked cakes, pastries, breads, snacks, savouries, desserts and more with delivery and pickup.",

  keywords: [
    "Piyush's Bakery",
    "bakery in Pune",
    "bakery near Bharati Vidyapeeth",
    "cakes in Pune",
    "pastries in Pune",
    "fresh bakery Pune",
    "bakery food Pune",
    "snacks Pune",
    "desserts Pune",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "Piyush's Bakery | Cakes, Pastries, Food & Snacks in Pune",

    description:
      "Fresh cakes, pastries, breads, snacks, savouries and desserts near Bharati Vidyapeeth, Pune.",

    type: "website",
    locale: "en_IN",
    siteName: "Piyush's Bakery",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Piyush's Bakery | Cakes, Pastries, Food & Snacks in Pune",
    description:
      "Fresh cakes, pastries, breads, snacks, savouries and desserts near Bharati Vidyapeeth, Pune.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}