"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MenuGallery } from "@/components/MenuGallery";
import { useLanguage } from "@/components/LanguageProvider";

const fullMenuImage = "/images/menu/xlk_menu.webp";

export default function MenuPage() {
  const { t } = useLanguage();

  return (
    <main className="px-4 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:pt-40">
      <section className="mx-auto max-w-7xl">
        <header className="border-b border-rice/12 pb-10 sm:pb-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
            Shoo Loong Kan Lisboa
          </p>
          <h1 className="mt-4 font-display text-[clamp(3.5rem,12vw,7.5rem)] font-semibold leading-[0.82] text-rice">
            Menu
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-rice/68 sm:text-lg sm:leading-8">
            {t({
              pt: "Descubra os ingredientes e especialidades que tornam cada hot pot único.",
              en: "Discover the ingredients and specialities that make every hot pot unique."
            })}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-rice/16 px-6 text-sm font-semibold uppercase tracking-[0.14em] text-rice/78 transition hover:border-gold hover:text-rice"
              href="/"
            >
              <ArrowLeft size={17} />
              {t({ pt: "Voltar ao início", en: "Return home" })}
            </Link>
            <a
              aria-label={t({ pt: "Abrir menu completo", en: "Open full menu" })}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:scale-[1.02] hover:bg-rice"
              href={fullMenuImage}
              rel="noreferrer"
              target="_blank"
            >
              {t({ pt: "Ver menu completo", en: "View full menu" })}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </header>

        <div className="pt-10 sm:pt-14">
          <MenuGallery />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-rice/12 pt-9 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base leading-7 text-rice/62">
            {t({
              pt: "Consulte o menu completo para ver todos os pratos, preços e tempos de preparação.",
              en: "Open the full menu for every dish, price, and preparation time."
            })}
          </p>
          <a
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:scale-[1.02] hover:bg-rice sm:w-auto"
            href={fullMenuImage}
            rel="noreferrer"
            target="_blank"
          >
            {t({ pt: "Ver menu completo", en: "View full menu" })}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </main>
  );
}
