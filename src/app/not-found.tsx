import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Monogram } from "@/components/ui/Monogram";
import { Rich } from "@/components/ui/Rich";

export default function NotFound() {
  const { notFound } = site;
  return (
    <main className="flex min-h-svh items-center">
      <Container className="py-24">
        <Monogram className="size-12 text-fg" />
        <p className="eyebrow mt-12 border-t border-line pt-5 text-muted">{notFound.code}</p>
        <h1 className="mt-8 max-w-[14ch] font-serif text-display text-fg">
          <Rich text={notFound.title} />
        </h1>
        <p className="mt-6 max-w-xl text-lead text-muted">{notFound.text}</p>
        <Button href="/" className="mt-10">
          {notFound.cta}
        </Button>
      </Container>
    </main>
  );
}
