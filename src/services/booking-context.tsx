"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ConsultationType } from "@/data/healthcare-services";

export type ConsultationDraft = {
  doctorId: string;
  date: string;
  time: string;
  consultationType: ConsultationType;
  patientName: string;
  email: string;
  phone: string;
};

export type LabBookingDraft = {
  testId: string;
  date: string;
  time: string;
  collectionMethod: "home" | "center";
  patientName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

export type ConsultationBooking = ConsultationDraft & { id: string; bookedAt: string };
export type LabBooking = LabBookingDraft & { id: string; bookedAt: string };

type HealthcareBookingValue = {
  consultation: ConsultationDraft;
  labBooking: LabBookingDraft;
  consultationConfirmation: ConsultationBooking | null;
  labConfirmation: LabBooking | null;
  selectDoctor: (doctorId: string) => void;
  updateConsultation: (updates: Partial<ConsultationDraft>) => void;
  selectLabTest: (testId: string) => void;
  updateLabBooking: (updates: Partial<LabBookingDraft>) => void;
  confirmConsultation: () => ConsultationBooking | null;
  confirmLabBooking: () => LabBooking | null;
};

const blankConsultation: ConsultationDraft = {
  doctorId: "", date: "", time: "", consultationType: "video", patientName: "", email: "", phone: ""
};

const blankLabBooking: LabBookingDraft = {
  testId: "", date: "", time: "", collectionMethod: "home", patientName: "", email: "", phone: "", address: "", city: "", postalCode: ""
};

const HealthcareBookingContext = createContext<HealthcareBookingValue | null>(null);

function reference(prefix: "CONS" | "LAB") {
  return `${prefix}-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function HealthcareBookingProvider({ children }: { children: ReactNode }) {
  const [consultation, setConsultation] = useState(blankConsultation);
  const [labBooking, setLabBooking] = useState(blankLabBooking);
  const [consultationConfirmation, setConsultationConfirmation] = useState<ConsultationBooking | null>(null);
  const [labConfirmation, setLabConfirmation] = useState<LabBooking | null>(null);

  const selectDoctor = useCallback((doctorId: string) => {
    setConsultation((current) => current.doctorId === doctorId ? current : { ...blankConsultation, doctorId });
    setConsultationConfirmation(null);
  }, []);
  const selectLabTest = useCallback((testId: string) => {
    setLabBooking((current) => current.testId === testId ? current : { ...blankLabBooking, testId });
    setLabConfirmation(null);
  }, []);
  const updateConsultation = useCallback((updates: Partial<ConsultationDraft>) => setConsultation((current) => ({ ...current, ...updates })), []);
  const updateLabBooking = useCallback((updates: Partial<LabBookingDraft>) => setLabBooking((current) => ({ ...current, ...updates })), []);

  const confirmConsultation = useCallback(() => {
    if (!consultation.doctorId || !consultation.date || !consultation.time || !consultation.patientName || !consultation.email || !consultation.phone) return null;
    const booking = { ...consultation, id: reference("CONS"), bookedAt: new Date().toISOString() };
    setConsultationConfirmation(booking);
    return booking;
  }, [consultation]);

  const confirmLabBooking = useCallback(() => {
    if (!labBooking.testId || !labBooking.date || !labBooking.time || !labBooking.patientName || !labBooking.email || !labBooking.phone || !labBooking.address || !labBooking.city || !labBooking.postalCode) return null;
    const booking = { ...labBooking, id: reference("LAB"), bookedAt: new Date().toISOString() };
    setLabConfirmation(booking);
    return booking;
  }, [labBooking]);

  const value = useMemo(() => ({
    consultation, labBooking, consultationConfirmation, labConfirmation,
    selectDoctor, updateConsultation, selectLabTest, updateLabBooking, confirmConsultation, confirmLabBooking
  }), [consultation, labBooking, consultationConfirmation, labConfirmation, selectDoctor, updateConsultation, selectLabTest, updateLabBooking, confirmConsultation, confirmLabBooking]);

  return <HealthcareBookingContext.Provider value={value}>{children}</HealthcareBookingContext.Provider>;
}

export function useHealthcareBooking() {
  const context = useContext(HealthcareBookingContext);
  if (!context) throw new Error("useHealthcareBooking must be used within HealthcareBookingProvider");
  return context;
}
