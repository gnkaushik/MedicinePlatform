import { LabBookingDetailsPage } from "@/components/services/service-booking-pages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Patient details | Lab test | Medicine Platform", robots: { index: false, follow: false } };

export default function LabBookingDetailsRoute() {
  return <LabBookingDetailsPage />;
}
