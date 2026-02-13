import FeatureHero from "@/app/(features)/sections/feature-hero";
import FeatureHighlights from "@/app/(features)/sections/feature-highlights";
import TTSFeatureSection from "@/app/(features)/sections/tts-feature-section";
import DownloadSection from "@/app/(features)/sections/download-section";
import AppPreviewSection from "@/app/(features)/sections/app-preview-section";
import PageChrome from "@/app/(features)/components/page-chrome";

export default function Home() {
  return (
    <PageChrome containerClassName="">
      <FeatureHero />
      <AppPreviewSection />
      <DownloadSection />
      <FeatureHighlights />
      <TTSFeatureSection />
    </PageChrome>
  );
}
