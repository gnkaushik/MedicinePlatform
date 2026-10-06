import { LabBookingConfirmationPage } from "@/components/services/service-booking-pages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Lab booking confirmed | Medicine Platform", robots: { index: false, follow: false } };

export default function LabBookingConfirmationRoute() {
  return <LabBookingConfirmationPage />;
}
