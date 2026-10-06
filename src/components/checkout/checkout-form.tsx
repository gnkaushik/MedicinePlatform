"use client";

import { ArrowLeft, Check, FileImage, FileText, ShieldCheck, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/cart/cart-context";
import { OrderSummary } from "@/components/checkout/order-summary";
import { useOrderFlow } from "@/orders/order-context";
import type { CheckoutDetails, PrescriptionFile } from "@/orders/order-context";
import { deliveryOptions, formatMoney } from "@/orders/pricing";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const acceptedTypes = ["application/pdf", "image/jpeg", "image/png"];
const acceptedExtensions = /\.(pdf|jpe?g|png)$/i;
const emptyDetails: CheckoutDetails = { fullName: "", email: "", phone: "", address: "", addressLine2: "", city: "", region: "", postalCode: "", deliveryMethod: "standard", prescription: null };
type Field = keyof Omit<CheckoutDetails, "deliveryMethod" | "prescription">;

function validate(details: CheckoutDetails): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!details.fullName.trim()) errors.fullName = "Enter the recipient’s name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) errors.email = "Enter a valid email address.";
  if (details.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a phone number with at least 10 digits.";
  if (!details.address.trim()) errors.address = "Enter a delivery address.";
  if (!details.city.trim()) errors.city = "Enter a city or town.";
  if (!details.region.trim()) errors.region = "Enter a state or region.";
  if (!/^[a-z0-9 -]{4,10}$/i.test(details.postalCode.trim())) errors.postalCode = "Enter a valid postal code.";
  return errors;
}

