"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type MenuPreviewProps = { images: string[] };

const autoplaySpeed = 28;
const idleDelay = 650;
const wrap = (value: number, width: number) => ((value % width) + width) % width;

export function MenuPreview({ images }: MenuPreviewProps) {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  // Each repeated group must fill the viewport, even with a small image set.
  const cycleImages = images.length > 1
    ? Array.from({ length: Math.ceil(4 / images.length) }, () => images).flat()
    : images;
  const slides = images.length > 1 ? [...cycleImages, ...cycleImages, ...cycleImages] : images;
  const carouselRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef({ loopWidth: 0, slideOffset: 0 });
  const animationFrame = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const touchingRef = useRef(false);
  const mouseDragRef = useRef<{ pointerId: number; lastX: number } | null>(null);
  const reducedMotionRef = useRef(false);
  const resumeAt = useRef(0);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  function updateScrollProgress(carousel: HTMLDivElement) {
    const thumb = progressRef.current;
    if (!thumb) return;
    const { loopWidth } = metricsRef.current;
    const thumbWidth = loopWidth ? Math.min(100, (carousel.clientWidth / loopWidth) * 100) : 100;
    const progress = loopWidth ? wrap(carousel.scrollLeft - loopWidth, loopWidth) / loopWidth : 0;
    thumb.style.width = `${thumbWidth}%`;
    thumb.style.left = `${progress * (100 - thumbWidth)}%`;
  }

  function setScrollPosition(carousel: HTMLDivElement, position: number) {
    const { loopWidth } = metricsRef.current;
    carousel.scrollLeft = loopWidth ? loopWidth + wrap(position - loopWidth, loopWidth) : position;
    updateScrollProgress(carousel);
  }

  function pauseForInteraction() {
    resumeAt.current = performance.now() + idleDelay;
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  }

  function finishPointerInteraction() {
    if (!draggingRef.current && !mouseDragRef.current) return;
    draggingRef.current = false;
    mouseDragRef.current = null;
    resumeAt.current = performance.now() + idleDelay;
  }

  function finishTouchInteraction() {
    if (!touchingRef.current) return;
    touchingRef.current = false;
    finishPointerInteraction();
    resumeAt.current = performance.now() + idleDelay;
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    function updateCarouselMetrics() {
      if (!carousel) return;
      const first = carousel.children[0];
      const second = carousel.children[1];
      const nextCycle = images.length > 1 ? carousel.children[cycleImages.length] : null;
      const previousWidth = metricsRef.current.loopWidth;
      const progress = previousWidth ? wrap(carousel.scrollLeft - previousWidth, previousWidth) / previousWidth : 0;
      const loopWidth = first && nextCycle
        ? nextCycle.getBoundingClientRect().left - first.getBoundingClientRect().left
        : 0;
      metricsRef.current = {
        loopWidth,
        slideOffset: first && second ? second.getBoundingClientRect().left - first.getBoundingClientRect().left : 0
      };
      setScrollPosition(carousel, loopWidth + progress * loopWidth);
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateMotionPreference() {
      reducedMotionRef.current = motionPreference.matches;
      pausedRef.current = motionPreference.matches;
      setIsPaused(motionPreference.matches);
    }
    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    updateCarouselMetrics();
    const resizeObserver = new ResizeObserver(updateCarouselMetrics);
    resizeObserver.observe(carousel);

    let isVisible = false;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(carousel);

    function finishInteraction() {
      finishPointerInteraction();
      finishTouchInteraction();
    }
    window.addEventListener("pointerup", finishPointerInteraction);
    window.addEventListener("pointercancel", finishPointerInteraction);
    window.addEventListener("mouseup", finishPointerInteraction);
    window.addEventListener("touchend", finishTouchInteraction);
    window.addEventListener("touchcancel", finishTouchInteraction);
    window.addEventListener("blur", finishInteraction);

    let previousTime = 0;
    let position = carousel.scrollLeft;
    let lastAppliedPosition = carousel.scrollLeft;
    let frame: number;
    function tick(now: number) {
      const elapsed = previousTime ? Math.min(now - previousTime, 50) : 0;
      previousTime = now;
      if (carousel && isVisible && !document.hidden && !pausedRef.current &&
        !draggingRef.current && !touchingRef.current && now >= resumeAt.current &&
        animationFrame.current === null && metricsRef.current.loopWidth > 0) {
        // Preserve subpixel movement on browsers that round scrollLeft.
        if (Math.abs(carousel.scrollLeft - lastAppliedPosition) > 1) position = carousel.scrollLeft;
        position += autoplaySpeed * elapsed / 1000;
        setScrollPosition(carousel, position);
        lastAppliedPosition = carousel.scrollLeft;
        const { loopWidth } = metricsRef.current;
        position = loopWidth + wrap(position - loopWidth, loopWidth);
      } else if (carousel) {
        position = carousel.scrollLeft;
        lastAppliedPosition = carousel.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      motionPreference.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("pointerup", finishPointerInteraction);
      window.removeEventListener("pointercancel", finishPointerInteraction);
      window.removeEventListener("mouseup", finishPointerInteraction);
      window.removeEventListener("touchend", finishTouchInteraction);
      window.removeEventListener("touchcancel", finishTouchInteraction);
      window.removeEventListener("blur", finishInteraction);
    };
  }, [images.length, cycleImages.length]);

  function goToImage(direction: number) {
    const carousel = carouselRef.current;
    const { slideOffset } = metricsRef.current;
    if (!carousel || !slideOffset) return;
    pauseForInteraction();
    const start = carousel.scrollLeft;
    if (reducedMotionRef.current) {
      setScrollPosition(carousel, start + direction * slideOffset);
      return;
    }
    const startTime = performance.now();
    function tick(now: number) {
      if (!carousel) return;
      const elapsed = Math.min(1, (now - startTime) / 520);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setScrollPosition(carousel, start + direction * slideOffset * eased);
      animationFrame.current = elapsed < 1 ? requestAnimationFrame(tick) : null;
    }
    animationFrame.current = requestAnimationFrame(tick);
  }

  return (
    <section className="@container scroll-mt-24 px-4 py-16 sm:px-8 sm:py-20 lg:py-24" id="menu">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(1.9rem,5.5vw,2.5rem)] font-semibold leading-[0.96] text-gold sm:leading-none">
            {t({ pt: "O NOSSO MENU", en: "OUR MENU" })}
          </h2>
          <div className="flex shrink-0 items-center gap-5">
            <Link
              className="hidden min-h-12 items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-rice/72 transition hover:text-rice md:inline-flex md:min-h-0"
              href="/menu"
            >
              {t({ pt: "Explorar menu", en: "Explore menu" })}
              <ArrowUpRight size={17} />
            </Link>
            {images.length > 1 && (
              <CarouselButton
                label={isPaused ? t({ pt: "Retomar movimento do menu", en: "Resume menu movement" }) : t({ pt: "Pausar movimento do menu", en: "Pause menu movement" })}
                onClick={() => setIsPaused((paused) => !paused)}
              >
                {isPaused ? <Play size={17} /> : <Pause size={17} />}
              </CarouselButton>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="relative">
            <div
              aria-label={t({ pt: "Imagens do menu. Desliza ou usa as setas para explorar.", en: "Menu images. Swipe or use the arrow keys to explore." })}
              className="flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain touch-auto select-none [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:gap-5 [&::-webkit-scrollbar]:hidden"
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
              onScroll={() => {
                const carousel = carouselRef.current;
                if (!carousel) return;
                if (performance.now() < resumeAt.current) resumeAt.current = performance.now() + idleDelay;
                const { loopWidth } = metricsRef.current;
                if (loopWidth && (carousel.scrollLeft < loopWidth || carousel.scrollLeft >= loopWidth * 2)) {
                  setScrollPosition(carousel, carousel.scrollLeft);
                } else {
                  updateScrollProgress(carousel);
                }
              }}
              onWheel={pauseForInteraction}
              ref={carouselRef}
              role="region"
              style={{ WebkitOverflowScrolling: "touch" }}
              tabIndex={0}
            >
              {slides.map((image, index) => (
                <div
                  aria-hidden={images.length > 1 && (index < cycleImages.length || index >= cycleImages.length * 2) ? true : undefined}
                  className="min-w-0 flex-[0_0_72%] overflow-hidden rounded-lg border border-gold/70 bg-rice/[0.045] sm:flex-[0_0_46%] lg:flex-[0_0_30%]"
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
