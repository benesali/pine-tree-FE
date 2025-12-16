export interface TravelTip {
  id: number;
  title: string;
  category: 'beaches' | 'nature' | 'culture' | 'food' | 'activities' | 'practical';
  image?: string;
  description: string;
  content: string;
  highlights: string[];
  distance?: string;
}

export const travelTipsData: TravelTip[] = [
  {
    id: 1,
    title: "Biokovo Nature Park & Skywalk",
    category: "nature",
    description: "Experience breathtaking views from the famous glass platform suspended over the Adriatic.",
    content: `Biokovo Nature Park is one of Croatia's most spectacular natural attractions, rising dramatically behind the Makarska Riviera. The highlight is the Biokovo Skywalk, a horseshoe-shaped glass platform extending 12 meters over a 1,228-meter drop, offering unparalleled views of the coast and islands.

The park features diverse flora and fauna, including wild horses and chamois. The winding road to the top (Sveti Jure peak at 1,762m) is an adventure in itself. Visit early morning or late afternoon for the best lighting and fewer crowds.

Tickets for the Skywalk must be booked in advance during peak season. Bring warm clothing as it can be significantly cooler at altitude.`,
    highlights: [
      "Skywalk glass platform at 1,228m altitude",
      "Sveti Jure - highest peak at 1,762m",
      "Endemic plant species",
      "Stunning sunrise/sunset views",
    ],
    distance: "30 min drive",
  },
  {
    id: 2,
    title: "Hidden Beaches of Makarska Riviera",
    category: "beaches",
    description: "Discover secluded coves and crystal-clear waters away from the crowds.",
    content: `While the main beach in Makarska is beautiful, the real gems are the hidden coves scattered along the coast. Nugal Beach is famous for its dramatic cliff backdrop and crystal-clear waters - note that it's clothing optional. 

Vepric Beach near the pilgrimage sanctuary offers calm, clear waters perfect for snorkeling. The beaches at Brela, just 15 minutes north, have been voted among the most beautiful in Europe, with the famous Punta Rata beach featuring the iconic Brela Stone.

For a true adventure, rent a kayak or paddleboard and explore the coastline to find your own private cove. The waters here are remarkably clear with visibility often exceeding 20 meters.`,
    highlights: [
      "Nugal Beach - dramatic cliffs and clear water",
      "Punta Rata, Brela - voted best beach in Europe",
      "Vepric Beach - calm waters, family-friendly",
      "Secret coves accessible by kayak",
    ],
    distance: "5-20 min from Makarska",
  },
  {
    id: 3,
    title: "Split & Diocletian's Palace",
    category: "culture",
    description: "Explore the UNESCO World Heritage Site and Croatia's second-largest city.",
    content: `Just an hour's drive from Makarska, Split offers a fascinating blend of ancient Roman architecture and vibrant modern life. The centerpiece is Diocletian's Palace, built in the 4th century as a retirement residence for the Roman Emperor Diocletian.

Unlike typical ancient ruins, the palace is a living monument - its walls contain shops, restaurants, and homes. Wander through the narrow streets, visit the impressive Cathedral of Saint Domnius (built within the Emperor's mausoleum), and climb the bell tower for panoramic views.

Don't miss the Riva promenade for coffee and people-watching, the lively Green Market for local produce, and the ancient Peristyle square where summer concerts are held.`,
    highlights: [
      "Diocletian's Palace - UNESCO World Heritage Site",
      "Cathedral of Saint Domnius bell tower",
      "Riva promenade and café culture",
      "Ancient Roman basement halls",
    ],
    distance: "1 hour drive",
  },
  {
    id: 4,
    title: "Traditional Dalmatian Cuisine",
    category: "food",
    description: "Savor fresh seafood, local wines, and authentic Mediterranean flavors.",
    content: `Dalmatian cuisine is a celebration of fresh, simple ingredients prepared with care. The coast offers an abundance of fresh fish and seafood - try grilled brancin (sea bass) or orada (sea bream) drizzled with olive oil and served with blitva (Swiss chard and potatoes).

For meat lovers, pašticada (beef stewed in a rich wine sauce) and lamb peka (slow-cooked under a bell-shaped lid) are must-tries. Don't leave without sampling local specialties like Dalmatian pršut (dry-cured ham) and Paški sir (sheep cheese from Pag island).

Pair your meals with local wines - Plavac Mali is the region's premier red, while Pošip offers a refreshing white alternative. End your evening with rakija, a traditional fruit brandy.`,
    highlights: [
      "Fresh grilled fish - brancin, orada",
      "Peka - traditional slow-cooking method",
      "Local wines - Plavac Mali, Pošip",
      "Dalmatian pršut and Paški sir",
    ],
  },
  {
    id: 5,
    title: "Island Hopping Adventures",
    category: "activities",
    description: "Explore the stunning islands of Brač, Hvar, and Korčula by ferry or boat.",
    content: `The Dalmatian islands are easily accessible from Makarska and offer diverse experiences. Brač island, just an hour by ferry, is home to Zlatni Rat - the famous "Golden Horn" beach that changes shape with the currents. The island is also known for its white stone, used to build the White House in Washington.

Hvar island offers a mix of lavender fields, ancient towns, and vibrant nightlife. The historic town of Hvar rivals Dubrovnik in beauty but with a more relaxed atmosphere. 

Korčula, believed to be the birthplace of Marco Polo, features a perfectly preserved medieval old town. Consider booking a private boat tour to visit multiple islands in one day, including stops for swimming in hidden coves.`,
    highlights: [
      "Brač - Zlatni Rat beach, white stone quarries",
      "Hvar - lavender fields, historic town, nightlife",
      "Korčula - Marco Polo's birthplace, medieval walls",
      "Private boat tours available",
    ],
    distance: "1-2 hours by ferry",
  },
  {
    id: 6,
    title: "Practical Travel Tips",
    category: "practical",
    description: "Essential information to make your Dalmatian holiday smooth and enjoyable.",
    content: `**Getting Around:** Renting a car is highly recommended to explore the region. Roads are good but can be winding along the coast. Parking in town centers can be challenging in summer - look for paid parking lots outside the center.

**Weather:** Summer (June-August) brings temperatures of 25-35°C with minimal rain. The sea is warmest in August/September. Spring and fall offer pleasant weather with fewer crowds.

**Money:** Croatia uses the Euro. Cards are widely accepted, but carry some cash for small vendors and parking meters.

**Language:** Croatian is the official language, but English is widely spoken in tourist areas. Learning a few Croatian phrases is appreciated - "Hvala" (thank you) and "Dobar dan" (good day) go a long way.

**Swimming Safety:** Most beaches are pebble, so water shoes are recommended. Sea urchins can be present near rocks - watch where you step.`,
    highlights: [
      "Car rental recommended for exploration",
      "Euro currency, cards widely accepted",
      "English widely spoken in tourist areas",
      "Pack water shoes for pebble beaches",
    ],
  },
];

export const getTipsByCategory = (category: TravelTip['category']): TravelTip[] => {
  return travelTipsData.filter(tip => tip.category === category);
};

export const categories = [
  { id: 'beaches', label: 'Beaches', icon: '🏖️' },
  { id: 'nature', label: 'Nature', icon: '🌲' },
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'food', label: 'Food & Wine', icon: '🍷' },
  { id: 'activities', label: 'Activities', icon: '⛵' },
  { id: 'practical', label: 'Practical Info', icon: '📋' },
] as const;
