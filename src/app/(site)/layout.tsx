import { site } from "@/content/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div id="haut" tabIndex={-1} />
      <a
        href="#contenu"
        className="fixed top-3 left-3 z-[110] -translate-y-[200%] rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-transform focus-visible:translate-y-0"
      >
        {site.ui.skipLink}
      </a>
      <SmoothScroll />
      <Header />
      <main id="contenu" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
