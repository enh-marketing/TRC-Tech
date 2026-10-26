import fs from "node:fs";
import path from "node:path";

/** Project documents live as markdown in /docs at the repo root, ordered by filename. */
const DOCS_DIR = path.join(process.cwd(), "docs");

export type Doc = {
  slug: string;
  file: string;
  title: string;
  summary: string;
  body: string;
};

function parse(file: string): Doc {
  const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf8");
  const lines = raw.split("\n");
  const titleLine = lines.find((l) => l.startsWith("# ")) ?? file;
  const title = titleLine.replace(/^#\s+/, "").trim();
  const firstParagraph =
    lines.find((l) => l.trim() && !l.startsWith("#") && !l.startsWith("|") && !l.startsWith("-"))?.trim() ?? "";
  // Plain text for cards and meta descriptions: drop inline code, bold and link syntax.
  const summary = firstParagraph
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // The page renders the title itself, so drop the first H1 from the body.
  const body = raw.replace(titleLine, "").trimStart();
  const slug = file.replace(/^\d+-/, "").replace(/\.md$/, "");
  return { slug, file, title, summary, body };
}

export function getDocs(): Doc[] {
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map(parse);
}

export function getDoc(slug: string): Doc | undefined {
  return getDocs().find((d) => d.slug === slug);
}
