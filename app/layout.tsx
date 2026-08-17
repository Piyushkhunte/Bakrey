import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/cartContext";

export const metadata: Metadata = {
  title: "Piyush's Bakery | Freshly baked in Bharati Vidyapeeth, Pune",
  description: "Your neighbourhood bakery near Bharati Vidyapeeth, Pune.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
