import { permanentRedirect } from "next/navigation";

/**
 * Concept 3 moved to /home-option-2/ on 26 October 2026 (see the layout there). The
 * redirect in next.config.ts answers this address first; this stub only backs it up.
 * Deleting the whole src/app/(option-3) folder is safe.
 */
export default function MovedConceptThree() {
  permanentRedirect("/home-option-2/");
}
