"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const menuImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=84",
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=84"
];

export function MenuPreview() {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateSlideOffset() {
      const track = trackRef.current;
      const firstSlide = track?.firstElementChild;

      if (!track || !(firstSlide instanceof HTMLElement)) {
        return;
      }

      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;

      setSlideOffset(firstSlide.offsetWidth + gap);
    }

    updateSlideOffset();

    const resizeObserver = new ResizeObserver(updateSlideOffset);

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  function goToImage(direction: number) {
    setActiveImage((index) => (index + direction + menuImages.length) % menuImages.length);
  }

  return (
    <section className="@container px-4 py-16 sm:px-8 sm:py-20 lg:py-24" id="menu">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            {/* <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
              {t({ pt: "", en: "" })}
            </p> */}
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(1.9rem,5.5vw,2.5rem)] font-semibold leading-[0.96] text-gold sm:leading-none">
              {t({
                pt: "O NOSSO MENU",
                en: "OUR MENU"
              })}
            </h2>
          </div>
          <Link
            className="hidden min-h-12 items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-rice/72 transition hover:text-rice md:inline-flex md:min-h-0"
            href="/menu"
          >
            {t({ pt: "Explorar menu", en: "Explore menu" })}
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="relative mt-8 overflow-hidden sm:mt-10">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out sm:gap-5"
            ref={trackRef}
            style={{ transform: `translateX(-${activeImage * slideOffset}px)` }}
          >
            {menuImages.map((image, index) => (
              <div
                className="min-w-[76%] overflow-hidden rounded-lg border border-gold/70 bg-rice/[0.045] sm:min-w-[46%] lg:min-w-[30%]"
                key={image}
              >
                <img
                  alt=""
                  className="aspect-[0.92] h-full w-full object-cover sm:aspect-[0.94] lg:aspect-[0.9]"
                  loading={index === 0 ? "eager" : "lazy"}
                  src={image}
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-6">
            <CarouselButton label="Previous menu image" onClick={() => goToImage(-1)}>
              <ChevronLeft size={19} />
            </CarouselButton>
            <CarouselButton label="Next menu image" onClick={() => goToImage(1)}>
              <ChevronRight size={19} />
            </CarouselButton>
          </div>

          <div className="mx-auto mt-8 h-1 max-w-3xl bg-rice/22">
            <div
              className="h-full bg-rice transition-all duration-500"
              style={{
                width: `${100 / menuImages.length}%`,
                transform: `translateX(${activeImage * 100}%)`
              }}
            />
          </div>

          <Link
            className="mt-6 inline-flex min-h-12 items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-rice/72 transition hover:text-rice md:hidden"
            href="/menu"
          >
            {t({ pt: "Explorar menu", en: "Explore menu" })}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  children,
  label,
  onClick
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="pointer-events-auto grid size-12 place-items-center rounded-full border border-rice/18 bg-night/62 text-rice shadow-lg backdrop-blur transition hover:scale-105 hover:border-gold hover:text-gold"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
