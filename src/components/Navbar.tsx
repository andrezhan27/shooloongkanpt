"use client";

import { CalendarCheck, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { type Language, useLanguage } from "@/components/LanguageProvider";

const navItems = [
  { href: "/#home", label: { pt: "Início", en: "Home" } },
  { href: "/menu", label: { pt: "Menu", en: "Menu" } },
  { href: "/#space", label: { pt: "Espaço", en: "Space" } },
  { href: "/#contact", label: { pt: "Contactos", en: "Contact Us" } }
];

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <header
      className={`site-navbar fixed inset-x-0 top-0 z-50 px-4 py-1.5 transition-colors duration-300 sm:px-8 sm:py-2 ${
        !isHomePage || isScrolled || isOpen ? "bg-night/95 backdrop-blur-xl" : "bg-transparent"
      }`}
      data-over-hero={isHomePage ? "true" : undefined}
    >
      <nav
        aria-label={t({ pt: "Navegação principal", en: "Main navigation" })}
        className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between gap-3 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-8"
      >
        <Link
          href="/#home"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
          onClick={() => setIsOpen(false)}
          aria-label="Shoo Loong Kan home"
        >
          <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-rice sm:size-14">
            <img
              alt=""
              className="max-h-[88%] max-w-[88%] object-contain"
              src="/images/header/output.webp"
            />
          </span>
          <span className="min-w-0 truncate font-display text-lg font-semibold tracking-wide text-rice min-[380px]:text-xl sm:text-2xl">
            Shoo Loong Kan
          </span>
        </Link>

        <div className="hidden items-center gap-6 xl:flex xl:gap-8">
          {navItems.map((item) => (
            <Link
              className="text-sm font-medium uppercase tracking-[0.18em] text-rice/72 transition hover:text-rice"
              href={item.href}
              key={item.href}
            >
              {t(item.label)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 xl:justify-self-end">
          <div className="hidden sm:block">
            <Link
              className="button button-primary w-36 px-4"
              href="/reservations"
            >
              <CalendarCheck size={17} strokeWidth={1.8} />
              {t({ pt: "Reservar", en: "Book" })}
            </Link>
          </div>
          <div className="hidden sm:block">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? t({ pt: "Fechar menu", en: "Close menu" }) : t({ pt: "Abrir menu", en: "Open menu" })}
            className="icon-button size-11 shrink-0 xl:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="glass-panel mx-auto my-3 max-w-7xl rounded-[24px] p-3 xl:hidden" id="mobile-navigation">
          <div className="flex flex-col gap-2">
            <div className="mb-1 flex items-center justify-between rounded-2xl bg-rice/6 px-4 py-3 sm:hidden">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                {t({ pt: "Idioma", en: "Language" })}
              </span>
              <LanguageToggle language={language} setLanguage={setLanguage} />
            </div>
            {navItems.map((item) => (
              <Link
                className="min-h-12 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-rice/78 transition hover:bg-rice/8 hover:text-rice"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {t(item.label)}
              </Link>
            ))}
            <Link
              className="button button-primary mt-2 w-full sm:hidden"
              href="/reservations"
              onClick={() => setIsOpen(false)}
            >
              <CalendarCheck size={17} strokeWidth={1.8} />
              {t({ pt: "Reservar", en: "Book" })}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function LanguageToggle({
  language,
  setLanguage
}: {
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  return (
    <div
      aria-label="Language selector"
      className="relative grid grid-cols-2 rounded-[10px] border border-rice/15 bg-rice/8 p-1 text-xs font-bold uppercase tracking-[0.14em] text-rice/76"
      role="group"
    >
      <span
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-md bg-rice text-ink transition-transform duration-200 ${
          language === "pt" ? "translate-x-0" : "translate-x-full"
        }`}
      />
      {(["pt", "en"] as const).map((option) => (
        <button
          aria-pressed={language === option}
          className={`language-button relative z-10 h-9 w-12 rounded-md transition ${
            language === option ? "text-ink" : "text-rice/70 hover:text-rice"
          }`}
          key={option}
          onClick={() => setLanguage(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
