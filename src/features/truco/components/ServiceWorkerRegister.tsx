"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/truco/sw.js", { scope: "/truco/" })
      .catch(() => {
        // Offline support is a nice-to-have; ignore registration failures.
      });
  }, []);

  return null;
}
