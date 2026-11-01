import Link from "next/link";
import { profile } from "@/content/profile";
import { cvHref, isTodo, site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { Container } from "@/components/ui/Container";
import { Monogram } from "@/components/ui/Monogram";

export function Footer() {
  const socials = [site.github, site.linkedin].filter((link) => !isTodo(link.href));

  return (
    <footer data-print-hidden className="pt-24 pb-8 lg:pt-32">
      <Container>
        <div className="grid-editorial gap-y-10 border-t border-line pt-10">
          <div className="col-span-12 flex items-start gap-4 md:col-span-5">
            <Monogram className="size-12 text-fg" />
            <div>
              <p className="font-serif text-h3 text-fg">{profile.fullName}</p>
              <p className="mt-1 text-sm text-muted">{profile.role}</p>
            </div>
          </div>

          <nav aria-label={site.ui.footerNav} className="col-span-6 md:col-span-3">
            <ul className="space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-4">
            <p className="eyebrow mb-4 text-muted">{site.ui.elsewhere}</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-fg hover:text-indigo-ink">
                  {site.email}
                </a>
              </li>
              {socials.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fg hover:text-indigo-ink"
                  >
                    {link.label}
                    <Arrow direction="up-right" className="size-3" />
                    <span className="sr-only">{site.ui.opensInNewTab}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href={cvHref} className="text-fg hover:text-indigo-ink">
                  {site.ui.downloadCv}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="eyebrow mt-16 flex flex-col gap-4 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {profile.fullName} — {site.footerNote}
          </p>
          <a href="#haut" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            {site.ui.backToTop}
            <Arrow direction="up" className="size-3" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
