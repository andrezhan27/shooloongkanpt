"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/shooloongkanportugal_hotpot/?utm_source=website",
    icon: Instagram
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@shooloongkan.portugal?_r=1&_t=ZG-96ZskgLuhqD",
    icon: TikTokIcon
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Shoo-Loong-Kan-Portugal-%E5%B0%8F%E9%BE%99%E5%9D%8E%E7%81%AB%E9%94%85/61553277743695/?utm_source=website&ref=1",
    icon: Facebook
  }
];

const reserveUrl = "https://www.google.com/maps/reserve/v/dine/c/d4SDHxhazOM";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M14 3v10.25a4.75 4.75 0 1 1-4.75-4.75c.32 0 .64.03.94.1v3.1a1.75 1.75 0 1 0 .81 1.47V3h3Zm0 0c.45 2.58 2.07 4.52 4.5 5.15v3.14A8.06 8.06 0 0 1 14 9.84"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Footer({
  privacyPolicyUrl
}: {
  privacyPolicyUrl?: string;
}) {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-rice/10 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-rice/58 md:flex-row md:items-center">
        <div>
          <Link className="font-display text-2xl font-semibold text-rice" href="/#home">
            Shoo Loong Kan
          </Link>
          <p className="mt-2">
            {t({
              pt: "Hot Pot Autêntico em Lisboa.",
              en: "Authentic Hotpot in Lisbon."
            })}
          </p>
        </div>
        <div className="flex flex-col gap-5 sm:items-start md:items-end">
          <div className="flex flex-wrap gap-5 uppercase tracking-[0.16em]">
            <Link className="transition hover:text-rice" href="/menu">
              Menu
            </Link>
            <Link className="transition hover:text-rice" href="/#contact">
              {t({ pt: "Contactos", en: "Contact" })}
            </Link>
            <a
              className="transition hover:text-rice"
              href={reserveUrl}
              rel="noreferrer"
              target="_blank"
            >
              {t({ pt: "Reservar", en: "Book" })}
            </a>
            {privacyPolicyUrl ? (
              <a
                className="transition hover:text-rice"
                href={privacyPolicyUrl}
                rel="noreferrer"
                target="_blank"
              >
                {t({ pt: "Privacidade", en: "Privacy" })}
              </a>
            ) : null}
          </div>
          <div className="flex gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                aria-label={name}
                className="flex size-10 items-center justify-center rounded-full border border-rice/14 text-rice/70 transition hover:border-gold/70 hover:bg-gold/10 hover:text-rice focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                href={href}
                key={name}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-xs text-rice/42">
        <a
          className="transition hover:text-rice"
          href="https://virafoods.pt"
          rel="noreferrer"
          target="_blank"
        >
          Designed by ViraFoods.pt. All Rights Reserved.
        </a>
      </p>
    </footer>
  );
}
