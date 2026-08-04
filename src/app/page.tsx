import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { WhyHireMe } from "@/components/WhyHireMe";
import { Contact } from "@/components/Contact";
import { RuleGrid } from "@/components/RuleGrid";
import { AboutMe } from "@/components/AboutMe";

export default function Page() {
  return (
    <main>
      <Hero />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-12 lg:px-20">
        <RuleGrid />
        <AboutMe />
        <Services />
        <Projects />
        <WhyHireMe />
        <Contact />
      </div>
    </main>
  );
}
