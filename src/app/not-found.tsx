import { site } from "@/content/site";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Monogram } from "@/components/ui/Monogram";
import { Rich } from "@/components/ui/Rich";

export default function NotFound() {
  const { notFound } = site;
  return (
    <main className="relative isolate flex min-h-svh items-center overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,#f2d2db,transparent)]"
      />
      <Container className="py-24">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-on-accent">
          <Monogram className="size-8" plain />
        </span>
        <p aria-hidden className="mt-12 font-display text-[clamp(5rem,3rem+10vw,12rem)] leading-none font-semibold tracking-[-0.05em] text-accent/15">
          {notFound.code}
        </p>
        <h1 className="mt-2 max-w-[16ch] text-display font-semibold text-fg">
          <Rich text={notFound.title} />
        </h1>
        <p className="mt-6 max-w-xl text-lead text-muted">{notFound.text}</p>
        <Button href="/" className="mt-10" icon={<Arrow direction="left" className="size-3.5" />}>
          {notFound.cta}
        </Button>
      </Container>
    </main>
  );
}