function FieldInput({ id, label, value, error, onChange, type = "text", autoComplete }: { id: Field; label: string; value: string; error?: string; onChange: (value: string) => void; type?: string; autoComplete?: string }) {
  return <div>
    <label htmlFor={id} className="block text-sm font-semibold text-ink">{label}</label>
    <input id={id} name={id} type={type} autoComplete={autoComplete} value={value} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} onChange={(event) => onChange(event.target.value)} className={`mt-1.5 min-h-11 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-brand/10 ${error ? "border-rose-400 focus:border-rose-500" : "border-line focus:border-brand"}`} />
    {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-700">{error}</p>}
  </div>;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items } = useCart();
  const { draft, saveDraft } = useOrderFlow();
  const [details, setDetails] = useState<CheckoutDetails>(draft ?? emptyDetails);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function update(field: Field, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function acceptFile(file?: File) {
    setFileError("");
    if (!file) return;
    if (!acceptedTypes.includes(file.type) && !acceptedExtensions.test(file.name)) {
      setFileError("Choose a PDF, JPG or PNG file.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("This file is larger than 10 MB. Choose a smaller file.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    const metadata: PrescriptionFile = { name: file.name, size: file.size, type: file.type || "application/octet-stream" };
    setDetails((current) => ({ ...current, prescription: metadata }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    acceptFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    acceptFile(event.dataTransfer.files?.[0]);
  }

  function removePrescription() {
    setDetails((current) => ({ ...current, prescription: null }));
    if (inputRef.current) inputRef.current.value = "";
    setFileError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(details);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }
    saveDraft(details);
    router.push("/checkout/review");
  }

  if (items.length === 0) return <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center"><h2 className="text-xl font-bold text-ink">Your cart is empty</h2><p className="mt-2 text-sm text-slate-600">Add a sample medicine before starting checkout.</p><Link href="/medicines" className="mt-5 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white">Browse medicines</Link></div>;

  return <form noValidate onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
    <div className="space-y-5">
      <section aria-labelledby="contact-heading" className="rounded-3xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(16,35,63,0.035)] sm:p-7">
        <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-mint text-sm font-bold text-brand">1</span><div><h2 id="contact-heading" className="text-lg font-bold text-ink">Contact details</h2><p className="mt-0.5 text-sm text-slate-500">Who should receive this sample order?</p></div></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <FieldInput id="fullName" label="Full name" autoComplete="name" value={details.fullName} error={errors.fullName} onChange={(value) => update("fullName", value)} />
          <FieldInput id="email" label="Email address" type="email" autoComplete="email" value={details.email} error={errors.email} onChange={(value) => update("email", value)} />
          <FieldInput id="phone" label="Phone number" type="tel" autoComplete="tel" value={details.phone} error={errors.phone} onChange={(value) => update("phone", value)} />
        </div>
      </section>

      <section aria-labelledby="delivery-heading" className="rounded-3xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(16,35,63,0.035)] sm:p-7">
        <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-mint text-sm font-bold text-brand">2</span><div><h2 id="delivery-heading" className="text-lg font-bold text-ink">Delivery address</h2><p className="mt-0.5 text-sm text-slate-500">Add the address for this demo order.</p></div></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><FieldInput id="address" label="Street address" autoComplete="street-address" value={details.address} error={errors.address} onChange={(value) => update("address", value)} /></div>
          <div className="sm:col-span-2"><FieldInput id="addressLine2" label="Apartment, suite or landmark (optional)" autoComplete="address-line2" value={details.addressLine2} onChange={(value) => update("addressLine2", value)} /></div>
          <FieldInput id="city" label="City or town" autoComplete="address-level2" value={details.city} error={errors.city} onChange={(value) => update("city", value)} />
          <FieldInput id="region" label="State or region" autoComplete="address-level1" value={details.region} error={errors.region} onChange={(value) => update("region", value)} />
          <FieldInput id="postalCode" label="Postal code" autoComplete="postal-code" value={details.postalCode} error={errors.postalCode} onChange={(value) => update("postalCode", value)} />
        </div>
      </section>

      <fieldset className="rounded-3xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(16,35,63,0.035)] sm:p-7"><legend className="sr-only">Delivery option</legend><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-mint text-sm font-bold text-brand">3</span><div><h2 className="text-lg font-bold text-ink">Delivery option</h2><p className="mt-0.5 text-sm text-slate-500">Choose a sample delivery preference.</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{deliveryOptions.map((option) => <label key={option.id} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${details.deliveryMethod === option.id ? "border-brand bg-mint/60 ring-1 ring-brand" : "border-line hover:border-brand/50"}`}><input type="radio" name="deliveryMethod" value={option.id} checked={details.deliveryMethod === option.id} onChange={() => setDetails((current) => ({ ...current, deliveryMethod: option.id }))} className="mt-0.5 size-4 accent-brand" /><span className="min-w-0 flex-1"><span className="flex justify-between gap-2 text-sm font-bold text-ink"><span>{option.name}</span><span>{formatMoney.format(option.fee)}</span></span><span className="mt-1 block text-xs text-slate-500">{option.description}</span></span></label>)}</div></fieldset>

      <section aria-labelledby="prescription-heading" className="rounded-3xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(16,35,63,0.035)] sm:p-7">
        <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-mint text-brand"><FileText size={17} aria-hidden="true" /></span><div><h2 id="prescription-heading" className="text-lg font-bold text-ink">Prescription (optional)</h2><p className="mt-0.5 text-sm text-slate-500">Attach a sample file for this local demo flow.</p></div></div>
        <div onDragEnter={(event) => { event.preventDefault(); setDragActive(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragActive(false); }} onDrop={handleDrop} className={`mt-5 rounded-2xl border border-dashed p-4 transition sm:p-5 ${dragActive ? "border-brand bg-mint" : "border-slate-300 bg-cloud/60"}`}>
          {details.prescription ? <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand">{details.prescription.type.startsWith("image/") ? <FileImage size={19} aria-hidden="true" /> : <FileText size={19} aria-hidden="true" />}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink">{details.prescription.name}</p><p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-emerald-700"><Check size={13} aria-hidden="true" /> Ready in this browser · {Math.max(1, Math.round(details.prescription.size / 1024))} KB</p></div><button type="button" onClick={removePrescription} aria-label="Remove prescription" className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-500 hover:bg-white hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><X size={17} aria-hidden="true" /></button><button type="button" onClick={() => inputRef.current?.click()} className="shrink-0 rounded-lg px-2 py-2 text-xs font-bold text-brand hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Replace</button></div> : <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand"><UploadCloud size={20} aria-hidden="true" /></span><div className="min-w-0 flex-1"><p className="text-sm font-bold text-ink">Drop your file here or <button type="button" onClick={() => inputRef.current?.click()} className="rounded text-brand underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">choose a file</button></p><p className="mt-1 text-xs leading-5 text-slate-500">PDF, JPG or PNG · Up to 10 MB</p></div></div>}
          <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={handleFileChange} aria-label="Upload prescription file" className="sr-only" />
        </div>
        {fileError && <p role="alert" className="mt-2 text-sm font-medium text-rose-700">{fileError}</p>}
        <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-500"><ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />POC only: your file is not transmitted or stored. Only the selected filename is kept in this browser session.</p>
      </section>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Link href="/cart" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-bold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" /> Back to cart</Link><button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">Continue to review <span className="ml-2" aria-hidden="true">→</span></button></div>
    </div>
    <div className="lg:sticky lg:top-28"><OrderSummary items={items} deliveryMethod={details.deliveryMethod} compact /><div className="mt-3 rounded-2xl border border-teal-100 bg-mint/70 p-4 text-xs leading-5 text-slate-600"><span className="font-bold text-brand">Demo checkout</span><br />This preview does not collect payment or submit your address to a server.</div></div>
  </form>;
}
