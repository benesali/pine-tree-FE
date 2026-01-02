import { useState } from "react";
import { MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { travelTipsData, categories, TravelTip } from "@/data/travelTips";
import { cn } from "@/lib/utils";
import InstagramStrip from "@/components/InstagramStrip";

const TravelTips = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const filteredTips = selectedCategory
    ? travelTipsData.filter((tip) => tip.category === selectedCategory)
    : travelTipsData;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Travel Tips
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Make the most of your Dalmatian adventure with our insider tips and recommendations
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              All Tips
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Tips grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTips.map((tip) => (
              <TipCard
                key={tip.id}
                tip={tip}
                isExpanded={expandedTip === tip.id}
                onToggle={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <InstagramStrip />  

      <Footer />
    </main>
  );
};

interface TipCardProps {
  tip: TravelTip;
  isExpanded: boolean;
  onToggle: () => void;
}

const TipCard = ({ tip, isExpanded, onToggle }: TipCardProps) => {
  const category = categories.find((c) => c.id === tip.category);

  return (
    <article className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-card transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category?.icon}</span>
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {tip.title}
              </h3>
              {tip.distance && (
                <p className="text-sm text-primary flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {tip.distance}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4">{tip.description}</p>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            <div className="prose prose-sm max-w-none text-muted-foreground mb-4">
              {tip.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-3 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Highlights</h4>
              <ul className="space-y-1">
                {tip.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="mt-4 text-primary font-medium text-sm hover:underline"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      </div>
    </article>
  );
};

export default TravelTips;
