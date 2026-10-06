import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Home | Medicine Platform",
  description: "Find familiar everyday medicines and wellness essentials in one calm, easy-to-browse place."
};

export default function Home() {
  return <HomePage />;
}
