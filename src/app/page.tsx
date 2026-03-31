"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-red-900 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/62moonslogo.png"
                alt="62 Moons Band Logo"
                width={120}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-500 transition"
              >
                Home
              </Link>
              <Link
                href="/band"
                className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-red-500 transition"
              >
                The Band
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-red-500 transition"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-red-500 hover:text-red-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-red-900">
              <Link
                href="/"
                className="block py-2 text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/band"
                className="block py-2 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-red-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                The Band
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-red-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-700 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Image
            src="/62moonslogo.png"
            alt="62 Moons Band Logo"
            width={500}
            height={500}
            priority
            className="w-full max-w-sm md:max-w-lg mx-auto mb-6"
          />

          <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-bold tracking-widest uppercase">
            Heavy Metal From Chicago
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Raw power. Crushing riffs. Thunderous drums. Three musicians. One
            mission. Experience the sonic devastation of 62 Moons.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/band"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest transition transform hover:scale-105 text-lg"
            >
              Meet the Band
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-black uppercase tracking-widest transition text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-zinc-900 py-16 px-4 border-y border-red-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-black text-red-600 mb-2">3</div>
            <div className="text-gray-300 font-bold uppercase tracking-widest">
              Crushing Members
            </div>
          </div>
          <div className="text-center border-l border-r border-red-900 px-4">
            <div className="text-4xl font-black text-yellow-500 mb-2">🌙</div>
            <div className="text-gray-300 font-bold uppercase tracking-widest">
              Pure Heavy Metal
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-red-600 mb-2">📍</div>
            <div className="text-gray-300 font-bold uppercase tracking-widest">
              Chicago Based
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900 py-8 px-4 text-center text-gray-500 text-sm">
        <p className="mb-2 uppercase tracking-widest font-bold">
          62 Moons © 2026 | Chicago, IL
        </p>
        <p>Nate • Tommy • Martin</p>
      </footer>
    </div>
  );
}
