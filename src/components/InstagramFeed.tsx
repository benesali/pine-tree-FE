import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample Instagram-style posts (in a real app, these would come from Instagram API)
const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    alt: "Sunset over Dalmatian coast",
    likes: 234,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1499793983394-e58f8b4c4909?w=400&h=400&fit=crop",
    alt: "Crystal clear Adriatic waters",
    likes: 189,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=400&fit=crop",
    alt: "Traditional Croatian cuisine",
    likes: 156,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=400&fit=crop",
    alt: "Cozy apartment terrace view",
    likes: 312,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=400&h=400&fit=crop",
    alt: "Pine trees and seaside",
    likes: 278,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    alt: "Modern apartment interior",
    likes: 145,
  },
];

const InstagramFeed = () => {
  const { locale } = useLanguage();

  const titles: Record<string, { title: string; subtitle: string; follow: string }> = {
    en: {
      title: "Follow Our Journey",
      subtitle: "See the latest from Pine Tree Dalmatia on Instagram",
      follow: "Follow Us",
    },
    cs: {
      title: "Sledujte naši cestu",
      subtitle: "Podívejte se na nejnovější příspěvky z Pine Tree Dalmatia na Instagramu",
      follow: "Sledovat",
    },
    de: {
      title: "Folgen Sie unserer Reise",
      subtitle: "Sehen Sie das Neueste von Pine Tree Dalmatia auf Instagram",
      follow: "Folgen",
    },
  };

  const content = titles[locale] || titles.en;

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Instagram className="h-6 w-6 text-primary" />
            <span className="text-primary font-medium">@pinetreedalmatia</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            {content.title}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/pinetreedalmatia"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-primary-foreground text-center">
                  <Instagram className="h-6 w-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">{post.likes} ❤️</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="outline" className="gap-2">
            <a
              href="https://instagram.com/pinetreedalmatia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
              {content.follow}
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
