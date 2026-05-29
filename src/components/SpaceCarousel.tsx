"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const spaces = [
  {
    image: "/images/space/space-01.webp",
    title: { pt: "Salas de madeira escura", en: "Dark wood dining rooms" }
  },
  {
    image: "/images/space/space-02.webp",
    title: { pt: "Mesas para partilhar", en: "Tables made for sharing" }
  },
  {
    image: "/images/space/space-03.webp",
    title: { pt: "Luz íntima", en: "Intimate light" }
  },
  {
    image: "/images/space/space-04.webp",
    title: { pt: "Noite em Lisboa", en: "Lisbon evenings" }
  }
];

export function SpaceCarousel() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const current = spaces[active];

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

        <div>
          <div className="relative aspect-[16/10] min-h-[240px] overflow-hidden rounded-lg border border-rice/10 bg-rice/[0.04] sm:aspect-[16/8] sm:min-h-[300px] lg:min-h-[380px] xl:min-h-[420px]">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              key={current.image}
              src={current.image}
            />
            <div className="absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-4 sm:flex sm:px-6">
              <CarouselButton label="Previous image" onClick={() => go(-1)}>
                <ChevronLeft size={19} />
              </CarouselButton>
              <CarouselButton label="Next image" onClick={() => go(1)}>
                <ChevronRight size={19} />
              </CarouselButton>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
            {spaces.map((space, index) => (
              <button
                aria-label={t(space.title)}
                className={`group overflow-hidden rounded-lg border bg-night/35 transition ${
                  active === index
                    ? "border-gold"
                    : "border-rice/20 opacity-75 hover:border-rice/45 hover:opacity-100"
                }`}
                key={space.image}
                onClick={() => setActive(index)}
                type="button"
              >
                <img
                  alt=""
                  className="aspect-[1.65] h-full w-full object-cover transition duration-500 group-hover:scale-105"
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
