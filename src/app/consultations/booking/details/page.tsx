import { ConsultationDetailsPage } from "@/components/services/service-booking-pages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Patient details | Doctor consultation | Medicine Platform", robots: { index: false, follow: false } };

export default function ConsultationDetailsRoute() {
  return <ConsultationDetailsPage />;
}
