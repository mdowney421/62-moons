"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%c62 MOONS %c\nHeavy metal from Chicago.\n\nPoking around the source? Respect.\nSite built by Matt Downey — mattdowneydev.com",
      "color:#dc2626;font-weight:900;font-size:20px;letter-spacing:2px;",
      "color:#9ca3af;font-size:12px;",
    );
  }, []);

  return null;
}
