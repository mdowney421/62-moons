"use client";

import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/social-links";
import Magnetic from "./Magnetic";

export default function CallToActionSection() {
  const platforms = SOCIAL_LINKS;

  return (
    <section className="bg-black border-b border-red-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Magnetic>
            <Link
              href="/band"
              style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
              className="block px-9 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest transition-all hover:scale-105 text-lg text-center shadow-[0_0_0_rgba(220,38,38,0)] hover:shadow-[0_0_30px_rgba(220,38,38,0.55)]"
            >
              Meet the Band
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
              className="block px-9 py-4 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-black uppercase tracking-widest transition-all hover:scale-105 text-lg text-center hover:shadow-[0_0_30px_rgba(234,179,8,0.45)]"
            >
              Get in Touch
            </Link>
          </Magnetic>
        </div>

        <div className="text-center mb-8 flex items-center gap-4 max-w-md mx-auto">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-red-900"></span>
          <h2 className="font-display text-2xl tracking-[0.3em] text-gray-300 whitespace-nowrap">
            Follow The Noise
          </h2>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-red-900"></span>
        </div>

        <div className="flex justify-center gap-8">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110 group"
              aria-label={`Follow us on ${platform.name}`}
            >
              <Image
                src={platform.icon}
                alt={platform.name}
                width={32}
                height={32}
                className="w-8 h-8 brightness-0 invert transition-all group-hover:drop-shadow-lg"
                style={{
                  filter: "brightness(0) invert(1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = `drop-shadow(0 0 16px ${platform.hoverColor}) drop-shadow(0 0 8px ${platform.hoverColor})`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "brightness(0) invert(1)";
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
