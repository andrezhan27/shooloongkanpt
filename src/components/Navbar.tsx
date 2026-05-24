"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { type Language, useLanguage } from "@/components/LanguageProvider";
import { MagneticButton } from "@/components/MagneticButton";

const navItems = [
  { href: "/#home", label: { pt: "Início", en: "Home" } },
  { href: "/#menu", label: { pt: "Menu", en: "Menu" } },
  { href: "/#contact", label: { pt: "Contactos", en: "Contact Us" } }
];
const reserveUrl = "https://www.google.com/maps/reserve/v/dine/c/d4SDHxhazOM";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav className="glass-panel mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between gap-3 rounded-full px-3 sm:px-5">
        <Link
          href="/#home"
          className="min-w-0 shrink truncate font-display text-lg font-semibold tracking-wide text-rice min-[380px]:text-xl sm:text-2xl"
          onClick={() => setIsOpen(false)}
        >
          Shoo Loong Kan
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
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

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <div className="hidden sm:block">
            <MagneticButton href={reserveUrl} className="gap-2 px-5">
              <CalendarCheck size={17} strokeWidth={1.8} />
              {t({ pt: "Reservar", en: "Book" })}
            </MagneticButton>
          </div>
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-rice/12 text-rice lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel mx-auto mt-3 max-w-7xl rounded-[24px] p-3 lg:hidden"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: -12 }}
          >
            <div className="flex flex-col gap-2">
              <div className="mb-1 flex items-center justify-between rounded-2xl bg-rice/6 px-4 py-3 sm:hidden">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  {t({ pt: "Idioma", en: "Language" })}
                </span>
                <LanguageToggle language={language} setLanguage={setLanguage} />
              </div>
              {navItems.map((item) => (
                <Link
                  className="min-h-12 rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-rice/78 transition hover:bg-rice/8 hover:text-rice"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.label)}
                </Link>
              ))}
              <MagneticButton
                href={reserveUrl}
                className="mt-2 w-full gap-2 sm:hidden"
              >
                <CalendarCheck size={17} strokeWidth={1.8} />
                {t({ pt: "Reservar", en: "Book" })}
              </MagneticButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
      className="relative grid grid-cols-2 rounded-full border border-rice/15 bg-rice/8 p-1 text-xs font-bold uppercase tracking-[0.14em] text-rice/76"
      role="group"
    >
      <motion.span
        animate={{ x: language === "pt" ? 0 : "100%" }}
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-rice text-ink"
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />
      {(["pt", "en"] as const).map((option) => (
        <button
          className={`relative z-10 h-9 w-12 rounded-full transition ${
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
