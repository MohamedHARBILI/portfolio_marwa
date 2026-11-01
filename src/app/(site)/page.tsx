import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Languages } from "@/components/sections/Languages";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { IntroHook } from "@/components/motion/IntroHook";

export default function HomePage() {
  return (
    <>
      <IntroHook />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Languages />
      <Contact />
    </>
  );
}
