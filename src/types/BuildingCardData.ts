export interface BuildingCardData {
  id: number;
  slug: string;
  name: string;
  location: string;

  apartmentsCount: number;
  minGuests: number;
  maxGuests: number;

  priceFrom: number;
  availableApartments: number;
}
