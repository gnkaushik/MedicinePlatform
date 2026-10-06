import { ConsultationReviewPage } from "@/components/services/service-booking-pages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Review consultation | Medicine Platform", robots: { index: false, follow: false } };

export default function ConsultationReviewRoute() {
  return <ConsultationReviewPage />;
}
