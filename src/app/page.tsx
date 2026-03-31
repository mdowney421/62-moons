"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />
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

      <Footer />
    </div>
  );
}
