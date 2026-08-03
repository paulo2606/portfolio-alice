import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";

export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      {/* demais secoes serao adicionadas nas proximas fatias */}
    </main>
  );
}
