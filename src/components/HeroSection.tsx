import heroImage from "@/assets/hero-dalmatia.jpg";
import DateRangeSearch from "./DateRangeSearch";
import { DateRange } from "react-day-picker";

interface HeroSectionProps {
  onSearch: (dateRange: DateRange | undefined, guests: number) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful Dalmatian coastline with pine trees and turquoise sea"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/20 to-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto mb-8 md:mb-12">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 md:mb-6 animate-fade-in drop-shadow-lg">
            Your Perfect Escape in Dalmatia
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-slide-up drop-shadow-md" style={{ animationDelay: '0.2s' }}>
            Experience the stunning Croatian coast from our hand-picked apartments, 
            surrounded by pine trees and crystal-clear Adriatic waters.
          </p>
        </div>

        {/* Search Box */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <DateRangeSearch onSearch={onSearch} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary-foreground/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
