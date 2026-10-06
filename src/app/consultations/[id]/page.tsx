import { DoctorBookingPage } from "@/components/services/service-catalog-pages";
import type { Metadata } from "next";
import { mockDoctors } from "@/data/healthcare-services";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const doctor = mockDoctors.find((entry) => entry.id === id);
  return { title: doctor ? `${doctor.name} | Medicine Platform` : "Doctor not found | Medicine Platform", description: doctor ? `${doctor.specialty} consultation details and sample availability for ${doctor.name}.` : "Browse sample doctor consultations and specialties." };
}

export default function DoctorRoute() {
  return <DoctorBookingPage />;
}
