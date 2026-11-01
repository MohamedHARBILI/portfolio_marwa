import Link from "next/link";
import { profile } from "@/content/profile";
import { cvHref, isTodo, site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { Container } from "@/components/ui/Container";
import { Monogram } from "@/components/ui/Monogram";

export function Footer() {
  const socials = [site.github, site.linkedin].filter((link) => !isTodo(link.href));

  return (
    <footer data-print-hidden className="pt-10 pb-6 lg:pb-8">
      <Container>
        <div className="card grid gap-10 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr_1fr] lg:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
              <Monogram className="size-7" plain />
            </span>
            <div>
              <p className="font-display text-h3 font-semibold text-fg">{profile.fullName}</p>
              <p className="mt-1 text-sm text-muted">
                {profile.role} — {site.footerNote}
              </p>
            </div>
          </div>

          <nav aria-label={site.ui.footerNav}>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-medium text-muted transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4 text-muted">{site.ui.elsewhere}</p>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-fg hover:text-accent">
                  {site.email}
                </a>
              </li>
              {socials.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fg hover:text-accent"
                  >
                    {link.label}
                    <Arrow direction="up-right" className="size-3" />
                    <span className="sr-only">{site.ui.opensInNewTab}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href={cvHref} className="text-fg hover:text-accent">
                  {site.ui.downloadCv}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 px-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {profile.fullName}
          </p>
          <a href="#haut" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-accent">
            {site.ui.backToTop}
            <Arrow direction="up" className="size-3" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
