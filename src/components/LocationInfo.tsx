import { MapPin, Navigation, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Apartment } from "@/data/apartments";

interface LocationInfoProps {
  apartment: Apartment;
}

const LocationInfo = ({ apartment }: LocationInfoProps) => {
  const { location } = apartment;

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        Location
      </h3>

      {/* Address */}
      <div className="mb-4">
        <p className="text-foreground font-medium">{location.address}</p>
        <p className="text-muted-foreground">
          {location.city}, {location.region}
        </p>
        <p className="text-muted-foreground">{location.country}</p>
      </div>

      {/* Quick distances */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <Navigation className="h-4 w-4 text-primary" />
          <div>
            <p className="text-muted-foreground">Beach</p>
            <p className="font-medium text-foreground">{location.distanceToBeach}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <div>
            <p className="text-muted-foreground">City Center</p>
            <p className="font-medium text-foreground">{location.distanceToCenter}</p>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="aspect-video bg-secondary rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <div className="text-center p-4">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">
            {location.city}, Croatia
          </p>
          <p className="text-xs text-muted-foreground">
            {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
          </p>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={openInMaps}>
        <ExternalLink className="h-4 w-4 mr-2" />
        Open in Google Maps
      </Button>

      {/* Nearby Attractions */}
      <div className="mt-6">
        <h4 className="font-medium text-foreground mb-3">Nearby Attractions</h4>
        <ul className="space-y-2">
          {location.nearbyAttractions.map((attraction, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {attraction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationInfo;
