import type { MetadataRoute } from "next";
import { mockMedicines } from "@/data/medicines";
import { mockDoctors, mockLabTests } from "@/data/healthcare-services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.URL ?? "http://localhost:3000";
  const publicRoutes = ["", "/medicines", "/consultations", "/lab-tests"];
  return [
    ...publicRoutes.map((route) => ({ url: new URL(route, base).toString(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })),
    ...mockMedicines.map(({ id }) => ({ url: new URL(`/medicines/${id}`, base).toString(), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...mockDoctors.map(({ id }) => ({ url: new URL(`/consultations/${id}`, base).toString(), changeFrequency: "monthly" as const, priority: 0.5 })),
    ...mockLabTests.map(({ id }) => ({ url: new URL(`/lab-tests/${id}`, base).toString(), changeFrequency: "monthly" as const, priority: 0.5 }))
  ];
}
