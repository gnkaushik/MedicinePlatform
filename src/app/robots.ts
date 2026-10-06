import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/medicines/", "/consultations/", "/lab-tests/"],
      disallow: ["/app/", "/cart/", "/checkout/", "/orders/", "/prescriptions/", "/sign-in/", "/consultations/booking/", "/lab-tests/booking/"]
    },
    sitemap: new URL("/sitemap.xml", process.env.URL ?? "http://localhost:3000").toString()
  };
}
