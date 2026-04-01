"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import UpcomingShowsSection from "@/components/UpcomingShowsSection";
import QuickStatsSection from "@/components/QuickStatsSection";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />
      <HeroSection />
      <SocialMediaSection />
      <UpcomingShowsSection />
      <QuickStatsSection />
      <Footer />
    </div>
  );
}
