import Hero from "../components/Hero";
import BentoStats from "../components/BentoStats";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { featuredResources } from "../data/mockData";

export default function Landing() {
  return (
    <>
      <Hero />
      <BentoStats />
      <FeaturedCarousel items={featuredResources} />
    </>
  );
}
