import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <Container className="pt-40">
      <h1 className="font-serif text-mega">{profile.fullName}</h1>
    </Container>
  );
}
