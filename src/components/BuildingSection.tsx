import { useEffect, useState } from "react";
import BuildingCard from "./BuildingCard";
import { BuildingCardData } from "@/types/BuildingCardData";  
import { toast } from "@/hooks/use-toast";
import { fetchBuildings } from "@/lib/apiBuildings";
import { useParams } from "react-router-dom";

interface Props {
  searchedDates?: { from: Date; to: Date } | null;
  searchedGuests?: number;
}

const BuildingsSection = ({ searchedDates, searchedGuests }: Props) => {
  
  const {lang} = useParams<{ lang: string }>(); 
  const [buildings, setBuildings] = useState<BuildingCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lang) return;

    fetchBuildings(searchedDates, lang)
      .then(setBuildings)
      .catch(() =>
        toast({ title: "Failed to load accommodation" })
      )
      .finally(() => setLoading(false));
  }, [searchedDates, lang]);

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
              lang={lang!}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildingsSection;
