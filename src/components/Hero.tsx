"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Flame, MapPin } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { MagneticButton } from "@/components/MagneticButton";

const heroImage = "/images/hero/hero.webp";
const reserveUrl = "https://www.google.com/maps/reserve/v/dine/c/d4SDHxhazOM";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section
      className="relative flex min-h-[100svh] items-end overflow-hidden px-4 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32 lg:pb-20"
      id="home"
      ref={ref}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          opacity,
          y
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_42%,transparent_0%,rgb(0_0_0/.18)_28%,rgb(0_0_0/.82)_74%),linear-gradient(90deg,rgb(9_6_4/.92),rgb(9_6_4/.38)_46%,rgb(9_6_4/.78))]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />

      <motion.div
        animate="show"
        className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.42fr)] lg:items-end"
        initial="hidden"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
        }}
      >
        <div className="max-w-4xl">
          <HeroLine>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-night/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
              <Flame size={15} />
              {t({ pt: "Hotpot premium em Lisboa", en: "Premium hotpot in Lisbon" })}
            </span>
          </HeroLine>
          <HeroLine>
            <h1 className="mt-6 max-w-5xl text-balance font-display text-[clamp(3.4rem,17vw,10rem)] font-semibold leading-[0.86] tracking-normal text-rice sm:mt-7 lg:leading-[0.82]">
              Shoo
              <br />
              Loong Kan
            </h1>
          </HeroLine>
          <HeroLine>
            <p className="mt-6 max-w-2xl text-base leading-7 text-rice/76 sm:mt-7 sm:text-lg sm:leading-8">
              {t({
                pt: "Autêntico Hot Pot Chinês no coração de Lisboa.",
                en: "Authentic Chinese Hotpot in the heart of Lisbon."
              })}
            </p>
          </HeroLine>
          <HeroLine>
            <div className="mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center">
              <MagneticButton href={reserveUrl} className="w-full gap-2 sm:w-auto">
                {t({ pt: "Reservar mesa", en: "Book a table" })}
              </MagneticButton>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-rice/70 transition hover:text-rice sm:min-h-0 sm:justify-start"
                href="#menu"
              >
                {t({ pt: "Ver menu", en: "View menu" })}
                <ArrowDown size={16} />
              </a>
            </div>
          </HeroLine>
        </div>

        <HeroLine>
          <div className="glass-panel hidden rounded-[32px] p-5 lg:block">
            <div className="border-l border-gold/45 pl-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                {t({ pt: "Ambiente", en: "Atmosphere" })}
              </p>
              <p className="mt-4 font-display text-3xl leading-tight text-rice">
                {t({
                  pt: "Luz baixa, caldos a ferver e hospitalidade Sichuan.",
                  en: "Low light, simmering broths, and Sichuan hospitality."
                })}
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-rice/68">
                <MapPin size={16} />
                Lisboa, Portugal
              </p>
            </div>
          </div>
        </HeroLine>
      </motion.div>
    </section>
  );
}

function HeroLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
      }}
    >
      {children}
    </motion.div>
  );
}
