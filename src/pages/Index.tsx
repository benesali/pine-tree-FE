import { useState } from "react";
import { DateRange } from "react-day-picker";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ApartmentsSection from "@/components/ApartmentsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchedDates, setSearchedDates] = useState<{ from: Date; to: Date } | null>(null);
  const [searchedGuests, setSearchedGuests] = useState<number | undefined>();

  const handleSearch = (dateRange: DateRange | undefined, guests: number) => {
    if (dateRange?.from && dateRange?.to) {
      setSearchedDates({ from: dateRange.from, to: dateRange.to });
    }
    setSearchedGuests(guests);
    
    // Scroll to apartments section
    const apartmentsSection = document.getElementById("apartments");
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection onSearch={handleSearch} />
      <ApartmentsSection searchedDates={searchedDates} searchedGuests={searchedGuests} />
      <Footer />
    </main>
  );
};

export default Index;
