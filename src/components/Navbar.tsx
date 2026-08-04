"use client";

import { useEffect, useState } from "react";
import { SECTION_LINKS } from "@/lib/sections";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > window.innerHeight - 96);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [isScrolled]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        isScrolled || isMenuOpen ? "bg-paper/90 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-12 lg:px-20">
        <a
          href="#topo"
          className={`font-display text-lg italic transition-colors ${
            isScrolled || isMenuOpen ? "text-rose" : "text-paper"
          }`}
        >
          Alice Santos
        </a>

        <nav aria-label="Seções da página" className="hidden items-center gap-8 lg:flex">
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

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          className={`relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose lg:hidden ${
            isScrolled || isMenuOpen ? "text-ink" : "text-paper"
          }`}
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <nav
        aria-label="Seções da página (mobile)"
        className={`overflow-hidden bg-paper transition-[max-height] duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 pb-6 pt-2 sm:px-12">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-2 py-3 font-body text-sm text-ink/80 transition-colors hover:bg-blush hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
