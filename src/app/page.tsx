import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { WhyHireMe } from "@/components/WhyHireMe";
import { Contact } from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <WhyHireMe />
      <Contact />
    </main>
  );
}
