import { Users, Bed, Bath, Wifi, Car, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Apartment {
  id: number;
  name: string;
  image: string;
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  available: boolean;
}

interface ApartmentCardProps {
  apartment: Apartment;
  onBook: (apartment: Apartment) => void;
}

const ApartmentCard = ({ apartment, onBook }: ApartmentCardProps) => {
  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="h-4 w-4" />,
    parking: <Car className="h-4 w-4" />,
  };

  return (
    <article className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 animate-slide-up">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={apartment.image}
          alt={apartment.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {apartment.available ? (
          <Badge className="absolute top-4 right-4 bg-pine text-primary-foreground">
            Available
          </Badge>
        ) : (
          <Badge variant="secondary" className="absolute top-4 right-4">
            Booked
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading text-xl font-semibold text-foreground">
            {apartment.name}
          </h3>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">€{apartment.price}</span>
            <span className="text-sm text-muted-foreground block">/ night</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {apartment.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span>{apartment.guests} guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-primary" />
            <span>{apartment.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-primary" />
            <span>{apartment.bathrooms} bath</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-2 mb-5">
          {apartment.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
            >
              {amenityIcons[amenity.toLowerCase()] || null}
              {amenity}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button
          variant={apartment.available ? "default" : "secondary"}
          className="w-full"
          onClick={() => onBook(apartment)}
          disabled={!apartment.available}
        >
          {apartment.available ? "Book Now" : "Not Available"}
        </Button>
      </div>
    </article>
  );
};

export default ApartmentCard;
