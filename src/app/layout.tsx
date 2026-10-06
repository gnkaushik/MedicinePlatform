import type { Metadata } from "next";
import { AuthProvider } from "@/auth/auth-context";
import { CartProvider } from "@/cart/cart-context";
import { OrderFlowProvider } from "@/orders/order-context";
import { HealthcareBookingProvider } from "@/services/booking-context";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? "http://localhost:3000"),
  applicationName: "Medicine Platform",
  title: "Medicine Platform | Everyday care, made clearer",
  description: "Browse everyday medicines, book doctor consultations, and explore home collection lab tests in one calm healthcare experience.",
  openGraph: {
    type: "website",
    siteName: "Medicine Platform",
    title: "Medicine Platform | Everyday care, made clearer",
    description: "Browse everyday medicines, book doctor consultations, and explore home collection lab tests in one calm healthcare experience."
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><AuthProvider><CartProvider><OrderFlowProvider><HealthcareBookingProvider>{children}</HealthcareBookingProvider></OrderFlowProvider></CartProvider></AuthProvider></body>
    </html>
  );
}
