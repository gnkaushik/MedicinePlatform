"use client";

import { useEffect, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, Clock3, FlaskConical, MapPin, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { consultationTypeLabels, formatServiceDate, mockDoctors, mockLabTests } from "@/data/healthcare-services";
import { useAuth } from "@/auth/auth-context";
import { useHealthcareBooking } from "@/services/booking-context";
import { formatMoney } from "@/orders/pricing";
import { BookingSteps, FormField, inputClass, MissingSelection, ServiceCard, ServicePageHeading, ServiceRouteFrame, StatusNote } from "@/components/services/service-ui";

const stages = ["Your details", "Review", "Confirmation"];

function dateLabel(date: string) {
  return formatServiceDate(date);
}

function timeLabel(bookedAt: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(bookedAt));
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-1 border-b border-line py-3 last:border-0 sm:flex-row sm:justify-between sm:gap-4"><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt><dd className="break-words text-sm font-semibold text-ink sm:text-right">{value}</dd></div>;
}

export function ConsultationDetailsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { consultation, updateConsultation } = useHealthcareBooking();
  const doctor = mockDoctors.find((entry) => entry.id === consultation.doctorId);

  useEffect(() => {
    if (user) updateConsultation({ patientName: consultation.patientName || user.name, email: consultation.email || user.email });
  }, [user, consultation.patientName, consultation.email, updateConsultation]);

  if (!doctor || !consultation.date || !consultation.time) return <ServiceRouteFrame><MissingSelection title="Choose your consultation time first" description="Select a doctor, consultation type, date, and time before adding your contact details." href="/consultations" linkText="Choose a doctor" /></ServiceRouteFrame>;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/consultations/booking/review");
  }

  return <ServiceRouteFrame><BookingSteps labels={stages} active={0} /><Link href={`/consultations/${doctor.id}`} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" />Edit date or time</Link><ServicePageHeading eyebrow="Doctor consultation · step 1 of 3" title="Who is the appointment for?" description="Add the contact details for this sample booking." />
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"><form onSubmit={submit} className="space-y-6"><ServiceCard><h2 className="text-lg font-bold text-ink">Patient contact details</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><FormField label="Patient name"><input required autoComplete="name" value={consultation.patientName} onChange={(event) => updateConsultation({ patientName: event.target.value })} className={inputClass} placeholder="Full name" /></FormField><FormField label="Email address"><input required type="email" autoComplete="email" value={consultation.email} onChange={(event) => updateConsultation({ email: event.target.value })} className={inputClass} placeholder="you@example.com" /></FormField><FormField label="Phone number"><input required type="tel" autoComplete="tel" pattern="[0-9+() -]{8,}" value={consultation.phone} onChange={(event) => updateConsultation({ phone: event.target.value })} className={inputClass} placeholder="Contact number" /></FormField></div></ServiceCard><div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Link href={`/consultations/${doctor.id}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" />Back</Link><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Review consultation <ArrowRight size={16} aria-hidden="true" /></button></div></form>
      <aside className="h-fit rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="text-lg font-bold text-ink">Appointment</h2><p className="mt-3 font-semibold text-ink">{doctor.name}</p><p className="mt-1 text-sm text-slate-600">{consultationTypeLabels[consultation.consultationType]}</p><p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><CalendarDays size={16} className="text-brand" aria-hidden="true" />{dateLabel(consultation.date)}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Clock3 size={16} className="text-brand" aria-hidden="true" />{consultation.time}</p><p className="mt-5 border-t border-line pt-4 text-xl font-bold text-ink">{formatMoney.format(doctor.price)}</p></aside></div>
  </ServiceRouteFrame>;
}

