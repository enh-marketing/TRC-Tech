import type { Metadata } from "next";
import { O3About } from "@/components/option-3/O3About";
import { ClientLogos } from "@/components/sections/home/PhaseTwo";
import { O3Faq } from "@/components/option-3/O3Faq";
import { O3Journal } from "@/components/option-3/O3Journal";
import { O3Practices } from "@/components/option-3/O3Practices";
import { O3Process } from "@/components/option-3/O3Process";
import { O3Ribbon } from "@/components/option-3/O3Ribbon";
import { O3Sectors } from "@/components/option-3/O3Sectors";
import { O3Start } from "@/components/option-3/O3Start";
import { O3Hero } from "@/components/option-3/O3Hero";
import { O3Voices } from "@/components/option-3/O3Voices";
import { O3Why } from "@/components/option-3/O3Why";
import { hero } from "@/content/home";

export const metadata: Metadata = {
  // Shown to the client as concept 2 (see layout.tsx); internally this is concept 3.
  title: "Homepage concept 2",
  description: hero.body,
  // A design concept for review: the homepage at / stays the one to index.
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
};

/** Homepage concept 3, served at /home-option-2/ (see layout.tsx). Section order as agreed for concept 1. */
export default function HomeOptionThree() {
  return (
    <>
      <O3Hero />
      <O3About />
      {/* Concept 1's logo section, label and all, at the agency's request. */}
      <ClientLogos />
      <O3Ribbon />
      <O3Practices />
      <O3Sectors />
      <O3Process />
      <O3Why />
      <O3Voices />
      <O3Journal />
      <O3Faq />
      <O3Start />
    </>
  );
}
