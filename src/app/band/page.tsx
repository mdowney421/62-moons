import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "The Band",
  description:
    "Meet Nate, Tommy, and Pilot Pete — the three musicians behind 62 Moons' heavy metal sound out of Chicago.",
  alternates: {
    canonical: "/band",
  },
};

export default function BandPage() {
  const members = [
    {
      name: "Nate",
      role: "Vocals & Bass",
      description:
        "The voice and backbone of 62 Moons. Nate delivers raw, powerful vocals that cut through the wall of sound while holding down the low end with thunderous bass lines.",
      color: "red",
    },
    {
      name: "Tommy",
      role: "Guitar",
      description:
        "Master of crushing riffs and face-melting solos. Tommy's guitar work defines the signature sound of 62 Moons with heavy, intricate, and memorable compositions.",
      color: "yellow",
    },
    {
      name: "Pilot Pete",
      role: "Drums",
      description:
        "The pulse of the band. Pete's precise yet punishing drumming provides the driving force behind every track, keeping everything locked and heavy.",
      color: "red",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />
      <Marquee />

      {/* Page Header */}
      <section className="py-16 px-4 border-b border-red-900 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-6xl sm:text-7xl text-red-600 mb-4 tracking-[0.1em]">
            THE BAND
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            No filler, no gimmicks — three musicians who show up and bring
            the weight. Each one plays like the song depends on it, because
            in 62 Moons, it does.
          </p>
        </div>
      </section>

      {/* Band Photo */}
      <section className="py-8 px-4 bg-black relative overflow-hidden">
        <Reveal className="max-w-7xl mx-auto relative block">
          <Image
            src="/bandpicture2.png"
            alt="62 Moons Band"
            width={1200}
            height={600}
            className="w-full rounded-lg"
            priority
          />
          <div className="absolute inset-0 opacity-20 rounded-lg pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-700 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-600 rounded-full blur-3xl"></div>
          </div>
        </Reveal>
      </section>

      {/* Band Members */}
      <section className="flex-1 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl text-yellow-500 mb-8 uppercase tracking-[0.25em] text-center">
            The Lineup
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((member, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="group relative h-full">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${
                      member.color === "red"
                        ? "from-red-600 to-red-800"
                        : "from-yellow-500 to-yellow-600"
                    } opacity-25 group-hover:opacity-75 blur transition duration-300`}
                  ></div>

                  <div className="relative h-full bg-black p-8 border border-gray-800 hover:border-red-600 transition">
                    <div
                      className={`w-20 h-20 rounded-full ${
                        member.color === "red" ? "bg-red-600" : "bg-yellow-500"
                      } mb-6 flex items-center justify-center`}
                    >
                      <span className="text-3xl font-black text-black">
                        {member.name[0]}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl text-white mb-2 tracking-wide">
                      {member.name}
                    </h3>

                    <p
                      className={`font-bold uppercase tracking-widest mb-4 ${
                        member.color === "red"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {member.role}
                    </p>

                    <p className="text-gray-400 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-zinc-900 py-16 px-4 border-t border-red-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-red-600 mb-6 tracking-wide">
            Ready to Get Crushed?
          </h2>
          <p className="text-gray-400 mb-8">
            Book a show, start a collab, or just tell us we&apos;re loud.
            We&apos;re in Chicago and we&apos;re listening.
          </p>
          <Magnetic>
            <Link
              href="/contact"
              style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
              className="block px-9 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest transition-all hover:scale-105 text-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.55)]"
            >
              Contact Us
            </Link>
          </Magnetic>
        </div>
      </section>

      <Footer />
    </div>
  );
}
