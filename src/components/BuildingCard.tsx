import { MapPin, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface BuildingCardData {
  id: number;
  slug: string;
  name: string;
  location: string;

  heroImage: string;
  previewImages: string[];

  apartmentsCount: number;
  minGuests: number;
  maxGuests: number;

  priceFrom: number;
  availableApartments: number;
}

interface Props {
  building: BuildingCardData;
}

const BuildingCard = ({ building }: Props) => {
  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all">
      {/* Images */}
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={building.heroImage}
            alt={building.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-2 left-2 right-2 grid grid-cols-3 gap-2">
          {building.previewImages.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-lg border border-background"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {building.availableApartments > 0 && (
          <Badge className="absolute top-3 right-3 bg-pine text-primary-foreground">
            {building.availableApartments} available
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold">{building.name}</h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <MapPin className="h-4 w-4" />
          {building.location}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
          <div className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            {building.apartmentsCount} apartments
          </div>

          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {building.minGuests}–{building.maxGuests} guests
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            <div className="text-lg font-bold text-primary">
              from €{building.priceFrom}
            </div>
            <div className="text-xs text-muted-foreground">
              per night
            </div>
          </div>

          <Link to={`/buildings/${building.slug}`}>
            <Button>View apartments</Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BuildingCard;
