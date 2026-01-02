export interface ApartmentInlineCardData {
  id: number;
  slug: string;
  name: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  priceFrom: number;

  buildingSlug: string; 
}
