import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import "@/styles/globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
  themeColor: "#f7f3ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className={cn(display.variable, sans.variable)}>
      <body>{children}</body>
    </html>
  );
}
