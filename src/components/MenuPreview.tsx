"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type MenuPreviewProps = { images: string[] };
type CarouselMotion = { animation: Animation; distance: number; kind: "auto" | "manual" };

const autoplaySpeed = 28;
const wrap = (value: number, width: number) => ((value % width) + width) % width;

export function MenuPreview({ images }: MenuPreviewProps) {
  const { t } = useLanguage();
  // Each repeated group must fill the viewport, even with a small image set.
  const cycleImages = images.length > 1
    ? Array.from({ length: Math.ceil(4 / images.length) }, () => images).flat()
    : images;
  // One group before and two after the active group keep every manual offset
  // covered throughout a full transform loop.
  const slides = images.length > 1 ? Array.from({ length: 4 }, () => cycleImages).flat() : images;
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef({ loopWidth: 0, slideOffset: 0, viewportWidth: 0 });
  const motionRef = useRef<CarouselMotion | null>(null);
  const programmaticScrollRef = useRef(0);
  const draggingRef = useRef(false);
  const touchingRef = useRef(false);
  const mouseDragRef = useRef<{ pointerId: number; lastX: number } | null>(null);
  const reducedMotionRef = useRef(false);
  const visibleRef = useRef(false);

  function motionOffset() {
    const motion = motionRef.current;
    const progress = motion?.animation.effect?.getComputedTiming().progress ?? 0;
    return motion ? progress * motion.distance : 0;
  }

  function updateScrollProgress() {
    const thumb = progressRef.current;
    if (!thumb) return;
    const { loopWidth, viewportWidth } = metricsRef.current;
    const thumbWidth = loopWidth ? Math.min(viewportWidth, viewportWidth * viewportWidth / loopWidth) : viewportWidth;
    const position = programmaticScrollRef.current + motionOffset();
    const progress = loopWidth ? wrap(position - loopWidth, loopWidth) / loopWidth : 0;
    thumb.style.width = `${thumbWidth}px`;
    thumb.style.transform = `translate3d(${progress * (viewportWidth - thumbWidth)}px, 0, 0)`;
  }

  function setScrollPosition(carousel: HTMLDivElement, position: number) {
    const { loopWidth } = metricsRef.current;
    carousel.scrollLeft = loopWidth ? loopWidth + wrap(position - loopWidth, loopWidth) : position;
    programmaticScrollRef.current = carousel.scrollLeft;
    updateScrollProgress();
  }

  function stopMotion() {
    const motion = motionRef.current;
    const carousel = carouselRef.current;
    if (!motion) return;
    const offset = motionOffset();
    motionRef.current = null;
    motion.animation.cancel();
    // Transfer the visual offset to native scrolling only when interaction starts.
    if (carousel) setScrollPosition(carousel, carousel.scrollLeft + offset);
  }

  function pauseForInteraction() {
    stopMotion();
  }

  function startAutoplay() {
    const track = trackRef.current;
    const { loopWidth } = metricsRef.current;
    if (!track || loopWidth <= 0 || motionRef.current || !visibleRef.current ||
      document.hidden || reducedMotionRef.current || draggingRef.current || touchingRef.current) return;

    const animation = track.animate([
      { transform: "translate3d(0, 0, 0)" },
      { transform: `translate3d(${-loopWidth}px, 0, 0)` }
    ], { duration: loopWidth / autoplaySpeed * 1000, iterations: Infinity, easing: "linear" });
    motionRef.current = { animation, distance: loopWidth, kind: "auto" };
  }

  function finishPointerInteraction() {
    if (!draggingRef.current && !mouseDragRef.current) return;
    draggingRef.current = false;
    mouseDragRef.current = null;
    startAutoplay();
  }

  function finishTouchInteraction() {
    if (!touchingRef.current) return;
    touchingRef.current = false;
    finishPointerInteraction();
    startAutoplay();
  }

  function handleScroll() {
    const carousel = carouselRef.current;
    if (!carousel) return;
    // Ignore the scroll event from our own one-time handoff or loop normalization.
    if (Math.abs(carousel.scrollLeft - programmaticScrollRef.current) < 1) return;
    pauseForInteraction();
    setScrollPosition(carousel, carousel.scrollLeft);
    startAutoplay();
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    const track = trackRef.current;
    if (!carousel || !track) return;

    function updateCarouselMetrics() {
      if (!carousel || !track) return;
      stopMotion();
      const first = track.children[0];
      const second = track.children[1];
      const nextCycle = images.length > 1 ? track.children[cycleImages.length] : null;
      const previousWidth = metricsRef.current.loopWidth;
      const progress = previousWidth ? wrap(carousel.scrollLeft - previousWidth, previousWidth) / previousWidth : 0;
      const loopWidth = first && nextCycle
        ? nextCycle.getBoundingClientRect().left - first.getBoundingClientRect().left
        : 0;
      metricsRef.current = {
        loopWidth,
        slideOffset: first && second ? second.getBoundingClientRect().left - first.getBoundingClientRect().left : 0,
        viewportWidth: carousel.clientWidth
      };
      setScrollPosition(carousel, loopWidth + progress * loopWidth);
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateMotionPreference() {
      pauseForInteraction();
      reducedMotionRef.current = motionPreference.matches;
    }
    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    updateCarouselMetrics();
    const resizeObserver = new ResizeObserver(updateCarouselMetrics);
    resizeObserver.observe(carousel);
    resizeObserver.observe(track);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    visibilityObserver.observe(carousel);

    function finishInteraction() {
      finishPointerInteraction();
      finishTouchInteraction();
    }
    function handleVisibility() {
      if (document.hidden) {
        finishInteraction();
        stopMotion();
      }
    }
    window.addEventListener("pointerup", finishPointerInteraction);
    window.addEventListener("pointercancel", finishPointerInteraction);
    window.addEventListener("mouseup", finishPointerInteraction);
    window.addEventListener("touchend", finishTouchInteraction);
    window.addEventListener("touchcancel", finishTouchInteraction);
    window.addEventListener("blur", finishInteraction);
    document.addEventListener("visibilitychange", handleVisibility);

    let frame: number;
    function tick() {
      const canAutoplay = visibleRef.current && !document.hidden && !reducedMotionRef.current &&
        !draggingRef.current && !touchingRef.current;
      if (canAutoplay) {
        startAutoplay();
      } else if (motionRef.current?.kind === "auto") {
        stopMotion();
      }
      updateScrollProgress();
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      stopMotion();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      motionPreference.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("pointerup", finishPointerInteraction);
      window.removeEventListener("pointercancel", finishPointerInteraction);
      window.removeEventListener("mouseup", finishPointerInteraction);
      window.removeEventListener("touchend", finishTouchInteraction);
      window.removeEventListener("touchcancel", finishTouchInteraction);
      window.removeEventListener("blur", finishInteraction);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [images.length, cycleImages.length]);

  function goToImage(direction: number) {
    const track = trackRef.current;
    const { slideOffset } = metricsRef.current;
    if (!track || !slideOffset) return;
    pauseForInteraction();
    const distance = direction * slideOffset;
    if (reducedMotionRef.current) {
      const carousel = carouselRef.current;
      if (carousel) setScrollPosition(carousel, carousel.scrollLeft + distance);
      return;
    }
    const animation = track.animate([
      { transform: "translate3d(0, 0, 0)" },
      { transform: `translate3d(${-distance}px, 0, 0)` }
    ], { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" });
    motionRef.current = { animation, distance, kind: "manual" };
    animation.onfinish = () => {
      if (motionRef.current?.animation !== animation) return;
      stopMotion();
      startAutoplay();
    };
  }

  return (
    <section className="@container scroll-mt-24 px-4 py-16 sm:px-8 sm:py-20 lg:py-24" id="menu">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(1.9rem,5.5vw,2.5rem)] font-semibold leading-[0.96] text-gold sm:leading-none">
            {t({ pt: "O NOSSO MENU", en: "OUR MENU" })}
          </h2>
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
              aria-label={t({ pt: "Imagens do menu. Desliza ou usa as setas para explorar.", en: "Menu images. Swipe or use the arrow keys to explore." })}
              className="@container cursor-grab overflow-x-auto overscroll-x-contain touch-auto select-none [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold [&::-webkit-scrollbar]:hidden"
              onFocus={pauseForInteraction}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  goToImage(event.key === "ArrowLeft" ? -1 : 1);
                }
              }}
              onPointerDown={(event) => {
                if (event.button !== 0) return;
                draggingRef.current = true;
                pauseForInteraction();
                if (event.pointerType === "mouse") {
                  mouseDragRef.current = { pointerId: event.pointerId, lastX: event.clientX };
                  event.currentTarget.setPointerCapture(event.pointerId);
                }
              }}
              onPointerMove={(event) => {
                const drag = mouseDragRef.current;
                if (!drag || drag.pointerId !== event.pointerId) return;
                event.preventDefault();
                const distance = drag.lastX - event.clientX;
                drag.lastX = event.clientX;
                pauseForInteraction();
                setScrollPosition(event.currentTarget, event.currentTarget.scrollLeft + distance);
              }}
              onPointerUp={finishPointerInteraction}
              onPointerCancel={finishPointerInteraction}
              onLostPointerCapture={finishPointerInteraction}
              onTouchStart={() => { touchingRef.current = true; pauseForInteraction(); }}
              onTouchEnd={finishTouchInteraction}
              onTouchCancel={finishTouchInteraction}
              onScroll={handleScroll}
              onWheel={pauseForInteraction}
              ref={carouselRef}
              role="region"
              style={{ WebkitOverflowScrolling: "touch" }}
              tabIndex={0}
            >
              <div className="w-max">
                <div className="flex w-max gap-4 will-change-transform sm:gap-5" ref={trackRef}>
                  {slides.map((image, index) => (
                    <div
                      aria-hidden={images.length > 1 && (index < cycleImages.length || index >= cycleImages.length * 2) ? true : undefined}
                      className="w-[72cqw] flex-none overflow-hidden rounded-lg border border-gold/70 bg-rice/[0.045] sm:w-[46cqw] lg:w-[30cqw]"
                      key={`${index}-${image}`}
                    >
                      <img
                        alt=""
                        className="aspect-[0.92] h-full w-full select-none object-cover sm:aspect-[0.94] lg:aspect-[0.9]"
                        draggable={false}
                        loading={index === cycleImages.length || index === 0 ? "eager" : "lazy"}
                        src={image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {images.length > 1 && (
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-3 sm:flex sm:px-6">
                <CarouselButton label={t({ pt: "Imagem anterior do menu", en: "Previous menu image" })} onClick={() => goToImage(-1)}>
                  <ChevronLeft size={19} />
                </CarouselButton>
                <CarouselButton label={t({ pt: "Próxima imagem do menu", en: "Next menu image" })} onClick={() => goToImage(1)}>
                  <ChevronRight size={19} />
                </CarouselButton>
              </div>
            )}
          </div>
          <div className="relative mt-8 h-1 w-full overflow-hidden bg-rice/22" aria-hidden="true">
            <div className="absolute top-0 h-full bg-rice" ref={progressRef} style={{ left: 0, width: "100%" }} />
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

function CarouselButton({ children, label, onClick }: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="icon-button pointer-events-auto"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
