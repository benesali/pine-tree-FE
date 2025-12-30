import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ApartmentInlineCard, {
  ApartmentInline,
} from "@/components/ApartmentInlineCard";

import { apiPublic } from "@/lib/apiPublic";
import { toast } from "@/hooks/use-toast";

interface BuildingDetailData {
  id: number;
  slug: string;
  name: string;
  location: string;
  description?: string;
  apartments: ApartmentInline[];
}

const BuildingDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [building, setBuilding] =
    useState<BuildingDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    apiPublic<BuildingDetailData>(`/api/buildings/${slug}`)
      .then(setBuilding)
      .catch(() => toast({ title: "Building not found" }))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleInquiry = (apartment: ApartmentInline) => {
    toast({
      title: "Inquiry",
      description: `Inquiry for ${apartment.name} – form will open`,
    });
    // TODO: open inquiry modal
  };

  if (loading) {
    return (
      <main>
        <Navigation />
        <div className="pt-32 text-center text-muted-foreground">
          Loading building…
        </div>
        <Footer />
      </main>
    );
  }

  if (!building) {
    return (
      <main>
        <Navigation />
        <div className="pt-32 text-center">
          Building not found
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

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

      <Footer />
    </main>
  );
};

export default BuildingDetail;
