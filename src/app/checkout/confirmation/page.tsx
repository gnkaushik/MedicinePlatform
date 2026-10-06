import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";

export const metadata: Metadata = { title: "Order confirmation | Medicine Platform", description: "Confirmation for your sample order." };

export default function ConfirmationRoute() {
  return <><SiteHeader /><OrderConfirmation /><footer className="border-t border-line bg-white"><div className="container-app py-6 text-sm text-slate-500">Medicine Platform POC · Sample order only</div></footer></>;
}
