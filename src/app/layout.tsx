import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

const readex = Readex_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-readex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100"),
  title: { default: "TRC Tech Hiring", template: "%s | TRC Tech Hiring" },
  description: "Permanent technology and product hiring for product and IT companies.",
};

// Runs before first paint so a stored theme choice does not flash.
const themeScript = `(function(){try{var m=localStorage.getItem("trc-theme");if(m==="light"||m==="dark")document.documentElement.setAttribute("data-theme",m);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={readex.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
