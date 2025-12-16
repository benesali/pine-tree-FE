import apartment1 from "@/assets/apartment-1.jpg";
import apartment2 from "@/assets/apartment-2.jpg";
import apartment3 from "@/assets/apartment-3.jpg";

export interface BookedDate {
  from: Date;
  to: Date;
}

export interface PriceRange {
  from: Date;
  to: Date;
  price: number;
  label: string;
}

export interface Apartment {
  id: number;
  slug: string;
  name: string;
  image: string;
  images: string[];
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  fullDescription: string;
  available: boolean;
  location: {
    address: string;
    city: string;
    region: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    nearbyAttractions: string[];
    distanceToBeach: string;
    distanceToCenter: string;
  };
  bookedDates: BookedDate[];
  priceRanges: PriceRange[];
}

// Sample booked dates for demo
const generateBookedDates = (): BookedDate[] => {
  const now = new Date();
  return [
    {
      from: new Date(now.getFullYear(), now.getMonth(), 20),
      to: new Date(now.getFullYear(), now.getMonth(), 25),
    },
    {
      from: new Date(now.getFullYear(), now.getMonth() + 1, 5),
      to: new Date(now.getFullYear(), now.getMonth() + 1, 12),
    },
    {
      from: new Date(now.getFullYear(), now.getMonth() + 2, 1),
      to: new Date(now.getFullYear(), now.getMonth() + 2, 7),
    },
  ];
};

// Price ranges based on season
const generatePriceRanges = (basePrice: number): PriceRange[] => {
  const year = new Date().getFullYear();
  return [
    {
      from: new Date(year, 0, 1),
      to: new Date(year, 4, 31),
      price: basePrice * 0.7,
      label: 'Low Season',
    },
    {
      from: new Date(year, 5, 1),
      to: new Date(year, 5, 30),
      price: basePrice * 0.85,
      label: 'Mid Season',
    },
    {
      from: new Date(year, 6, 1),
      to: new Date(year, 7, 31),
      price: basePrice,
      label: 'High Season',
    },
    {
      from: new Date(year, 8, 1),
      to: new Date(year, 9, 31),
      price: basePrice * 0.85,
      label: 'Mid Season',
    },
    {
      from: new Date(year, 10, 1),
      to: new Date(year, 11, 31),
      price: basePrice * 0.7,
      label: 'Low Season',
    },
  ];
};

