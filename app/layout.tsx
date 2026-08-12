import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crumb & Co. | Freshly baked in Katraj",
  description: "Your neighbourhood bakery near Bharati Vidyapeeth, Pune.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
