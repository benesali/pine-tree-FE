import { useEffect } from "react";
import { MapPin, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageGallery from "@/components/ImageGallery";
import { useImageGallery } from "@/hooks/useImageGallery";
import { BuildingCardData } from "@/types/BuildingCardData";

interface Props {
  building: BuildingCardData;
}

const BuildingCard = ({ building }: Props) => {
  const { images } = useImageGallery(
    `/images/${building.slug}/general`
  );

  return (
    <article className="relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all">

      {/* Gallery */}
      {images && (
        <ImageGallery
          {...images}
          alt={building.name}
          variant="card"
        />
      )}

      {/* Badge */}
      {building.availableApartments > 0 && (
        <Badge className="absolute top-3 right-3 bg-pine text-primary-foreground">
          {building.availableApartments} available
        </Badge>
      )}

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
