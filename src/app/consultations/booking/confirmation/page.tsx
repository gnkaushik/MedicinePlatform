import { ConsultationConfirmationPage } from "@/components/services/service-booking-pages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Consultation confirmed | Medicine Platform", robots: { index: false, follow: false } };

export default function ConsultationConfirmationRoute() {
  return <ConsultationConfirmationPage />;
}
