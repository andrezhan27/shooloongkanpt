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
    <section className="px-4 py-20 sm:px-8 sm:py-24 lg:py-32" id="book">
      <motion.div
        className="wood-grain mx-auto grid max-w-7xl gap-9 rounded-lg border border-rice/10 p-5 sm:gap-10 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.55fr)] lg:p-14"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
            {t({ pt: "Reservas", en: "Reservations" })}
          </p>
          <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.35rem,10.5vw,4.5rem)] font-semibold leading-[0.96] text-rice sm:leading-none">
            {t({
              pt: "A mesa acende quando todos chegam.",
              en: "The table comes alive when everyone arrives."
            })}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-rice/72 sm:leading-8">
            {t({
              pt: "Reserve para jantares íntimos, celebrações e grupos que querem descobrir o hotpot no seu melhor.",
              en: "Book intimate dinners, celebrations, and group tables for hotpot at its most generous."
            })}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:flex-wrap">
            <MagneticButton href={reserveUrl} className="w-full sm:w-auto">
              {t({ pt: "Pedir reserva", en: "Request booking" })}
            </MagneticButton>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-rice/14 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-rice/76 transition hover:scale-[1.02] hover:border-gold hover:text-rice"
              href={boltFoodUrl}
              rel="noreferrer"
              target="_blank"
            >
              {t({ pt: "Pedir online", en: "Order online" })}
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="grid scroll-mt-28 content-end gap-3" id="contact">
          <Info
            icon={<MapPin size={19} />}
            label={t({ pt: "Localização", en: "Location" })}
            value={
              <a
                className="transition hover:text-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                href={mapsUrl}
                rel="noreferrer"
                target="_blank"
              >
                Oriente, Av. Dom João II Lote 1.15 Loja G-213/4-F4, 1990-233 Lisboa
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
                className="transition hover:text-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                href="tel:+351967766666"
              >
                +351 967 766 666
              </a>
            }
          />
          <Info
            icon={<CalendarDays size={19} />}
            label={t({ pt: "Grupos", en: "Groups" })}
            value={t({ pt: "Reservas recomendadas", en: "Reservations recommended" })}
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
        <p className="mt-1 break-words text-sm leading-6 text-rice/76">{value}</p>
      </div>
    </div>
  );
}
