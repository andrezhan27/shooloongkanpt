"use client";

import { CalendarCheck, Clock, MapPin, Phone } from "lucide-react";
import { BoltFoodLogo } from "@/components/BoltFoodLogo";
import { useLanguage } from "@/components/LanguageProvider";

const boltFoodUrl = "https://food.bolt.eu/en/386-lisbon/p/195603-shoo-loong-kan-hotpot/";
const mapsUrl = "https://maps.app.goo.gl/VV8F4Fe51Pq2miyHA";
const reserveUrl = "https://www.google.com/maps/reserve/v/dine/c/d4SDHxhazOM";

export function BookTable() {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-14 sm:px-8 sm:py-20 lg:py-24" id="book">
      <div
        className="mx-auto grid max-w-7xl gap-8 border-y border-rice/10 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(470px,0.56fr)] lg:items-stretch lg:py-14"
      >
        <div className="rounded-lg border border-rice/10 bg-rice/[0.025] p-5 shadow-[0_24px_80px_rgb(0_0_0/.14)] sm:p-7 lg:flex lg:flex-col lg:justify-center lg:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
              {t({ pt: "Reservas", en: "Reservations" })}
            </p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-[clamp(2.25rem,9vw,3.55rem)] font-semibold leading-[0.96] text-rice sm:leading-none">
              {t({
                pt: "Reserva a tua mesa agora.",
                en: "Reserve your table now."
              })}
            </h2>
            <p className="mt-4 text-base leading-7 text-rice/72 sm:leading-8 lg:text-[0.98rem]">
              {t({
                pt: "Reserve para jantares íntimos, celebrações e grupos que querem descobrir o hotpot no seu melhor.",
                en: "Book intimate dinners, celebrations, and group tables for hotpot at its most generous."
              })}
            </p>
          </div>
        </div>

        <aside
          className="scroll-mt-28 rounded-lg border border-rice/10 bg-rice/[0.035] p-4 shadow-[0_24px_80px_rgb(0_0_0/.22)] backdrop-blur-xl sm:p-5 lg:p-6"
          id="contact"
        >
          <div className="border-b border-rice/10 pb-4">
            <div className="min-w-0">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold">
                {t({ pt: "Restaurante", en: "Restaurant" })}
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold leading-none text-rice sm:text-[2rem]">
                Shoo Loong Kan
              </h3>
            </div>
          </div>

          <div className="grid gap-3 py-4 sm:grid-cols-2">
            <a
              className="border-beam inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold uppercase tracking-[0.12em] text-rice shadow-glow transition duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              href={reserveUrl}
              rel="noreferrer"
              target="_blank"
            >
              <CalendarCheck size={18} />
              <span className="whitespace-nowrap">{t({ pt: "Reservar", en: "Reserve" })}</span>
            </a>
            <a
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-rice/14 bg-night/35 px-5 text-sm font-semibold uppercase tracking-[0.12em] text-rice/82 transition hover:scale-[1.01] hover:border-gold hover:text-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              href={boltFoodUrl}
              rel="noreferrer"
              target="_blank"
            >
              <BoltFoodLogo />
              <span className="whitespace-nowrap">{t({ pt: "Pedir Online", en: "Order Online" })}</span>
            </a>
          </div>

          <div className="divide-y divide-rice/10 border-t border-rice/10">
            <Info
              icon={<MapPin size={18} />}
              label={t({ pt: "Localização", en: "Location" })}
              value={
                <a
                  className="group inline-flex text-rice decoration-gold/55 underline-offset-4 transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  href={mapsUrl}
                  rel="noreferrer"
                  style={{ textDecorationLine: "underline" }}
                  target="_blank"
                >
                  <span>
                    Oriente, Av. Dom João II Lote 1.15 Loja G-213/4-F4, 1990-233 Lisboa
                  </span>
                </a>
              }
            />
            <Info
              icon={<Clock size={18} />}
              label={t({ pt: "Horário", en: "Hours" })}
              value={t({ pt: "Todos os dias, 12:00 - 00:00", en: "Everyday, 12:00 - 00:00" })}
            />
            <Info
              icon={<Phone size={18} />}
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
          </div>
        </aside>
      </div>
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
    <div className="grid grid-cols-[2.25rem_1fr] gap-3 py-4">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-rice/10 bg-night/38 text-gold">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">
          {label}
        </p>
        <div className="mt-1 break-words text-sm leading-6 text-rice/76">{value}</div>
      </div>
    </div>
  );
}
