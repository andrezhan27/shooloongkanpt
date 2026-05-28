"use client";

import { CalendarCheck, Flame } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const heroImage = "/images/hero/hero.webp";
const reserveUrl = "https://www.google.com/maps/reserve/v/dine/c/d4SDHxhazOM";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative flex min-h-[100svh] items-end overflow-hidden px-4 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 lg:pb-16"
      id="home"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_42%,transparent_0%,rgb(0_0_0/.18)_28%,rgb(0_0_0/.82)_74%),linear-gradient(90deg,rgb(9_6_4/.92),rgb(9_6_4/.38)_46%,rgb(9_6_4/.78))]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <HeroLine delay={80}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-night/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              <Flame size={15} />
              {t({ pt: "Hot Pot Autêntico em Lisboa", en: "Authentic Hotpot in Lisbon" })}
            </span>
          </HeroLine>
          <HeroLine delay={180}>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.7rem,8.5vw,5.6rem)] font-semibold leading-[0.94] tracking-normal text-rice sm:mt-6 lg:leading-[0.9]">
              Shoo Loong Kan
            </h1>
          </HeroLine>
          <HeroLine delay={280}>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-rice/78 sm:mt-6 sm:text-xl sm:leading-9">
              {t({
                pt: "Um pote no centro da mesa. Escolhe os ingredientes, cozinha ao teu ritmo.",
                en: "A pot at centre of the table. Choose your ingredients, cook at your rhythm."
              })}
            </p>
          </HeroLine>
          <HeroLine delay={380}>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <a
                className="border-beam inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold uppercase tracking-[0.12em] text-rice shadow-glow transition duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:w-auto"
                href={reserveUrl}
                rel="noreferrer"
                target="_blank"
              >
                <CalendarCheck size={18} />
                <span className="whitespace-nowrap">
                  {t({ pt: "Reservar", en: "Book a table" })}
                </span>
              </a>
            </div>
          </HeroLine>
        </div>
      </div>
    </section>
  );
}

function HeroLine({
  children,
  delay
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div
      className="hero-reveal"
      style={{ "--hero-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
