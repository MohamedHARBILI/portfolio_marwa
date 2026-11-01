import { site } from "@/content/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div id="haut" tabIndex={-1} />
      <a
        href="#contenu"
        className="fixed top-3 left-3 z-[110] -translate-y-[200%] rounded-[3px] bg-indigo px-4 py-3 text-sm text-on-accent transition-transform focus-visible:translate-y-0"
      >
        {site.ui.skipLink}
      </a>
      <SmoothScroll />
      <Cursor />
      <Header />
      <main id="contenu" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
