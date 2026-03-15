import Hero from "@/components/Hero";
import NavigationHub from "@/components/NavigationHub";
import ThreeWings from "@/components/ThreeWings";
import CurriculumAddons from "@/components/CurriculumAddons";
import IndustryVoices from "@/components/IndustryVoices";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <NavigationHub />
        <ThreeWings />
        <CurriculumAddons />
        <IndustryVoices />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
