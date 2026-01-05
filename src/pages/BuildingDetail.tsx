import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {ApartmentInlineCardData} from "@/types/ApartmentInlineCardData";
import ApartmentInlineCard from "@/components/ApartmentInlineCard";

import { apiPublic } from "@/lib/apiPublic";
import { toast } from "@/hooks/use-toast";
import InstagramStrip from "@/components/InstagramStrip";

interface BuildingDetailData {
  id: number;
  slug: string;
  name: string;
  location: string;
  description?: string;
  apartments: ApartmentInlineCardData[];
}

const BuildingDetail = () => {
  const { slug, lang } = useParams<{ slug: string; lang: string }>();
  const [building, setBuilding] =
    useState<BuildingDetailData | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!slug || !lang) return;

  apiPublic<any>(`/api/${lang}/buildings/${slug}`)
    .then((data) => {
      setBuilding({
        ...data,
        apartments: data.apartments.map((a: any) => ({
          ...a,
          buildingSlug: a.building_slug, 
        })),
      });
    })
    .catch(() => toast({ title: "Building not found" }))
    .finally(() => setLoading(false));
}, [slug]);

  const handleInquiry = (apartment: ApartmentInlineCardData ) => {
    toast({
      title: "Inquiry",
      description: `Inquiry for ${apartment.name} – form will open`,
    });
    // TODO: open inquiry modal
  };

  if (loading) {
    return (
      <main>

        <div className="pt-32 text-center text-muted-foreground">
          Loading building…
        </div>

      </main>
    );
  }

  if (!building) {
    return (
      <main>
        <div className="pt-32 text-center">
          Building not found
        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Header */}
          <h1 className="text-3xl font-semibold mb-1">
            {building.name}
          </h1>
          <p className="text-muted-foreground mb-6">
            {building.location}
          </p>

          {/* Description */}
          {building.description && (
            <p className="text-lg mb-10">
              {building.description}
            </p>
          )}

          {/* Apartments */}
          <h2 className="text-2xl font-semibold mb-4">
            Available apartments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {building.apartments.map((apt) => (
              <ApartmentInlineCard
                key={apt.id}
                apartment={apt}
                lang={lang!}
                onInquiry={handleInquiry}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-10 text-sm text-muted-foreground">
            <p>
              Availability is shown per apartment. Select the apartment
              that best suits your needs and send us an inquiry.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default BuildingDetail;
