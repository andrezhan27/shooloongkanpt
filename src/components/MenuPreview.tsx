"use client";

import { ArrowUpRight, Leaf, Soup, Utensils } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

const dishes = [
  {
    icon: Soup,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=82",
    title: { pt: "Caldos assinatura", en: "Signature broths" },
    text: {
      pt: "Sichuan picante, cogumelos selvagens e bases suaves para partilhar.",
      en: "Spicy Sichuan, wild mushroom, and softer broths designed for sharing."
    }
  },
  {
    icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=82",
    title: { pt: "Cortes premium", en: "Premium cuts" },
    text: {
      pt: "Carnes marmoreadas, marisco fresco e clássicos de hotpot à mesa.",
      en: "Marbled meats, fresh seafood, and hotpot classics served tableside."
    }
  },
  {
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=82",
    title: { pt: "Mercado vegetal", en: "Garden market" },
    text: {
      pt: "Verduras, tofu, noodles e molhos preparados para o seu ritmo.",
      en: "Greens, tofu, noodles, and sauces prepared around your pace."
    }
  }
];

export function MenuPreview() {
  const { t } = useLanguage();

  return (
    <section className="@container px-4 py-20 sm:px-8 sm:py-24 lg:py-32" id="menu">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
              {t({ pt: "O nosso menu", en: "Our menu" })}
            </p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.4rem,10.5vw,3.75rem)] font-semibold leading-[0.96] text-rice sm:leading-none">
              {t({
                pt: "Explore o sabor autêntico de Sichuan",
                en: "Explore the authentic taste of Sichuan"
              })}
            </h2>
          </div>
          <Link
            className="inline-flex min-h-12 items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-rice/72 transition hover:text-rice md:min-h-0"
            href="/menu"
          >
            {t({ pt: "Explorar menu", en: "Explore menu" })}
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 @3xl:grid-cols-3">
          {dishes.map((dish, index) => {
            const Icon = dish.icon;

            return (
              <motion.article
                className="group overflow-hidden rounded-lg border border-rice/10 bg-rice/[0.045]"
                initial={{ opacity: 0, y: 24 }}
                key={dish.title.en}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                viewport={{ once: true, margin: "-80px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="aspect-[1.24] overflow-hidden">
                  <img
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    src={dish.image}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <Icon className="text-gold" size={24} strokeWidth={1.6} />
                  <h3 className="mt-5 text-balance font-display text-[2rem] font-semibold leading-tight text-rice sm:text-3xl">
                    {t(dish.title)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-rice/66">
                    {t(dish.text)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
