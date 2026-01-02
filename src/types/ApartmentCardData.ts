export interface ApartmentCardData {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  available: boolean;
}
