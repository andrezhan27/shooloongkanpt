"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const spaces = [
  {
    image: "/images/space/space-01.jpg",
    title: { pt: "Salas de madeira escura", en: "Dark wood dining rooms" }
  },
  {
    image: "/images/space/space-02.jpg",
    title: { pt: "Mesas para partilhar", en: "Tables made for sharing" }
  },
  {
    image: "/images/space/space-03.jpg",
    title: { pt: "Luz íntima", en: "Intimate light" }
  },
  {
    image: "/images/space/space-4.jpg",
    title: { pt: "Noite em Lisboa", en: "Lisbon evenings" }
  }
];

export function SpaceCarousel() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const current = spaces[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % spaces.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  function go(direction: number) {
    setActive((index) => (index + direction + spaces.length) % spaces.length);
  }

  return (
    <section className="@container px-4 py-16 sm:px-8 sm:py-20 lg:py-24" id="space">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          {/* <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
            {t({ pt: "O nosso espaço", en: "Our space" })}
          </p> */}
          <h2 className="mt-4 text-balance font-display text-[clamp(1.9rem,5.5vw,2.5rem)] font-semibold leading-[0.96] text-gold sm:leading-none">
            {t({
              pt: "O NOSSO ESPAÇO",
              en: "OUR SPACE"
            })}
          </h2>
        </div>

        <div className="grid gap-4 @5xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-rice/10 bg-rice/[0.04] sm:min-h-[420px] @5xl:min-h-[620px]">
            <AnimatePresence mode="wait">
              <motion.img
                alt=""
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 h-full w-full object-cover"
                exit={{ opacity: 0, scale: 1.025 }}
                initial={{ opacity: 0, scale: 1.04 }}
                key={current.image}
                src={current.image}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-night/78 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-[85%] text-balance font-display text-[2rem] font-semibold leading-tight text-rice sm:text-5xl"
                  exit={{ opacity: 0, y: 12 }}
                  initial={{ opacity: 0, y: 12 }}
                  key={current.title.en}
                >
                  {t(current.title)}
                </motion.p>
              </AnimatePresence>
              <div className="hidden gap-2 sm:flex">
                <CarouselButton label="Previous image" onClick={() => go(-1)}>
                  <ChevronLeft size={19} />
                </CarouselButton>
                <CarouselButton label="Next image" onClick={() => go(1)}>
                  <ChevronRight size={19} />
                </CarouselButton>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 @5xl:grid-cols-1 @5xl:gap-3">
            {spaces.map((space, index) => (
              <button
                aria-label={t(space.title)}
                className={`group overflow-hidden rounded-lg border transition ${
                  active === index
                    ? "border-gold"
                    : "border-rice/10 opacity-70 hover:border-rice/32 hover:opacity-100"
                }`}
                key={space.image}
                onClick={() => setActive(index)}
                type="button"
              >
                <img
                  alt=""
                  className="aspect-[1.12] h-full w-full object-cover transition duration-500 group-hover:scale-105 @5xl:aspect-[1.8]"
                  src={space.image}
                />
              </button>
            ))}
          </div>
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
      className="grid size-12 place-items-center rounded-full border border-rice/18 bg-night/55 text-rice backdrop-blur transition hover:scale-105 hover:border-gold hover:text-gold"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
