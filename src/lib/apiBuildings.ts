import { apiPublic } from "@/lib/apiPublic";
import type { BuildingCardData } from "@/types/BuildingCardData";

/*
  Fetch buildings for homepage listing.
  Date range is optional and will be used later for availability filtering.
*/
export const fetchBuildings = async (
  dates?: { from: Date; to: Date } | null,
  lang: string = "cs" 
): Promise<BuildingCardData[]> => {
  try {
    let url = `/api/${lang}/buildings`;
    if (url.includes("/api/undefined/")) {
    throw new Error("Lang is undefined");
  }

    if (dates?.from && dates?.to) {
      const from = dates.from.toISOString().split("T")[0];
      const to = dates.to.toISOString().split("T")[0];
      url += `?from=${from}&to=${to}`;
    }

    return await apiPublic<BuildingCardData[]>(url);
  } catch (error) {
    console.warn("Buildings API unavailable, using fallback", error);
    return getFallbackBuildings();
  }
};

const getFallbackBuildings = (): BuildingCardData[] => [
  {
    id: 1,
    slug: "pine-tree-house1",
    name: "Pine Tree House",
    location: "Srima, Croatia",
    apartmentsCount: 4,
    minGuests: 2,
    maxGuests: 6,

    priceFrom: 95,
    availableApartments: 3,
  },
];

