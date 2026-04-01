import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-600 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-30">
        <Image
          src="/bandpicture1.png"
          alt="62 Moons Band"
          fill
          className="object-cover"
          priority
        />
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
  );
}
