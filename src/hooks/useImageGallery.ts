import { useEffect, useState } from "react";
import { GalleryImages, ImageManifest } from "@/types/images";

export const useImageGallery = (basePath: string) => {
  const [images, setImages] = useState<GalleryImages | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!basePath) return;

    const load = async () => {
      try {
        const res = await fetch(`${basePath}/manifest.json`);
        if (!res.ok) return;

        const manifest: ImageManifest = await res.json();

        setImages({
          mainImage: `${basePath}/${manifest.main}`,
          galleryImages: manifest.gallery.map(
            (f) => `${basePath}/${f}`
          ),
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [basePath]);

  return { images, loading };
};
