import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { RuleGrid } from "@/components/RuleGrid";
import { AboutMe } from "@/components/AboutMe";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-12 lg:px-20">
        <RuleGrid />
        <AboutMe />
        <Projects />
        <Services />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
