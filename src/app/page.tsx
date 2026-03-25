"use client";

import { useState, useCallback } from "react";
import Preloader from "@/sections/home/Preloader";
import Hero from "@/sections/home/Hero";
import Marquee from "@/sections/home/Marquee";
import Statement from "@/sections/home/Statement";
import ServicesScroller from "@/sections/home/ServicesScroller";
import FeaturedWork from "@/sections/home/FeaturedWork";
import Process from "@/sections/home/Process";
import AIFeature from "@/sections/home/AIFeature";
import Testimonials from "@/sections/home/Testimonials";
import LocationStrip from "@/sections/home/LocationStrip";
import CTAFinale from "@/sections/home/CTAFinale";

export default function Home() {
  const [ready, setReady] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <div className="w-full relative block">
        <Hero ready={ready} />
        <Marquee />
        <Statement />
        <ServicesScroller />
        <FeaturedWork />
        <Process />
        <AIFeature />
        <Testimonials />
        <LocationStrip />
        <CTAFinale />
      </div>
    </>
  );
}
