import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { WhyHireMe } from "@/components/WhyHireMe";

export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <WhyHireMe />
      {/* demais secoes serao adicionadas nas proximas fatias */}
    </main>
  );
}
