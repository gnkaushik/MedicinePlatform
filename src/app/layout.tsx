import type { Metadata } from "next";
import { AuthProvider } from "@/auth/auth-context";
import { CartProvider } from "@/cart/cart-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medicine Platform",
  description: "A modern digital healthcare experience."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><AuthProvider><CartProvider>{children}</CartProvider></AuthProvider></body>
    </html>
  );
}
