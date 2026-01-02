import { Instagram } from "lucide-react";

const instagramPosts = [
  {
    id: "1",
    image: "/instagram/srima-sunset.jpg",
    url: "https://www.instagram.com/p/DEseQVcte1S/",
  },
  {
    id: "2",
    image: "/instagram/adriatic-sea.jpg",
    url: "https://www.instagram.com/pinetreedalmatia/",
  },
  {
    id: "3",
    image: "/instagram/apartment-terrace.jpg",
    url: "https://www.instagram.com/pinetreedalmatia/",
  },
  {
    id: "4",
    image: "/instagram/pine-trees.jpg",
    url: "https://www.instagram.com/pinetreedalmatia/",
  },
];

const InstagramStrip = () => {
  return (
    <div className="border-t py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-6">
          {/* Text */}
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            More moments from Dalmatia
          </span>

          {/* Thumbnails */}
          <div className="flex items-center gap-3">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-14 h-14 overflow-hidden rounded-lg"
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
              </a>
            ))}
          </div>

          {/* Profile link */}
          <a
            href="https://instagram.com/pinetreedalmatia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            <Instagram className="h-3 w-3" />
            @pinetreedalmatia
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstagramStrip;
