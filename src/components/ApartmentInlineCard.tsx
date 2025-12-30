import { Users, Bed, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";



export interface ApartmentInline {
  id: number;
  slug: string;
  name: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  available: boolean;
}

interface Props {
  apartment: ApartmentInline;
  onInquiry: (apartment: ApartmentInline) => void;
}

const formatFloor = (floor?: number) => {
  if (floor === undefined) return null;
  return floor === 0 ? "Ground floor" : `${floor}. floor`;
};

const ApartmentInlineCard = ({ apartment, onInquiry }: Props) => {
  return (
    <div className="border rounded-xl p-4 bg-card flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">
          {apartment.name}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            apartment.available
              ? "bg-emerald-100 text-emerald-700"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {apartment.available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {apartment.guests} guests
        </div>
        <div className="flex items-center gap-1">
          <Bed className="h-4 w-4" />
          {apartment.bedrooms} bedrooms
        </div>
        <div className="flex items-center gap-1">
          <Bath className="h-4 w-4" />
          {apartment.bathrooms} bathrooms
        </div>
        {formatFloor(apartment.floor) && (
          <span>🏢 {formatFloor(apartment.floor)}</span>
        )}
      </div>
      <div className="flex gap-2 pt-2">
        <Link to={`/apartments/${apartment.slug}`}>
          <Button
            variant="outline"
            size="sm"
            disabled={!apartment.available}
          >
            Check availability
          </Button>
        </Link>

        <Button
          size="sm"
          onClick={() => onInquiry(apartment)}
        >
          Send inquiry
        </Button>
      </div>
    </div>
  );
};

export default ApartmentInlineCard;
