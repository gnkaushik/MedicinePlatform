import { LabTestsPage } from "@/components/services/service-catalog-pages";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Lab tests | Medicine Platform", description: "Compare sample lab tests, included markers, preparation guidance, and home collection availability." };

export default function LabTestsRoute() {
  return <LabTestsPage />;
}
