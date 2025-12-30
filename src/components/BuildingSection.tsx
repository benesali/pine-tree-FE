import { useEffect, useState } from "react";
import BuildingCard, { BuildingCardData } from "./BuildingCard";
import { toast } from "@/hooks/use-toast";
import { fetchBuildings } from "@/lib/apiBuildings";

interface Props {
  searchedDates?: { from: Date; to: Date } | null;
  searchedGuests?: number;
}

const BuildingsSection = ({ searchedDates, searchedGuests }: Props) => {
  const [buildings, setBuildings] = useState<BuildingCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuildings(searchedDates)
      .then(setBuildings)
      .catch(() =>
        toast({ title: "Failed to load accommodation" })
      )
      .finally(() => setLoading(false));
  }, [searchedDates]);

  if (loading) {
    return (
      <section className="py-24 text-center text-muted-foreground">
        Loading accommodation…
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildingsSection;