export function ConsultationReviewPage() {
  const router = useRouter();
  const { consultation, confirmConsultation } = useHealthcareBooking();
  const doctor = mockDoctors.find((entry) => entry.id === consultation.doctorId);
  if (!doctor || !consultation.date || !consultation.time || !consultation.patientName || !consultation.email || !consultation.phone) return <ServiceRouteFrame><MissingSelection title="Consultation details are incomplete" description="Complete the doctor, time, and patient details before reviewing this booking." href="/consultations" linkText="Start a consultation booking" /></ServiceRouteFrame>;

  function confirm() {
    const booking = confirmConsultation();
    if (booking) router.push("/consultations/booking/confirmation");
  }

  return <ServiceRouteFrame><BookingSteps labels={stages} active={1} /><Link href="/consultations/booking/details" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" />Edit patient details</Link><ServicePageHeading eyebrow="Doctor consultation · step 2 of 3" title="Review your booking" description="Check the appointment and contact information before confirming the sample booking." />
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"><ServiceCard><h2 className="flex items-center gap-2 text-lg font-bold text-ink"><Stethoscope size={19} className="text-brand" aria-hidden="true" />Appointment</h2><dl className="mt-3"><ReviewRow label="Doctor" value={`${doctor.name} · ${doctor.specialty}`} /><ReviewRow label="Consultation type" value={consultationTypeLabels[consultation.consultationType]} /><ReviewRow label="Date" value={dateLabel(consultation.date)} /><ReviewRow label="Time" value={consultation.time} /></dl><h2 className="mt-6 border-t border-line pt-5 text-lg font-bold text-ink">Patient</h2><dl className="mt-2"><ReviewRow label="Name" value={consultation.patientName} /><ReviewRow label="Email" value={consultation.email} /><ReviewRow label="Phone" value={consultation.phone} /></dl></ServiceCard><aside className="h-fit rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="text-lg font-bold text-ink">Fee summary</h2><div className="mt-5 flex justify-between gap-4 border-t border-line pt-4 text-base font-bold text-ink"><span>Consultation fee</span><span>{formatMoney.format(doctor.price)}</span></div><p className="mt-3 text-xs leading-5 text-slate-500">No payment will be collected in this prototype.</p><button onClick={confirm} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Confirm booking <Check size={16} aria-hidden="true" /></button></aside></div>
  </ServiceRouteFrame>;
}

export function ConsultationConfirmationPage() {
  const { consultationConfirmation } = useHealthcareBooking();
  const booking = consultationConfirmation;
  const doctor = booking ? mockDoctors.find((entry) => entry.id === booking.doctorId) : null;
  if (!booking || !doctor) return <ServiceRouteFrame><MissingSelection title="No consultation booking to show" description="Confirmed bookings are kept in temporary demo state for this session." href="/consultations" linkText="Browse consultations" /></ServiceRouteFrame>;
  return <ServiceRouteFrame><div className="mx-auto max-w-2xl"><div className="mb-6 grid size-16 place-items-center rounded-3xl bg-mint text-brand"><CheckCircle2 size={32} aria-hidden="true" /></div><p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">Consultation confirmed</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Your appointment is reserved.</h1><p className="mt-3 text-sm leading-6 text-slate-600">Your sample consultation details are ready. This prototype does not contact a clinic or launch a video call.</p><ServiceCard className="mt-7"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Mock appointment number</p><p className="mt-2 break-all text-2xl font-bold text-ink">{booking.id}</p><dl className="mt-4"><ReviewRow label="Doctor" value={`${doctor.name} · ${doctor.specialty}`} /><ReviewRow label="Consultation" value={consultationTypeLabels[booking.consultationType]} /><ReviewRow label="Date and time" value={`${dateLabel(booking.date)} · ${booking.time}`} /><ReviewRow label="Patient" value={booking.patientName} /><ReviewRow label="Booked" value={timeLabel(booking.bookedAt)} /><ReviewRow label="Sample fee" value={formatMoney.format(doctor.price)} /></dl></ServiceCard><StatusNote>This confirmation is only in memory for this demo session. No clinician, live calendar, payment provider, or video service was contacted.</StatusNote><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/consultations" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Browse consultations <ArrowRight size={16} aria-hidden="true" /></Link><Link href="/app" className="inline-flex flex-1 items-center justify-center rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Care workspace</Link></div></div></ServiceRouteFrame>;
}

