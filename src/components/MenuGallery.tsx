"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { menuPageItems, type MenuDishCategory } from "@/lib/menuPageItems";

const categoryLabels: Record<MenuDishCategory, { pt: string; en: string }> = {
  premium: { pt: "Seleção premium", en: "Premium selection" },
  seafood: { pt: "Marisco", en: "Seafood" },
  meat: { pt: "Carnes", en: "Meat" },
  vegetables: { pt: "Vegetais e tofu", en: "Vegetables & tofu" },
  noodles: { pt: "Massas", en: "Noodles" },
  snacks: { pt: "Especialidades", en: "Specialities" },
  desserts: { pt: "Sobremesas", en: "Desserts" }
};

export function MenuGallery() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {menuPageItems.map((item, index) => (
          <article
            className="group relative isolate min-h-[300px] overflow-hidden rounded-lg border border-rice/10 bg-rice/[0.035] shadow-[0_18px_55px_rgb(0_0_0/.18)] sm:min-h-[340px]"
            key={item.image}
          >
            <Image
              alt={t(item.name)}
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
              fill
              priority={index < 3}
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc((100vw - 84px) / 2), 368px"
              src={`/images/menu-page/${item.image}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold">
                {t(categoryLabels[item.category])}
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-tight text-rice sm:text-2xl">
                {t(item.name)}
              </h2>
            </div>
          </article>
        ))}
    </div>
  );
}
