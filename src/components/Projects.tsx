"use client";

import { useRef, useState } from "react";
import { PROJECTS, type Project, type ProjectVideo } from "@/lib/projects";
import { ProjectSidebar } from "./ProjectSidebar";
import { Reveal } from "./Reveal";
import { VideoModal } from "./VideoModal";

interface MosaicTile {
  project: Project;
  coverIndex: 0 | 1;
  area: string;
  mobileArea?: string;
}

const [festa15, casamento, aniversarios, eventos] = PROJECTS;

const MOSAIC: MosaicTile[] = [
  {
    project: festa15,
    coverIndex: 0,
    area: "col-start-1 row-start-1 row-span-2",
    mobileArea: "col-start-1 row-start-1 row-span-3",
  },
  {
    project: casamento,
    coverIndex: 0,
    area: "col-start-2 col-span-2 row-start-1",
    mobileArea: "col-start-2 row-start-1",
  },
  {
    project: aniversarios,
    coverIndex: 0,
    area: "col-start-4 col-span-2 row-start-1",
    mobileArea: "col-start-2 row-start-2",
  },
  { project: casamento, coverIndex: 1, area: "col-start-2 col-span-2 row-start-2" },
  {
    project: eventos,
    coverIndex: 0,
    area: "col-start-4 row-start-2 row-span-2",
    mobileArea: "col-start-2 row-start-3 row-span-2",
  },
  { project: aniversarios, coverIndex: 1, area: "col-start-5 row-start-2 row-span-2" },
  {
    project: festa15,
    coverIndex: 1,
    area: "col-start-1 col-span-2 row-start-3",
    mobileArea: "col-start-1 row-start-4",
  },
  { project: eventos, coverIndex: 1, area: "col-start-3 row-start-3" },
];

const MOBILE_MOSAIC = MOSAIC.filter((tile) => tile.mobileArea);

export function Projects() {
  const [openProject, setOpenProject] = useState<{ project: Project; initialIndex: number } | null>(
    null
  );
  const [openEventVideo, setOpenEventVideo] = useState<{ title: string; video: ProjectVideo } | null>(
    null
  );
  const triggerRef = useRef<HTMLElement | null>(null);

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>, tile: MosaicTile) {
    triggerRef.current = event.currentTarget;
    if (tile.project.hasGallery) {
      setOpenProject({ project: tile.project, initialIndex: tile.coverIndex });
    } else {
      setOpenEventVideo({
        title: tile.project.name,
        video: tile.project.videos[tile.coverIndex],
      });
    }
  }

  function handleCloseProject() {
    setOpenProject(null);
    triggerRef.current?.focus();
  }

  function handleCloseEventVideo() {
    setOpenEventVideo(null);
    triggerRef.current?.focus();
  }

  function playCover(video: HTMLVideoElement | null) {
    if (!video) return;
    video.muted = true;
    try {
      video.play()?.catch(() => {});
    } catch {
      // ambientes sem suporte a play() (ex: jsdom em testes)
    }
  }

  function renderTile(tile: MosaicTile, area: string) {
    const cover = tile.project.videos[tile.coverIndex];
    return (
      <button
        key={`${tile.project.slug}-${tile.coverIndex}`}
        type="button"
        onClick={(event) => handleOpen(event, tile)}
        aria-label={`Ver projeto: ${tile.project.name}`}
        className={`group relative cursor-pointer overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose ${area}`}
      >
        <video
          ref={playCover}
          src={cover.src}
          poster={cover.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/50 p-3 min-[1080px]:hidden">
          <span className="px-2 text-center font-display text-base italic text-paper">
            {tile.project.name}
          </span>
        </div>
        <div className="absolute inset-0 hidden items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 ease-out group-hover:bg-ink/60 group-hover:opacity-100 min-[1080px]:flex">
          <span className="px-4 text-center font-display text-2xl italic text-paper">
            {tile.project.name}
          </span>
        </div>
      </button>
    );
  }

  return (
    <section id="o-que-eu-faco" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-20">
        <Reveal>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-rose-soft">
            <span className="block h-1.5 w-1.5 rounded-full bg-rose" />
            Portfólio
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-4xl italic text-rose sm:text-5xl">
            O que faço
          </h2>
        </Reveal>
      </div>

      <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 px-4 min-[1080px]:px-0">
        <div
          data-testid="mobile-mosaic"
          className="grid aspect-[4/5] grid-cols-2 grid-rows-4 gap-1.5 min-[1080px]:hidden"
        >
          {MOBILE_MOSAIC.map((tile) => renderTile(tile, tile.mobileArea!))}
        </div>
        <div
          data-testid="desktop-mosaic"
          className="hidden aspect-[1171/623] grid-cols-5 grid-rows-3 gap-2 min-[1080px]:grid"
        >
          {MOSAIC.map((tile) => renderTile(tile, tile.area))}
        </div>
      </div>

      {openProject && (
        <ProjectSidebar
          title={openProject.project.name}
          category={openProject.project.category}
          summary={openProject.project.summary}
          deliverables={openProject.project.deliverables}
          featured={openProject.project.videos[openProject.initialIndex]}
          gallery={openProject.project.videos}
          onClose={handleCloseProject}
        />
      )}

      {openEventVideo && (
        <VideoModal
          title={openEventVideo.title}
          video={openEventVideo.video.src}
          onClose={handleCloseEventVideo}
        />
      )}
    </section>
  );
}
