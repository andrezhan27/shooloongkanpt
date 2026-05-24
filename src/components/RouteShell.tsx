"use client";

import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

type RouteShellProps = {
  eyebrow: {
    pt: string;
    en: string;
  };
  title: {
    pt: string;
    en: string;
  };
  body: {
    pt: string;
    en: string;
  };
  variant: "menu" | "contact";
};

export function RouteShell({ eyebrow, title, body, variant }: RouteShellProps) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen px-4 pb-20 pt-32 sm:px-8 sm:pt-36 lg:pt-44">
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_360px] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
            {t(eyebrow)}
          </p>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-[clamp(2.65rem,12vw,6rem)] font-semibold leading-[0.96] text-rice sm:leading-none">
            {t(title)}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-rice/72 sm:mt-7 sm:text-lg sm:leading-8">
            {t(body)}
          </p>
          <Link
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-rice/14 px-6 text-sm font-semibold uppercase tracking-[0.16em] text-rice/76 transition hover:scale-[1.02] hover:border-gold hover:text-rice sm:mt-9 sm:w-auto"
            href="/"
          >
            <ArrowLeft size={17} />
            {t({ pt: "Voltar ao início", en: "Return home" })}
          </Link>
        </div>

        <aside className="rounded-lg border border-rice/10 bg-rice/[0.045] p-5 sm:p-6">
          {variant === "menu" ? (
            <div className="space-y-5">
              {[
                t({ pt: "Caldo Sichuan picante", en: "Spicy Sichuan broth" }),
                t({ pt: "Caldo de cogumelos", en: "Mushroom broth" }),
                t({ pt: "Cortes de carne premium", en: "Premium meat cuts" }),
                t({ pt: "Marisco e vegetais frescos", en: "Seafood and fresh greens" })
              ].map((item) => (
                <div
                  className="border-b border-rice/10 pb-5 text-base leading-7 text-rice/78 last:border-0 last:pb-0 sm:text-lg"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5 text-rice/76">
              <ContactLine icon={<MapPin size={18} />} text="Lisboa, Portugal" />
              <ContactLine icon={<Phone size={18} />} text="+351 000 000 000" />
              <ContactLine
                icon={<Clock size={18} />}
                text={t({ pt: "Todos os dias, 12:00 - 23:00", en: "Daily, 12:00 - 23:00" })}
              />
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function ContactLine({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-4 rounded-lg bg-night/40 p-4">
      <span className="text-gold">{icon}</span>
      <span className="min-w-0 break-words leading-6">{text}</span>
    </div>
  );
}
