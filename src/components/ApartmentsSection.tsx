import { useState, useEffect } from "react";
import ApartmentCard, { Apartment } from "./ApartmentCard";
import { toast } from "@/hooks/use-toast";
import { apartmentsData as rawApartmentsData } from "@/data/apartments";

// Map to simpler Apartment type for card display
const apartmentsData: Apartment[] = rawApartmentsData.map(apt => ({
  id: apt.id,
  slug: apt.slug,
  name: apt.name,
  image: apt.image,
  price: apt.price,
  guests: apt.guests,
  bedrooms: apt.bedrooms,
  bathrooms: apt.bathrooms,
  amenities: apt.amenities,
  description: apt.description,
  available: apt.available,
}));

interface ApartmentsSectionProps {
  searchedDates?: { from: Date; to: Date } | null;
  searchedGuests?: number;
}

const ApartmentsSection = ({ searchedDates, searchedGuests }: ApartmentsSectionProps) => {
  const [apartments, setApartments] = useState<Apartment[]>(apartmentsData);

  useEffect(() => {
    if (searchedGuests) {
      const filtered = apartmentsData.filter(apt => apt.guests >= searchedGuests);
      setApartments(filtered);
    } else {
      setApartments(apartmentsData);
    }
  }, [searchedGuests]);

  const handleBook = (apartment: Apartment) => {
    toast({
      title: "Booking Request Sent!",
      description: `Thank you for your interest in ${apartment.name}. We'll contact you shortly to confirm your reservation.`,
    });
  };

  return (
    <section id="apartments" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Apartments
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {searchedDates ? (
              <>Showing available apartments for your selected dates</>
            ) : (
              <>Choose from our carefully curated selection of coastal retreats</>
            )}
          </p>
        </div>

        {apartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {apartments.map((apartment, index) => (
              <div key={apartment.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ApartmentCard apartment={apartment} onBook={handleBook} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No apartments available for {searchedGuests} guests. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApartmentsSection;
