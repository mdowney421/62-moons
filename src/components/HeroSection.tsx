"use client";

import Image from "next/image";
import { useRef } from "react";
import Starfield from "./Starfield";

const HEADLINE = "HEAVY METAL, HAND-FORGED IN CHICAGO";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${px * -30}px, ${py * -30}px)`;
    }
    if (imageRef.current) {
      imageRef.current.style.transform = `translate(${px * 12}px, ${py * 12}px) scale(1.05)`;
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="flex-1 flex items-center justify-center pt-24 pb-10 px-4 relative overflow-hidden"
    >
      <div ref={glowRef} className="absolute inset-0 opacity-25 transition-transform duration-300 ease-out">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-700 rounded-full blur-3xl animate-pulse-glow"></div>
        <div
          className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-600 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div
        ref={imageRef}
        className="absolute inset-0 opacity-25 transition-transform duration-300 ease-out"
      >
        <Image
          src="/heroimage.png"
          alt="62 Moons Band Image"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <Starfield />

      {/* Vignette to pull focus to center and deepen the black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      ></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-up">
        <div className="inline-block mb-5 px-4 py-1 border border-red-700/60 bg-red-950/30 text-red-500 text-xs font-bold tracking-[0.3em] uppercase animate-flicker">
          Live from Chicago
        </div>

        <Image
          src="/62moonslogo.png"
          alt="62 Moons Band Logo"
          width={500}
          height={500}
          priority
          className="w-full max-w-sm md:max-w-lg mx-auto mb-6 drop-shadow-[0_0_45px_rgba(220,38,38,0.35)]"
        />

        <h1
          data-text={HEADLINE}
          className="glitch font-display text-3xl sm:text-5xl text-gray-100 mb-5 tracking-[0.15em] uppercase"
        >
          {HEADLINE}
        </h1>

        <p className="text-lg text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          Three musicians. Zero compromise. 62 Moons channels the weight of
          steel and the fury of the night sky into riffs that hit like a
          wrecking ball. This is Chicago heavy metal, built to be felt, not
          just heard.
        </p>
      </div>
    </section>
  );
}
