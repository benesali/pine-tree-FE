import { apiPublic } from "@/lib/apiPublic";
import { apartmentsData } from "@/data/apartments";
import type { Apartment } from "@/components/ApartmentCard";

export const fetchApartments = async (): Promise<Apartment[]> => {
  try {
    return await apiPublic<Apartment[]>("/api/apartments");
  } catch {
    return apartmentsData.map(apt => ({
      id: apt.id,
      slug: apt.slug,
      name: apt.name,
      image: apt.image,
      price: apt.price,
      guests: apt.guests,
      bedrooms: apt.bedrooms,
      bathrooms: apt.bathrooms,
      amenities: apt.amenities,
      description: apt.description,
      available: apt.available,
    }));
  }
};


