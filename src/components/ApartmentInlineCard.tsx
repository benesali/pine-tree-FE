import { Users, Bed, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApartmentPreviewGallery from "@/components/ApartmentPreviewGallery";
import { useImageGallery } from "@/hooks/useImageGallery";
import { ApartmentInlineCardData } from "@/types/ApartmentInlineCardData";
import { Link } from "react-router-dom";

interface Props {
  apartment: ApartmentInlineCardData;
  lang: string;
  onInquiry: (apartment: ApartmentInlineCardData) => void;
}

const ApartmentInlineCard = ({ apartment, onInquiry, lang }: Props) => {
  const { images } = useImageGallery(
    `/images/${apartment.buildingSlug}/${apartment.slug}`,
  );


  console.log(
  "INLINE IMAGE PATH",
  `/images/${apartment.buildingSlug}/${apartment.slug}/manifest.json`
);

console.log("INLINE CARD", apartment.slug, images);

  return (
    <article className="bg-card rounded-xl p-5 shadow-card hover:shadow-elevated transition-all">

      {/* Header */}
      <h3 className="text-xl font-semibold mb-2">
        {apartment.name}
      </h3>

      {/* Preview gallery */}
      {images && (
        <div className="mb-4">
          <ApartmentPreviewGallery
            {...images}
            alt={apartment.name}
          />
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {apartment.guests}
        </div>
        <div className="flex items-center gap-1">
          <Bed className="h-4 w-4" />
          {apartment.bedrooms}
        </div>
        <div className="flex items-center gap-1">
          <Bath className="h-4 w-4" />
          {apartment.bathrooms}
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between">
        <div className="font-semibold text-primary">
          from €95/night
        </div>

        <div className="flex gap-2">
          <Link to={`/${lang}/apartments/${apartment.slug}`}>
            <Button variant="outline">
              View details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ApartmentInlineCard;
