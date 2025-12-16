import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Bed, Bath, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import LocationInfo from "@/components/LocationInfo";
import ReviewCard from "@/components/ReviewCard";
import { getApartmentBySlug } from "@/data/apartments";
import { getReviewsByApartmentId, getAverageRating, getReviewCount } from "@/data/reviews";
import { toast } from "@/hooks/use-toast";

const ApartmentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const apartment = getApartmentBySlug(slug || "");

  if (!apartment) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Apartment not found</h1>
          <Link to="/#apartments">
            <Button>Back to Apartments</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const reviews = getReviewsByApartmentId(apartment.id);
  const averageRating = getAverageRating(apartment.id);
  const reviewCount = getReviewCount(apartment.id);

  const handleBooking = () => {
    toast({
      title: "Booking Request",
      description: `Thank you for your interest in ${apartment.name}. Please contact us to complete your booking.`,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link to="/#apartments" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Apartments
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                {apartment.name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                {apartment.location.city}, {apartment.location.country}
                {reviewCount > 0 && (
                  <>
                    <span className="text-border">•</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      {averageRating} ({reviewCount} reviews)
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-3xl font-bold text-primary">€{apartment.price}</p>
              <p className="text-sm text-muted-foreground">/ night</p>
            </div>
          </div>

          {/* Main image */}
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl mb-8">
            <img
              src={apartment.image}
              alt={apartment.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick info */}
              <div className="flex flex-wrap gap-6 p-6 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{apartment.guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{apartment.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{apartment.bathrooms} bathrooms</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                  About this apartment
                </h2>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {apartment.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {apartment.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-pine" />
                      <span className="text-muted-foreground text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <LocationInfo apartment={apartment} />

              {/* Reviews */}
              {reviews.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                      Guest Reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-foreground">{averageRating}</span>
                      <span className="text-muted-foreground">({reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Calendar & Booking */}
            <div className="space-y-6">
              <AvailabilityCalendar apartment={apartment} />

              <Button size="lg" className="w-full" onClick={handleBooking}>
                Request Booking
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Contact us for availability and booking
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ApartmentDetail;
