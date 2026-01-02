import { GalleryImages } from "@/types/images";

interface Props extends GalleryImages {
  alt?: string;
}

const ApartmentPreviewGallery = ({
  mainImage,
  galleryImages,
  alt = "",
}: Props) => {
  const previews = [mainImage, ...galleryImages].slice(0, 4);

  return (
    <div className="flex gap-3">
      {previews.map((img, i) => (
        <div
          key={i}
          className="relative w-20 h-20"
        >
          <img
            src={img}
            alt={alt}
            loading="lazy"
            className="
              w-full h-full object-cover rounded-lg
              transition-all duration-300
              hover:scale-[1.6]
              hover:-translate-y-1
              hover:z-20
              hover:shadow-xl
            "
          />
        </div>
      ))}
    </div>
  );
};

export default ApartmentPreviewGallery;
