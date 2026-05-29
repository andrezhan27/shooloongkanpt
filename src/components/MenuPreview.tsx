"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const menuImages = [
  "/images/menu/menu-01.webp",
  "/images/menu/menu-02.webp",
  "/images/menu/menu-03.webp",
  "/images/menu/menu-04.webp",
  "/images/menu/menu-05.webp",
  "/images/menu/menu-06.webp",
  "/images/menu/menu-07.webp",
  "/images/menu/menu-08.webp"
];

export function MenuPreview() {
  const { t } = useLanguage();
  const [maxSlideIndex, setMaxSlideIndex] = useState(menuImages.length - 1);
  const [scrollProgress, setScrollProgress] = useState({ thumbLeft: 0, thumbWidth: 100 });
  const [slideOffset, setSlideOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    function updateCarouselMetrics() {
      const carousel = carouselRef.current;
      const firstSlide = carousel?.firstElementChild;

      if (!carousel || !(firstSlide instanceof HTMLElement)) {
        return;
      }

      const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
      const nextSlideOffset = firstSlide.offsetWidth + gap;
      const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);

      setSlideOffset(nextSlideOffset);
      setMaxSlideIndex(
        Math.min(menuImages.length - 1, nextSlideOffset === 0 ? 0 : Math.ceil(maxScrollLeft / nextSlideOffset))
      );
      updateScrollProgress(carousel);
    }

    updateCarouselMetrics();

    const resizeObserver = new ResizeObserver(updateCarouselMetrics);

    if (carouselRef.current) {
      resizeObserver.observe(carouselRef.current);

      const firstSlide = carouselRef.current.firstElementChild;

      if (firstSlide instanceof HTMLElement) {
        resizeObserver.observe(firstSlide);
      }
    }

    return () => {
      resizeObserver.disconnect();

      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  function updateScrollProgress(carousel: HTMLDivElement, scrollLeft = carousel.scrollLeft) {
    const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const thumbWidth = carousel.scrollWidth === 0
      ? 100
      : Math.min(100, Math.max(8, (carousel.clientWidth / carousel.scrollWidth) * 100));
    const thumbLeft = maxScrollLeft === 0
      ? 0
      : (scrollLeft / maxScrollLeft) * (100 - thumbWidth);

    setScrollProgress({ thumbLeft, thumbWidth });
  }

  function goToImage(direction: number) {
    const carousel = carouselRef.current;

    if (!carousel || slideOffset === 0) {
      return;
    }

    const currentIndex = Math.min(
      maxSlideIndex,
      Math.max(0, Math.round(carousel.scrollLeft / slideOffset))
    );
    const nextIndex = currentIndex + direction < 0
      ? maxSlideIndex
      : currentIndex + direction > maxSlideIndex
        ? 0
        : currentIndex + direction;
    const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const targetScrollLeft = Math.min(maxScrollLeft, nextIndex * slideOffset);

    animateScrollTo(carousel, targetScrollLeft);
  }

  function animateScrollTo(carousel: HTMLDivElement, targetScrollLeft: number) {
    if (animationFrame.current !== null) {
      window.cancelAnimationFrame(animationFrame.current);
    }

    const startScrollLeft = carousel.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    const duration = 520;
    const startTime = window.performance.now();

    function tick(now: number) {
      const elapsed = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const nextScrollLeft = startScrollLeft + distance * eased;

      carousel.scrollLeft = nextScrollLeft;
      updateScrollProgress(carousel, nextScrollLeft);

      if (elapsed < 1) {
        animationFrame.current = window.requestAnimationFrame(tick);
        return;
      }

      animationFrame.current = null;
    }

    animationFrame.current = window.requestAnimationFrame(tick);
  }

  function handleScroll() {
    const carousel = carouselRef.current;

    if (!carousel || slideOffset === 0 || scrollFrame.current !== null) {
      return;
    }

    scrollFrame.current = window.requestAnimationFrame(() => {
      updateScrollProgress(carousel);
      scrollFrame.current = null;
    });
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

        <div className="mt-8 sm:mt-10">
          <div className="relative">
            <div
              className="flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain scroll-px-4 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] sm:snap-none sm:gap-5 [&::-webkit-scrollbar]:hidden"
              onScroll={handleScroll}
              ref={carouselRef}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {menuImages.map((image, index) => (
                <div
                  className="min-w-[72%] snap-start overflow-hidden rounded-lg border border-gold/70 bg-rice/[0.045] sm:min-w-[46%] lg:min-w-[30%]"
                  key={image}
                >
                  <img
                    alt=""
                    className="aspect-[0.92] h-full w-full select-none object-cover sm:aspect-[0.94] lg:aspect-[0.9]"
                    draggable={false}
                    loading={index === 0 ? "eager" : "lazy"}
                    src={image}
                  />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-3 sm:flex sm:px-6">
              <CarouselButton label="Previous menu image" onClick={() => goToImage(-1)}>
                <ChevronLeft size={19} />
              </CarouselButton>
              <CarouselButton label="Next menu image" onClick={() => goToImage(1)}>
                <ChevronRight size={19} />
              </CarouselButton>
            </div>
          </div>

          <div className="relative mt-8 h-1 w-full overflow-hidden bg-rice/22">
            <div
              className="absolute top-0 h-full bg-rice"
              style={{
                left: `${scrollProgress.thumbLeft}%`,
                width: `${scrollProgress.thumbWidth}%`
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
