import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedProjects />
    </>
  );
}
