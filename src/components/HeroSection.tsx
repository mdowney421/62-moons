import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex-1 flex items-center justify-center pt-20 pb-6 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-600 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-30">
        <Image
          src="/bandpicture1.png"
          alt="62 Moons Band"
          fill
          className="object-cover object-top"
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
          className="w-full max-w-sm md:max-w-lg mx-auto mb-6 mt-72"
        />
      </div>
    </section>
  );
}
