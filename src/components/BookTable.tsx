"use client";

import { CalendarDays, Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { MagneticButton } from "@/components/MagneticButton";

const boltFoodUrl = "https://food.bolt.eu/en/386-lisbon/p/195603-shoo-loong-kan-hotpot/";
const mapsUrl = "https://maps.app.goo.gl/VV8F4Fe51Pq2miyHA";
const reserveUrl = "https://www.google.com/maps/reserve/v/dine/c/d4SDHxhazOM";

export function BookTable() {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-16 sm:px-8 sm:py-20 lg:py-24" id="book">
      <motion.div
        className="wood-grain mx-auto grid max-w-7xl gap-7 rounded-lg border border-rice/10 p-5 sm:gap-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.48fr)] lg:p-12"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
            {t({ pt: "Reservas", en: "Reservations" })}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-[clamp(2.15rem,7vw,3.55rem)] font-semibold leading-[0.98] text-rice sm:leading-none">
            {t({
              pt: "Reserva a tua mesa agora.",
              en: "Reserve your table now."
            })}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-rice/72 sm:leading-8 lg:max-w-[58rem] lg:text-[0.95rem] lg:whitespace-nowrap">
            {t({
              pt: "Reserve para jantares íntimos, celebrações e grupos que querem descobrir o hotpot no seu melhor.",
              en: "Book intimate dinners, celebrations, and group tables for hotpot at its most generous."
            })}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <MagneticButton href={reserveUrl} className="w-full gap-2 sm:w-auto">
              <GoogleLogo />
              {t({ pt: "Reservar Online", en: "Book Online" })}
            </MagneticButton>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-rice/14 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-rice/76 transition hover:scale-[1.02] hover:border-gold hover:text-rice"
              href={boltFoodUrl}
              rel="noreferrer"
              target="_blank"
            >
              <BoltLogo />
              {t({ pt: "Reservar no Bolt", en: "Book on Bolt" })}
              {/* <ExternalLink size={16} /> */}
            </a>
          </div>
        </div>

        <div className="grid scroll-mt-28 content-end gap-2.5" id="contact">
          <Info
            icon={<MapPin size={19} />}
            label={t({ pt: "Localização", en: "Location" })}
            value={
              <a
                className="group inline-flex flex-col gap-1 text-rice transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                href={mapsUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span
                  className="decoration-gold/55 underline-offset-4"
                  style={{ textDecorationLine: "underline" }}
                >
                  Oriente, Av. Dom João II Lote 1.15 Loja G-213/4-F4, 1990-233 Lisboa
                  <ExternalLink className="ml-1 inline-block align-[-2px]" size={13} />
                </span>
              </a>
            }
          />
          <Info
            icon={<Clock size={19} />}
            label={t({ pt: "Horário", en: "Hours" })}
            value={t({ pt: "Todos os dias, 12:00 - 00:00", en: "Everyday, 12:00 - 00:00" })}
          />
          <Info
            icon={<Phone size={19} />}
            label={t({ pt: "Telefone", en: "Phone" })}
            value={
              <a
                className="text-rice decoration-gold/55 underline-offset-4 transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                href="tel:+351967766666"
                style={{ textDecorationLine: "underline" }}
              >
                +351 967 766 666
              </a>
            }
          />
          <Info
            icon={<CalendarDays size={19} />}
            label={t({ pt: "Grupos", en: "Groups" })}
            value={t({ pt: "Até 12 pessoas online ou por telefone", en: "Up to 12 people online or via telephone" })}
          />
        </div>
      </motion.div>
    </section>
  );
}

function Info({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-rice/10 bg-night/38 p-4">
      <div className="grid size-11 shrink-0 place-items-center rounded-full bg-lacquer text-rice">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
          {label}
        </p>
        <div className="mt-1 break-words text-sm leading-6 text-rice/76">{value}</div>
      </div>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" className="size-5 shrink-0" viewBox="0 0 24 24">
      <path
        d="M21.6 12.23c0-.75-.07-1.47-.2-2.16H12v4.09h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.46Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.98-.9 6.64-2.43l-3.24-2.51c-.9.6-2.05.95-3.4.95-2.61 0-4.82-1.76-5.61-4.13H3.04v2.59A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.39 13.88A6 6 0 0 1 6.07 12c0-.65.11-1.28.32-1.88V7.53H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.47l3.35-2.59Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.99c1.47 0 2.79.51 3.83 1.5l2.88-2.88C16.97 2.99 14.69 2 12 2a10 10 0 0 0-8.96 5.53l3.35 2.59C7.18 7.75 9.39 5.99 12 5.99Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function BoltLogo() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 shrink-0 items-center rounded bg-[#34d186] px-1.5 text-[0.68rem] font-black lowercase leading-none tracking-normal text-night"
    >
      bolt
    </span>
  );
}
