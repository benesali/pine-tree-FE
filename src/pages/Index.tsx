import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ApartmentSearchSection from "@/components/ApartmentSearchSection";
import BuildingSection from "@/components/BuildingSection";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchParams] = useSearchParams();

  const isSearching =
    searchParams.has("from") &&
    searchParams.has("to") &&
    searchParams.has("guests");

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* SEARCH RESULTS – overlay pod hero */}
      <section className="-mt-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <ApartmentSearchSection />
        </div>
      </section>

      {/* BUILDINGS – normální tok stránky */}
      {!isSearching && (
        <section className="relative z-0 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <BuildingSection />
          </div>
        </section>
      )}
      <InstagramFeed />
      <Footer />
    </main>
  );
};

export default Index;
