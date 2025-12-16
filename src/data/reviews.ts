export interface Review {
  id: number;
  guestName: string;
  country: string;
  apartmentId: number;
  apartmentName: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  stayDuration: string;
  verified: boolean;
}

export const reviewsData: Review[] = [
  {
    id: 1,
    guestName: "Thomas M.",
    country: "Germany",
    apartmentId: 1,
    apartmentName: "Sea View Deluxe",
    rating: 5,
    date: "August 2024",
    title: "Perfect holiday apartment!",
    content: "We had an amazing two-week stay at the Sea View Deluxe. The views from the terrace are absolutely stunning - we watched the sunset every evening. The apartment was spotlessly clean and had everything we needed. The hosts were incredibly helpful with local recommendations. Will definitely return!",
    stayDuration: "2 weeks",
    verified: true,
  },
  {
    id: 2,
    guestName: "Marie L.",
    country: "France",
    apartmentId: 2,
    apartmentName: "Cozy Studio",
    rating: 5,
    date: "July 2024",
    title: "Romantic getaway",
    content: "The perfect studio for a couple! Small but perfectly formed, with everything you need. The balcony view is incredible and the location in the old town meant we could walk everywhere. The hosts left us a bottle of local wine which was a lovely touch.",
    stayDuration: "1 week",
    verified: true,
  },
  {
    id: 3,
    guestName: "Jan K.",
    country: "Czech Republic",
    apartmentId: 3,
    apartmentName: "Family Villa",
    rating: 5,
    date: "August 2024",
    title: "Best family vacation ever!",
    content: "The villa exceeded all our expectations. The kids loved the pool and garden, while we appreciated the peace and quiet. The kitchen was well-equipped for cooking, and the BBQ area was perfect for evening dinners. The pine trees provide lovely shade during hot afternoons.",
    stayDuration: "10 days",
    verified: true,
  },
  {
    id: 4,
    guestName: "Emma W.",
    country: "United Kingdom",
    apartmentId: 1,
    apartmentName: "Sea View Deluxe",
    rating: 4,
    date: "September 2024",
    title: "Great location and views",
    content: "Lovely apartment with fantastic sea views. Very clean and comfortable. The only minor issue was the noise from a nearby bar on Saturday night, but otherwise perfect. The beach nearby is beautiful and not too crowded in September.",
    stayDuration: "1 week",
    verified: true,
  },
  {
    id: 5,
    guestName: "Petra S.",
    country: "Austria",
    apartmentId: 2,
    apartmentName: "Cozy Studio",
    rating: 5,
    date: "June 2024",
    title: "Wonderful stay in Makarska",
    content: "We absolutely loved our stay! The studio is beautifully decorated and very comfortable. The location is perfect - right in the heart of the old town but still quiet at night. The hosts were very responsive and gave us great tips for restaurants and beaches.",
    stayDuration: "5 days",
    verified: true,
  },
  {
    id: 6,
    guestName: "Michael R.",
    country: "Netherlands",
    apartmentId: 3,
    apartmentName: "Family Villa",
    rating: 5,
    date: "July 2024",
    title: "Absolutely stunning property",
    content: "This villa is a hidden gem! The private pool was a highlight for our family, and the views from the terrace are breathtaking. The hosts thought of everything - from beach towels to children's games. We'll definitely be back next summer!",
    stayDuration: "2 weeks",
    verified: true,
  },
];

export const getReviewsByApartmentId = (apartmentId: number): Review[] => {
  return reviewsData.filter(review => review.apartmentId === apartmentId);
};

export const getAverageRating = (apartmentId: number): number => {
  const reviews = getReviewsByApartmentId(apartmentId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const getReviewCount = (apartmentId: number): number => {
  return getReviewsByApartmentId(apartmentId).length;
};
