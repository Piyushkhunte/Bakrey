import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/cartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://bakrey.vercel.app"),

  title: {
    default: "Piyush's Bakery | Fresh Cakes, Pastries & Bakes in Pune",
    template: "%s | Piyush's Bakery",
  },

  description:
    "Order fresh cakes, pastries, breads, snacks, savouries and desserts from Piyush's Bakery near Bharati Vidyapeeth, Pune. Choose delivery or pickup.",

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
    title: "Piyush's Bakery | Fresh Cakes, Pastries & Bakes in Pune",
    description:
      "Order fresh cakes, pastries, breads, snacks, savouries and desserts from Piyush's Bakery near Bharati Vidyapeeth, Pune.",
    type: "website",
    locale: "en_IN",
    siteName: "Piyush's Bakery",
  },

  twitter: {
    card: "summary_large_image",
    title: "Piyush's Bakery | Fresh Cakes, Pastries & Bakes in Pune",
    description:
      "Order fresh cakes, pastries, breads, snacks, savouries and desserts from Piyush's Bakery near Bharati Vidyapeeth, Pune.",
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
