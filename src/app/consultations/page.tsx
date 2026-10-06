import { ConsultationsPage } from "@/components/services/service-catalog-pages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Doctor consultations | Medicine Platform", description: "Explore sample doctor specialties, consultation types, availability, and demo booking times." };

export default function ConsultationsRoute() {
  return <ConsultationsPage />;
}
