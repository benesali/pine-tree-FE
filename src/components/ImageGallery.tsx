import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GalleryImages } from "@/types/images";
import { imagePathSize } from "@/lib/imagePathSize";

interface Props extends GalleryImages {
  alt?: string;
  variant?: "detail" | "card";
}

const ImageGallery = ({
  mainImage,
  galleryImages,
  alt = "",
  variant = "detail",
}: Props) => {
  const isCard = variant === "card";
  const images = [mainImage, ...galleryImages];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : i
    );
  const next = () =>
    setOpenIndex((i) =>
      i !== null ? (i + 1) % images.length : i
    );

  /* ------------------------------------------------------------ */
  /* CARD VARIANT (listing)                                       */
  /* ------------------------------------------------------------ */

  if (isCard) {
    return (
      <div className="grid grid-cols-3 gap-2 aspect-[4/3] overflow-hidden rounded-xl">
        {/* HERO (card) */}
        <img
          src={imagePathSize(mainImage, 1280)}
          alt={alt}
          width={400}
          height={300}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="col-span-2 h-full w-full object-cover"
        />

        {/* THUMBS */}
        <div className="grid grid-rows-2 gap-2">
          {galleryImages.slice(0, 2).map((img, i) => (
            <img
              key={i}
              src={imagePathSize(img, 640)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------ */
  /* DETAIL VARIANT                                               */
  /* ------------------------------------------------------------ */

  return (
    <>
      {/* GRID */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden">

          {/* HERO – jediný LCP kandidát */}
          <button
            onClick={() => setOpenIndex(0)}
            className="md:col-span-2 md:row-span-2 aspect-[16/10] overflow-hidden"
          >
            <img
              src={imagePathSize(mainImage, 1280)}
              alt={alt}
              width={570}
              height={570}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>

          {/* THUMBNAILS */}
          {galleryImages.slice(0, 3).map((img, i) => {
            const index = i + 1;
            const remaining = galleryImages.length - 3;

            return (
              <button
                key={i}
                onClick={() => setOpenIndex(index)}
                className="relative aspect-[16/10] overflow-hidden"
              >
                <img
                  src={imagePathSize(img, 640)}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

                {/* +X OVERLAY */}
                {i === 2 && remaining > 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      +{remaining} photos
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* CLOSE */}
          <button
            onClick={close}
            className="absolute top-6 right-6 text-white opacity-80 hover:opacity-100"
          >
            <X className="h-6 w-6" />
          </button>

          {/* LEFT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="hidden md:flex absolute left-6 text-white opacity-70 hover:opacity-100"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* IMAGE */}
          <img
            src={imagePathSize(images[openIndex], 1280)}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
          />

          {/* RIGHT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="hidden md:flex absolute right-6 text-white opacity-70 hover:opacity-100"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* COUNTER */}
          <div className="absolute bottom-6 text-sm text-white/70">
            {openIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
