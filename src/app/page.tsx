"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CallToActionSection from "@/components/CallToActionSection";
import UpcomingShowsSection from "@/components/UpcomingShowsSection";
import QuickStatsSection from "@/components/QuickStatsSection";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />
      <HeroSection />
      <CallToActionSection />
      <UpcomingShowsSection />
      <QuickStatsSection />
      <Footer />
    </div>
  );
}
