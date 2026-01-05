import { Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import { reviewsData } from "@/data/reviews";
import { apartmentsData } from "@/data/apartments";
import InstagramStrip from "@/components/InstagramStrip";

const Reviews = () => {
  // Calculate overall stats
  const totalReviews = reviewsData.length;
  const averageRating = totalReviews > 0
    ? Math.round((reviewsData.reduce((acc, r) => acc + r.rating, 0) / totalReviews) * 10) / 10
    : 0;

  return (
    <main className="min-h-screen bg-background">

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Guest Reviews
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Read what our guests have to say about their stay at Pine Tree Dalmatia
            </p>

            {/* Stats */}
            <div className="inline-flex items-center gap-4 bg-card rounded-full px-8 py-4 border border-border">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                <span className="text-2xl font-bold text-foreground">{averageRating}</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-left">
                <p className="text-foreground font-medium">{totalReviews} Reviews</p>
                <p className="text-sm text-muted-foreground">from verified guests</p>
              </div>
            </div>
          </div>

          {/* Filter by apartment */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              All Reviews
            </button>
            {apartmentsData.map((apt) => (
              <button
                key={apt.id}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                {apt.name}
              </button>
            ))}
          </div>

          {/* Reviews grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsData.map((review) => (
              <ReviewCard key={review.id} review={review} showApartment />
            ))}
          </div>
        </div>
      </div>

    </main>
  );
};

export default Reviews;
