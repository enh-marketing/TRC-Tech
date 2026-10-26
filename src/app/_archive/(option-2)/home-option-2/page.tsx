import type { Metadata } from "next";
import { ConceptClients } from "@/components/option-2/ConceptClients";
import { ConceptClosing } from "@/components/option-2/ConceptClosing";
import { ConceptFigures } from "@/components/option-2/ConceptFigures";
import { ConceptHero } from "@/components/option-2/ConceptHero";
import { ConceptJournal } from "@/components/option-2/ConceptJournal";
import { ConceptPractices } from "@/components/option-2/ConceptPractices";
import { ConceptProcess } from "@/components/option-2/ConceptProcess";
import { ConceptQuestions } from "@/components/option-2/ConceptQuestions";
import { ConceptSectors } from "@/components/option-2/ConceptSectors";
import { ConceptVoices } from "@/components/option-2/ConceptVoices";
import { ConceptWhy } from "@/components/option-2/ConceptWhy";
import { hero } from "@/content/home";

export const metadata: Metadata = {
  title: "Homepage concept 2",
  description: hero.body,
  // A design concept for review: the homepage at / stays the one to index.
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
};

/**
 * ARCHIVED on 26 October 2026 at the agency's request (see layout.tsx beside this
 * file): concept 2's page exactly as it was. Not routed while it sits under _archive.
 *
 * Homepage concept 2, "Editorial Index": the same content as / in a new
 * layout. Section order follows docs/06-homepage.md, with the logos moved up
 * beside the figures so the proof reads as one spread.
 */
export default function HomeOptionTwo() {
  return (
    <>
      <ConceptHero />
      <ConceptFigures />
      <ConceptClients />
      <ConceptPractices />
      <ConceptSectors />
      <ConceptProcess />
      <ConceptWhy />
      <ConceptVoices />
      <ConceptJournal />
      <ConceptQuestions />
      <ConceptClosing />
    </>
  );
}
