'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/lib/components/landing/HeroSection";
import ShowcaseSection from "@/lib/components/landing/ShowcaseSection";
import CompanySection from "@/lib/components/landing/CompanySection";
import CampaignSection from "@/lib/components/landing/CampaignSection";
import HighlightSection from "@/lib/components/landing/HighlightSection";
import RoadmapSection from "@/lib/components/landing/RoadmapSection";
import FeedbackSection from "@/lib/components/landing/FeedbackSection";
import Header from "@/lib/components/layout/Header";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/explore");
  }, []);
  return (
    <div className="page-bg">
      <Header />
      <main className="main-pt">
        <section className="text-white">
          <HeroSection />
          <ShowcaseSection />
          <CompanySection />
          <CampaignSection />
          <HighlightSection />
          <RoadmapSection />
          <FeedbackSection />
        </section>
      </main>
    </div>
  );
}