export const apartmentsData: Apartment[] = [
  {
    id: 1,
    slug: "sea-view-deluxe",
    name: "Sea View Deluxe",
    image: apartment1,
    images: [apartment1, apartment2, apartment3],
    price: 120,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Parking", "AC", "Terrace", "Sea View", "Fully Equipped Kitchen", "Washing Machine", "TV"],
    description: "Spacious apartment with breathtaking panoramic sea views, modern amenities, and a private terrace perfect for sunset watching.",
    fullDescription: `Welcome to our stunning Sea View Deluxe apartment, a true gem on the Dalmatian coast. This beautifully appointed 85m² space offers everything you need for a perfect Croatian getaway.

The apartment features two comfortable bedrooms - a master bedroom with a queen-size bed and sea views, and a second bedroom with twin beds. The spacious living area opens onto a generous private terrace where you can enjoy your morning coffee while watching the sunrise over the Adriatic.

The fully equipped modern kitchen includes everything for home cooking, while the stylish bathroom provides a refreshing retreat after a day at the beach. Air conditioning ensures comfort during warm summer days, and free WiFi keeps you connected.

Located just 200 meters from a pristine pebble beach and 5 minutes walk from the charming old town, this apartment offers the perfect balance of relaxation and exploration.`,
    available: true,
    location: {
      address: "Obala kralja Tomislava 15",
      city: "Makarska",
      region: "Split-Dalmatia County",
      country: "Croatia",
      coordinates: {
        lat: 43.2969,
        lng: 17.0178,
      },
      nearbyAttractions: [
        "Makarska Riva (waterfront promenade) - 5 min walk",
        "St. Mark's Church - 3 min walk",
        "Franciscan Monastery - 10 min walk",
        "Biokovo Nature Park - 15 min drive",
        "Nugal Beach - 20 min walk",
      ],
      distanceToBeach: "200m",
      distanceToCenter: "5 min walk",
    },
    bookedDates: generateBookedDates(),
    priceRanges: generatePriceRanges(120),
  },
  {
    id: 2,
    slug: "cozy-studio",
    name: "Cozy Studio",
    image: apartment2,
    images: [apartment2, apartment1, apartment3],
    price: 75,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "AC", "Balcony", "Sea View", "Kitchenette", "TV"],
    description: "Charming studio apartment ideal for couples, featuring a cozy interior with a balcony overlooking the Adriatic Sea.",
    fullDescription: `Our Cozy Studio is the perfect romantic retreat for couples seeking an authentic Dalmatian experience. This charming 40m² studio combines comfort with stunning views.

The open-plan design features a comfortable double bed, a cozy seating area, and a well-equipped kitchenette. The highlight is the private balcony with sea views - ideal for evening drinks while watching the sunset paint the sky in shades of orange and pink.

Modern amenities include air conditioning, flat-screen TV, and high-speed WiFi. The bathroom is compact but thoughtfully designed with a walk-in shower.

Situated in the heart of the old town, you're steps away from local restaurants, cafés, and the beautiful waterfront promenade. The nearest beach is just a 3-minute walk away.`,
    available: true,
    location: {
      address: "Kalalarga 8",
      city: "Makarska",
      region: "Split-Dalmatia County",
      country: "Croatia",
      coordinates: {
        lat: 43.2965,
        lng: 17.0185,
      },
      nearbyAttractions: [
        "Main Beach - 3 min walk",
        "Local fish market - 2 min walk",
        "Town Museum - 5 min walk",
        "Diving center - 10 min walk",
        "Water sports rentals - 5 min walk",
      ],
      distanceToBeach: "150m",
      distanceToCenter: "In the center",
    },
    bookedDates: generateBookedDates(),
    priceRanges: generatePriceRanges(75),
  },
  {
    id: 3,
    slug: "family-villa",
    name: "Family Villa",
    image: apartment3,
    images: [apartment3, apartment1, apartment2],
    price: 180,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["WiFi", "Parking", "AC", "Garden", "BBQ", "Private Pool", "Terrace", "Fully Equipped Kitchen", "Washing Machine", "Dishwasher", "TV", "Outdoor Dining"],
    description: "Luxurious family villa with a large terrace, outdoor dining area, and stunning sunset views through the pine trees.",
    fullDescription: `Experience the ultimate family holiday in our spectacular Family Villa, a 150m² haven of comfort and luxury nestled among fragrant pine trees with breathtaking sea views.

This spacious villa features three beautifully decorated bedrooms: a master suite with en-suite bathroom and sea view, a twin bedroom, and a children's room with bunk beds. The second full bathroom serves the other bedrooms and features both a bathtub and shower.

The heart of the villa is the open-plan living and dining area with large windows framing the spectacular views. The fully equipped kitchen includes modern appliances, perfect for preparing family meals. Step outside to discover the expansive terrace with outdoor dining area, BBQ facilities, and a private pool surrounded by sun loungers.

The private garden offers children a safe space to play, while parents can relax knowing they're in their own private paradise. The villa includes free parking for two cars and is located just a 10-minute drive from the beach and town center.`,
    available: true,
    location: {
      address: "Put Osejave 42",
      city: "Makarska",
      region: "Split-Dalmatia County",
      country: "Croatia",
      coordinates: {
        lat: 43.2945,
        lng: 17.0125,
      },
      nearbyAttractions: [
        "Osejava Forest Park - 5 min walk",
        "Makarska town center - 10 min drive",
        "Biokovo Skywalk - 30 min drive",
        "Split (UNESCO site) - 1 hour drive",
        "Krka National Park - 2 hours drive",
      ],
      distanceToBeach: "800m",
      distanceToCenter: "10 min drive",
    },
    bookedDates: generateBookedDates(),
    priceRanges: generatePriceRanges(180),
  },
];

export const getApartmentBySlug = (slug: string): Apartment | undefined => {
  return apartmentsData.find(apt => apt.slug === slug);
};

export const getApartmentById = (id: number): Apartment | undefined => {
  return apartmentsData.find(apt => apt.id === id);
};

export const isDateBooked = (apartment: Apartment, date: Date): boolean => {
  return apartment.bookedDates.some(
    booking => date >= booking.from && date <= booking.to
  );
};

export const getPriceForDate = (apartment: Apartment, date: Date): number => {
  const priceRange = apartment.priceRanges.find(
    range => date >= range.from && date <= range.to
  );
  return priceRange?.price || apartment.price;
};

export const getSeasonLabel = (apartment: Apartment, date: Date): string => {
  const priceRange = apartment.priceRanges.find(
    range => date >= range.from && date <= range.to
  );
  return priceRange?.label || 'Standard';
};
