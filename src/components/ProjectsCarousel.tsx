"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { projects } from "@/lib/projects";

interface ProjectsCarouselProps {
  onSelect: (slug: string) => void;
}

export function ProjectsCarousel({ onSelect }: ProjectsCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <ul className="flex gap-6">
        {projects.map((project) => (
          <li key={project.slug} className="min-w-[280px] flex-shrink-0 sm:min-w-[340px]">
            <button
              type="button"
              onClick={() => onSelect(project.slug)}
              aria-label={project.title}
              className="group block w-full text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-paper">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(max-width: 640px) 280px, 340px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-xl italic text-ink">
                {project.title}
              </h3>
              <p className="mt-1 font-body text-sm text-ink/70">{project.teaser}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
