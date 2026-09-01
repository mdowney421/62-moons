import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with 62 Moons for show bookings, collaborations, and inquiries. Based in Chicago, Illinois.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
