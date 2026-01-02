import heroImage from "@/assets/hero-dalmatia.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      {/* background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful Dalmatian coastline with pine trees and turquoise sea"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/20 to-foreground/60" />
      </div>

      {/* content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto mb-8 md:mb-12">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 md:mb-6">
            Your Perfect Escape in Dalmatia
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Experience the stunning Croatian coast from our hand-picked apartments,
            surrounded by pine trees and crystal-clear Adriatic waters.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;