export function LabBookingDetailsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { labBooking, updateLabBooking } = useHealthcareBooking();
  const test = mockLabTests.find((entry) => entry.id === labBooking.testId);

  useEffect(() => {
    if (user) updateLabBooking({ patientName: labBooking.patientName || user.name, email: labBooking.email || user.email });
  }, [user, labBooking.patientName, labBooking.email, updateLabBooking]);

  if (!test || !labBooking.date || !labBooking.time) return <ServiceRouteFrame><MissingSelection title="Choose a collection time first" description="Select a lab test, collection date, and time before adding patient details." href="/lab-tests" linkText="Choose a lab test" /></ServiceRouteFrame>;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/lab-tests/booking/review");
  }

  return <ServiceRouteFrame><BookingSteps labels={stages} active={0} /><Link href={`/lab-tests/${test.id}`} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" />Edit test or time</Link><ServicePageHeading eyebrow="Lab test · step 1 of 3" title="Patient and collection details" description="Tell us who the sample collection is for and where the sample should be collected." />
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"><form onSubmit={submit} className="space-y-6"><ServiceCard><h2 className="text-lg font-bold text-ink">Patient contact</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><FormField label="Patient name"><input required autoComplete="name" value={labBooking.patientName} onChange={(event) => updateLabBooking({ patientName: event.target.value })} className={inputClass} placeholder="Full name" /></FormField><FormField label="Email address"><input required type="email" autoComplete="email" value={labBooking.email} onChange={(event) => updateLabBooking({ email: event.target.value })} className={inputClass} placeholder="you@example.com" /></FormField><FormField label="Phone number"><input required type="tel" autoComplete="tel" pattern="[0-9+() -]{8,}" value={labBooking.phone} onChange={(event) => updateLabBooking({ phone: event.target.value })} className={inputClass} placeholder="Contact number" /></FormField></div></ServiceCard><ServiceCard><h2 className="flex items-center gap-2 text-lg font-bold text-ink"><MapPin size={19} className="text-brand" aria-hidden="true" />Home collection address</h2><p className="mt-1 text-sm leading-6 text-slate-600">A sample collector would visit this address in a real service. No address is sent from this demo.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><FormField label="Street address"><input required autoComplete="street-address" value={labBooking.address} onChange={(event) => updateLabBooking({ address: event.target.value })} className={inputClass} placeholder="Street and building" /></FormField><FormField label="City or town"><input required autoComplete="address-level2" value={labBooking.city} onChange={(event) => updateLabBooking({ city: event.target.value })} className={inputClass} placeholder="City" /></FormField><FormField label="Postal code"><input required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5,8}" value={labBooking.postalCode} onChange={(event) => updateLabBooking({ postalCode: event.target.value })} className={inputClass} placeholder="Postal code" /></FormField></div></ServiceCard><div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Link href={`/lab-tests/${test.id}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" />Back</Link><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Review lab booking <ArrowRight size={16} aria-hidden="true" /></button></div></form>
      <aside className="h-fit rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="text-lg font-bold text-ink">Collection appointment</h2><p className="mt-3 font-semibold text-ink">{test.name}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><CalendarDays size={16} className="text-brand" aria-hidden="true" />{dateLabel(labBooking.date)}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Clock3 size={16} className="text-brand" aria-hidden="true" />{labBooking.time}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><HouseIcon />Home collection</p><p className="mt-5 border-t border-line pt-4 text-xl font-bold text-ink">{formatMoney.format(test.price)}</p></aside></div>
  </ServiceRouteFrame>;
}

function HouseIcon() {
  return <MapPin size={16} className="text-brand" aria-hidden="true" />;
}

export function LabBookingReviewPage() {
  const router = useRouter();
  const { labBooking, confirmLabBooking } = useHealthcareBooking();
  const test = mockLabTests.find((entry) => entry.id === labBooking.testId);
  if (!test || !labBooking.date || !labBooking.time || !labBooking.patientName || !labBooking.email || !labBooking.phone || !labBooking.address || !labBooking.city || !labBooking.postalCode) return <ServiceRouteFrame><MissingSelection title="Lab booking details are incomplete" description="Complete the selected test, collection time, patient contact, and collection address before review." href="/lab-tests" linkText="Start a lab booking" /></ServiceRouteFrame>;

  function confirm() {
    const booking = confirmLabBooking();
    if (booking) router.push("/lab-tests/booking/confirmation");
  }

  return <ServiceRouteFrame><BookingSteps labels={stages} active={1} /><Link href="/lab-tests/booking/details" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ArrowLeft size={16} aria-hidden="true" />Edit patient details</Link><ServicePageHeading eyebrow="Lab test · step 2 of 3" title="Review your collection" description="Confirm the package, collection time, patient, address, and sample price." />
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"><ServiceCard><h2 className="flex items-center gap-2 text-lg font-bold text-ink"><FlaskConical size={19} className="text-brand" aria-hidden="true" />Test package</h2><dl className="mt-3"><ReviewRow label="Test" value={test.name} /><ReviewRow label="Includes" value={test.includedTests.join(", ")} /><ReviewRow label="Preparation" value={test.preparation} /><ReviewRow label="Collection" value="Home collection" /><ReviewRow label="Date and time" value={`${dateLabel(labBooking.date)} · ${labBooking.time}`} /></dl><h2 className="mt-6 border-t border-line pt-5 text-lg font-bold text-ink">Patient and address</h2><dl className="mt-2"><ReviewRow label="Patient" value={labBooking.patientName} /><ReviewRow label="Email" value={labBooking.email} /><ReviewRow label="Phone" value={labBooking.phone} /><ReviewRow label="Collection address" value={`${labBooking.address}, ${labBooking.city} ${labBooking.postalCode}`} /></dl></ServiceCard><aside className="h-fit rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6"><h2 className="text-lg font-bold text-ink">Price summary</h2><div className="mt-5 flex justify-between gap-4 border-t border-line pt-4 text-base font-bold text-ink"><span>Sample package</span><span>{formatMoney.format(test.price)}</span></div><p className="mt-3 text-xs leading-5 text-slate-500">No payment will be collected in this prototype.</p><button onClick={confirm} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Confirm lab booking <Check size={16} aria-hidden="true" /></button></aside></div>
  </ServiceRouteFrame>;
}

export function LabBookingConfirmationPage() {
  const { labConfirmation } = useHealthcareBooking();
  const booking = labConfirmation;
  const test = booking ? mockLabTests.find((entry) => entry.id === booking.testId) : null;
  if (!booking || !test) return <ServiceRouteFrame><MissingSelection title="No lab booking to show" description="Confirmed lab bookings are kept in temporary demo state for this session." href="/lab-tests" linkText="Browse lab tests" /></ServiceRouteFrame>;
  return <ServiceRouteFrame><div className="mx-auto max-w-2xl"><div className="mb-6 grid size-16 place-items-center rounded-3xl bg-mint text-brand"><CheckCircle2 size={32} aria-hidden="true" /></div><p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">Lab booking confirmed</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Your collection request is reserved.</h1><p className="mt-3 text-sm leading-6 text-slate-600">Your sample lab booking is confirmed in the current demo session. No lab service has been contacted.</p><ServiceCard className="mt-7"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Mock booking number</p><p className="mt-2 break-all text-2xl font-bold text-ink">{booking.id}</p><dl className="mt-4"><ReviewRow label="Package" value={test.name} /><ReviewRow label="Patient" value={booking.patientName} /><ReviewRow label="Collection" value={`Home collection · ${dateLabel(booking.date)} · ${booking.time}`} /><ReviewRow label="Address" value={`${booking.address}, ${booking.city} ${booking.postalCode}`} /><ReviewRow label="Booked" value={timeLabel(booking.bookedAt)} /><ReviewRow label="Sample price" value={formatMoney.format(test.price)} /></dl></ServiceCard><StatusNote>This is a mock booking confirmation. No payment, lab, collection, or result system was contacted.</StatusNote><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/lab-tests" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Browse lab tests <ArrowRight size={16} aria-hidden="true" /></Link><Link href="/app" className="inline-flex flex-1 items-center justify-center rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Care workspace</Link></div></div></ServiceRouteFrame>;
}
