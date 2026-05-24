"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Flame } from "lucide-react";
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
      className="relative flex min-h-[100svh] items-end overflow-hidden px-4 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 lg:pb-16"
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
        className="relative mx-auto w-full max-w-7xl"
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
              {t({ pt: "Hot Pot Autêntico em Lisboa", en: "Authentic Hotpot in Lisbon" })}
            </span>
          </HeroLine>
          <HeroLine>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.7rem,8.5vw,5.6rem)] font-semibold leading-[0.94] tracking-normal text-rice sm:mt-6 lg:leading-[0.9]">
              Shoo Loong Kan
            </h1>
          </HeroLine>
          <HeroLine>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-rice/78 sm:mt-6 sm:text-xl sm:leading-9">
              {t({
                pt: "Um pote no centro da mesa. Escolhe os ingredientes, cozinha ao teu ritmo.",
                en: "A pot at centre of the table. Choose your ingredients, cook at your rhythm."
              })}
            </p>
          </HeroLine>
          <HeroLine>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <MagneticButton href={reserveUrl} className="w-full gap-2 sm:w-auto">
                {t({ pt: "Reservar mesa", en: "Book a table" })}
              </MagneticButton>
            </div>
          </HeroLine>
        </div>
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
