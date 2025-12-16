import { Star, CheckCircle } from "lucide-react";
import { Review } from "@/data/reviews";

interface ReviewCardProps {
  review: Review;
  showApartment?: boolean;
}

const ReviewCard = ({ review, showApartment = false }: ReviewCardProps) => {
  return (
    <article className="bg-card rounded-xl border border-border p-6 hover:shadow-card transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground">{review.guestName}</h4>
            {review.verified && (
              <CheckCircle className="h-4 w-4 text-pine" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{review.country}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Apartment info */}
      {showApartment && (
        <p className="text-sm text-primary font-medium mb-2">
          {review.apartmentName} • {review.stayDuration}
        </p>
      )}

      {/* Review content */}
      <h5 className="font-medium text-foreground mb-2">{review.title}</h5>
      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
        {review.content}
      </p>

      {/* Meta */}
      <p className="text-xs text-muted-foreground">
        {review.date}
      </p>
    </article>
  );
};

export default ReviewCard;
