"use client";

import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const heroImage = "/images/hero/hero.webp";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-24 pt-36 sm:px-8 sm:pb-28 sm:pt-40"
      id="home"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(9_6_4/.7)_0%,rgb(9_6_4/.42)_28%,rgb(9_6_4/.58)_65%,rgb(9_6_4/.82)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl text-center">
        <div className="mx-auto max-w-6xl">
          <HeroLine delay={80}>
            <h1 className="text-balance font-display text-[clamp(2.75rem,6.25vw,5.75rem)] font-medium leading-[1.05] tracking-normal text-rice">
              Shoo Loong Kan
            </h1>
          </HeroLine>
          <HeroLine delay={180}>
            <p className="mx-auto mt-5 max-w-[19rem] text-balance text-sm leading-6 text-rice/70 sm:mt-6 sm:max-w-lg sm:text-base sm:leading-7">
              {t({
                pt: "Um pote no centro da mesa. Escolhe os ingredientes, cozinha ao teu ritmo.",
                en: "A pot at centre of the table. Choose your ingredients, cook at your rhythm."
              })}
            </p>
          </HeroLine>
          <HeroLine delay={280}>
            <div className="mt-8 flex justify-center sm:mt-9">
              <Link
                className="button button-primary min-h-13 px-8"
                href="/reservations"
              >
                <CalendarCheck size={18} />
                <span className="whitespace-nowrap">
                  {t({ pt: "Reservar", en: "Book a table" })}
                </span>
              </Link>
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
