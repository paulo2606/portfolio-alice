"use client";

import { useEffect, useState } from "react";
import { SECTION_LINKS } from "@/lib/sections";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > window.innerHeight - 96);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        isScrolled ? "bg-paper/90 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-12 lg:px-20">
        <a
          href="#topo"
          className={`font-display text-lg italic transition-colors ${
            isScrolled ? "text-rose" : "text-paper"
          }`}
        >
          Alice Santos
        </a>

        <nav aria-label="Seções da página" className="hidden items-center gap-8 sm:flex">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                isScrolled
                  ? "text-ink/70 hover:text-rose focus-visible:outline-rose"
                  : "text-paper/90 hover:text-rose-soft focus-visible:outline-rose-soft"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
