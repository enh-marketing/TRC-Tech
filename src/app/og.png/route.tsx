import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "@/content/home";
import { pillars, site } from "@/content/site";

/**
 * The link-preview image for social and messaging apps, served at /og.png.
 * A file-like path is never given a trailing slash, so crawlers get the
 * image directly with no redirect in front of it. Built from content,
 * so it follows the headline and name when TRC confirms them. The image
 * renderer cannot read CSS variables, so the colours below mirror the tokens:
 * #053736 surface-brand, #6ebe48 surface-accent, #ffffff ink-on-brand.
 */
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export async function GET() {
  const fonts = path.join(process.cwd(), "src/assets/og");
  const [semiBold, regular, logo] = await Promise.all([
    fs.readFile(path.join(fonts, "ReadexPro-SemiBold.ttf")),
    fs.readFile(path.join(fonts, "ReadexPro-Regular.ttf")),
    fs.readFile(path.join(process.cwd(), "public/trc-logo-footer.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#053736",
          padding: "64px 80px",
          fontFamily: "Readex Pro",
          color: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={131} height={76} alt="" />

        <div style={{ display: "flex", position: "relative", maxWidth: 940, paddingRight: 56 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {hero.title}
          </div>
          <div
            style={{
              position: "absolute",
              top: -8,
              right: 0,
              width: 40,
              height: 40,
              borderTop: "10px solid #6ebe48",
              borderRight: "10px solid #6ebe48",
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
            fontSize: 24,
            fontWeight: 400,
          }}
        >
          <div style={{ display: "flex", flexShrink: 0, whiteSpace: "nowrap", color: "rgba(255,255,255,0.78)" }}>
            A {site.parent.name} company
          </div>
          <div style={{ display: "flex", gap: 24, color: "#6ebe48", fontWeight: 600 }}>
            {pillars.map((p) => (
              <span key={p.slug}>{p.short}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Readex Pro", data: semiBold, weight: 600, style: "normal" },
        { name: "Readex Pro", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
