import Link from "next/link";

export default function CallToActionSection() {
  const platforms = [
    {
      name: "Facebook",
      href: "https://facebook.com/61584281717707/",
      icon: "/facebook.svg",
      hoverColor: "#4B9FFF",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/playlist?list=OLAK5uy_l9WtwEpg0fyqM1YdAdM0l3KE-TASI6KZc",
      icon: "/youtube.svg",
      hoverColor: "#FF3333",
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/artist/1fmby6kP0ubjg9Z5cr9Mdy",
      icon: "/spotify.svg",
      hoverColor: "#4FD983",
    },
    {
      name: "Apple Music",
      href: "https://music.apple.com/gb/album/62-moons-ep/1736719576",
      icon: "/apple-music.svg",
      hoverColor: "#FF5A7B",
    },
  ];

  return (
    <section className="bg-black border-b border-red-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/band"
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest transition transform hover:scale-105 text-lg text-center"
          >
            Meet the Band
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-black uppercase tracking-widest transition text-lg text-center"
          >
            Get in Touch
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-300 mb-4">
            Follow Us
          </h2>
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
              <img
                src={platform.icon}
                alt={platform.name}
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
