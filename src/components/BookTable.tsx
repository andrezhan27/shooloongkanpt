"use client";

import { ArrowUpRight, CalendarCheck, Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BoltFoodLogo } from "@/components/BoltFoodLogo";
import { useLanguage } from "@/components/LanguageProvider";

const boltFoodUrl = "https://food.bolt.eu/en/386-lisbon/p/195603-shoo-loong-kan-hotpot/";
const mapsUrl = "https://maps.app.goo.gl/VV8F4Fe51Pq2miyHA";
const mapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.845985716407!2d-9.102026824311954!3d38.767236354374184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193194561e6d05%3A0xb14296221b4e5f9a!2sShoo%20Loong%20Kan!5e0!3m2!1sen!2spt!4v1792598502267!5m2!1sen!2spt";

export function BookTable() {
  const { t } = useLanguage();

  return (
    <section className="px-4 py-14 sm:px-8 sm:py-20 lg:py-24" id="book">
      <div
        className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-rice/10 bg-rice/[0.03] shadow-[0_24px_80px_rgb(0_0_0/.22)] backdrop-blur-xl lg:grid-cols-2"
      >
        <div className="scroll-mt-32 p-5 sm:p-8 lg:p-10" id="contact">
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
          <div className="mt-6 grid gap-3 pb-6 sm:grid-cols-2">
            <Link
              className="button button-primary w-full"
              href="/reservations"
            >
              <CalendarCheck size={18} />
              <span className="whitespace-nowrap">{t({ pt: "Reservar", en: "Reserve" })}</span>
            </Link>
            <a
              className="button button-secondary w-full"
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
        </div>

        <div className="flex min-w-0 flex-col border-t border-rice/10 bg-rice/[0.03] lg:border-l lg:border-t-0">
          <iframe
            allowFullScreen
            className="block h-[340px] w-full flex-none border-0 sm:h-[420px] lg:h-full lg:min-h-[480px] lg:flex-1"
            height="450"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={mapsEmbedUrl}
            title={t({ pt: "Localização do Shoo Loong Kan no Google Maps", en: "Shoo Loong Kan location on Google Maps" })}
            width="600"
          />
          <a
            className="flex min-h-16 items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-rice/85 transition hover:bg-rice/5 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold sm:px-8"
            href={mapsUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <MapPin size={17} className="shrink-0 text-gold" />
              {t({ pt: "Abrir no Google Maps", en: "Open in Google Maps" })}
            </span>
            <ArrowUpRight size={18} className="shrink-0" />
          </a>
        </div>
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
