import { LabBookingReviewPage } from "@/components/services/service-booking-pages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Review lab booking | Medicine Platform", robots: { index: false, follow: false } };

export default function LabBookingReviewRoute() {
  return <LabBookingReviewPage />;
}
