"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HORIZONTAL_LINES = 5;
const VERTICAL_LINES = 6;

export function RuleGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        {Array.from({ length: HORIZONTAL_LINES }).map((_, i) => (
          <div
            key={`h-${i}`}
            data-rule="horizontal"
            className="absolute left-0 right-0 h-px bg-rose-soft/40"
            style={{ top: `${((i + 1) / (HORIZONTAL_LINES + 1)) * 100}%` }}
          />
        ))}
        {Array.from({ length: VERTICAL_LINES }).map((_, i) => (
          <div
            key={`v-${i}`}
            data-rule="vertical"
            className="absolute top-0 bottom-0 w-px bg-rose-soft/40"
            style={{ left: `${((i + 1) / (VERTICAL_LINES + 1)) * 100}%` }}
          />
        ))}
      </motion.div>
    </div>
  );
}
