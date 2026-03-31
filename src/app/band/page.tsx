"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

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
      name: "Martin",
      role: "Drums",
      description:
        "The pulse of the band. Martin's precise yet punishing drumming provides the driving force behind every track, keeping everything locked and heavy.",
      color: "red",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />

      {/* Page Header */}
      <section className="py-16 px-4 border-b border-red-900 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black text-red-600 mb-4 tracking-tight">
            THE BAND
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Meet the three musicians bringing heavy metal chaos to Chicago. Each
            member brings their own crushing style and technical prowess to
            create the devastating sound of 62 Moons.
          </p>
        </div>
      </section>

      {/* Band Members */}
      <section className="flex-1 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((member, idx) => (
              <div key={idx} className="group relative">
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${
                    member.color === "red"
                      ? "from-red-600 to-red-800"
                      : "from-yellow-500 to-yellow-600"
                  } opacity-25 group-hover:opacity-75 blur transition duration-300`}
                ></div>

                <div className="relative bg-black p-8 border border-gray-800 hover:border-red-600 transition">
                  <div
                    className={`w-20 h-20 rounded-full ${
                      member.color === "red" ? "bg-red-600" : "bg-yellow-500"
                    } mb-6 flex items-center justify-center`}
                  >
                    <span className="text-3xl font-black text-black">
                      {member.name[0]}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-2">
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
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-zinc-900 py-16 px-4 border-t border-red-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-red-600 mb-6">
            Ready to Experience 62 Moons?
          </h2>
          <p className="text-gray-400 mb-8">
            Get in touch for shows, collaborations, and more information.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest transition transform hover:scale-105 text-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
