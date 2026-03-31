import Layout from "@/components/Layout";
import HomeCtaSection from "@/components/home/HomeCtaSection";
import HomeEntryPointsSection from "@/components/home/HomeEntryPointsSection";
import HomeFeaturesSection from "@/components/home/HomeFeaturesSection";
import HomeHeroSection from "@/components/home/HomeHeroSection";

const Index = () => {
  return (
    <Layout>
      <HomeHeroSection />
      <HomeFeaturesSection />
      <HomeEntryPointsSection />
      <HomeCtaSection />
    </Layout>
  );
};

export default Index;
