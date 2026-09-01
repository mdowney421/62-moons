export type SocialLink = {
  name: string;
  href: string;
  icon: string;
  hoverColor: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/62moonsband/",
    icon: "/instagram.svg",
    hoverColor: "#E1306C",
  },
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
