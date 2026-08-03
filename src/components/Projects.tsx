"use client";

import { useRef, useState } from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { ProjectModal } from "./ProjectModal";
import { projects } from "@/lib/projects";

export function Projects() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  function handleSelect(slug: string) {
    triggerRef.current = document.activeElement as HTMLElement;
    setSelectedSlug(slug);
  }

  function handleClose() {
    setSelectedSlug(null);
    triggerRef.current?.focus();
  }

  const selectedProject = projects.find((project) => project.slug === selectedSlug) ?? null;

  return (
    <section id="projetos" className="relative px-6 py-24 sm:px-12">
      <h2 className="font-display text-4xl italic text-rose sm:text-5xl">Projetos</h2>
      <div className="mt-10">
        <ProjectsCarousel onSelect={handleSelect} />
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={handleClose} />}
    </section>
  );
}
