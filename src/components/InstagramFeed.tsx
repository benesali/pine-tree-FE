import { Instagram, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const instagramPosts = [
  {
    id: "1",
    image: "/instagram/srima-sunset.jpg",
    alt: "Sunset in Srima, Dalmatia",
    url: "https://instagram.com/pinetreedalmatia",
  },
  {
    id: "2",
    image: "/instagram/adriatic-sea.jpg",
    alt: "Crystal clear Adriatic sea",
    url: "https://instagram.com/pinetreedalmatia",
  },
  {
    id: "3",
    image: "/instagram/apartment-terrace.jpg",
    alt: "Terrace view from Pine Tree apartment",
    url: "https://instagram.com/pinetreedalmatia",
  },
  {
    id: "4",
    image: "/instagram/pine-trees.jpg",
    alt: "Pine trees by the sea",
    url: "https://instagram.com/pinetreedalmatia",
  },
  {
    id: "5",
    image: "/instagram/srima-walk.jpg",
    alt: "Evening walk in Srima",
    url: "https://instagram.com/pinetreedalmatia",
  },
  {
    id: "6",
    image: "/instagram/apartment-interior.jpg",
    alt: "Modern apartment interior",
    url: "https://instagram.com/pinetreedalmatia",
  },
];

const InstagramFeed = () => {
  const { locale } = useLanguage();

  const texts: Record<string, { title: string; subtitle: string }> = {
    en: {
      title: "Moments from Dalmatia",
      subtitle: "A glimpse of life around Pine Tree Dalmatia",
    },
    cs: {
      title: "Momenty z Dalmácie",
      subtitle: "Malá ochutnávka atmosféry kolem Pine Tree Dalmatia",
    },
    de: {
      title: "Momente aus Dalmatien",
      subtitle: "Ein kleiner Einblick in die Atmosphäre von Pine Tree Dalmatia",
    },
  };

  const content = texts[locale] ?? texts.en;

  return (
    <section className="py-16 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header – velmi jemný */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-muted-foreground mb-3">
            <Instagram className="h-2.5 w-2.5 relative top-[1px]" />
            <span className="text-xs">@pinetreedalmatia</span>
          </div>

          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2">
            {content.title}
          </h2>

          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Grid – klidná mozaika */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-10">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Jemný hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="h-3 w-3 text-white/90" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer CTA – skoro jako poznámka */}
        <div className="text-center">
          <a
            href="https://instagram.com/pinetreedalmatia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Follow on Instagram
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
