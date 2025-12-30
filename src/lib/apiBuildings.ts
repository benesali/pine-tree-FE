import { apiPublic } from "@/lib/apiPublic";
import type { BuildingCardData } from "@/components/BuildingCard";

/*
  Fetch buildings for homepage listing.
  Date range is optional and will be used later for availability filtering.
*/
export const fetchBuildings = async (
  dates?: { from: Date; to: Date } | null
): Promise<BuildingCardData[]> => {
  try {
    let url = "/api/buildings";

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
    slug: "pine-tree-house",
    name: "Pine Tree House",
    location: "Srima, Croatia",

    heroImage: "/images/house/hero.jpg",
    previewImages: [
      "/images/apartments/a/living.jpg",
      "/images/apartments/b/bedroom.jpg",
      "/images/apartments/c/terrace.jpg",
    ],

    apartmentsCount: 4,
    minGuests: 2,
    maxGuests: 6,

    priceFrom: 95,
    availableApartments: 3,
  },
];

