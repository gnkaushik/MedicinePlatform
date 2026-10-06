import { LabTestBookingPage } from "@/components/services/service-catalog-pages";
import type { Metadata } from "next";
import { mockLabTests } from "@/data/healthcare-services";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const test = mockLabTests.find((entry) => entry.id === id);
  return { title: test ? `${test.name} | Medicine Platform` : "Lab test not found | Medicine Platform", description: test ? `${test.description} Sample price ₹${test.price}.` : "Browse sample lab tests and home collection availability." };
}

export default function LabTestRoute() {
  return <LabTestBookingPage />;
}
