import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { INTRO_STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/storage";
import { cn } from "@/lib/cn";
import "@/styles/globals.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${profile.fullName}` },
  description: site.description,
  applicationName: profile.fullName,
  authors: [{ name: profile.fullName, url: site.url }],
  creator: profile.fullName,
  keywords: [...site.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: profile.fullName,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b12",
  colorScheme: "dark light",
};

// Runs before first paint: restores the theme and decides whether the intro plays.
const bootScript = `(function(){var d=document.documentElement;try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light")d.dataset.theme="light";}catch(e){}try{if(sessionStorage.getItem("${INTRO_STORAGE_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.intro="done";}catch(e){d.dataset.intro="done";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.lang}
      className={cn(serif.variable, sans.variable, mono.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{"[data-intro-overlay]{display:none!important}"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
