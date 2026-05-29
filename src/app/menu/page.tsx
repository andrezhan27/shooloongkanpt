import Image from "next/image";

const menuImage = {
  alt: "Shoo Loong Kan menu",
  height: 3509,
  src: "/images/menu/xlk_menu.webp",
  width: 4961
};

export default function MenuPage() {
  return (
    <main className="px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:pt-40">
      <section className="mx-auto max-w-6xl">
        <h1 className="font-display text-[clamp(2.75rem,10vw,5.75rem)] font-semibold leading-none text-rice">
          Menu
        </h1>

        <a
          aria-label="Open full-resolution menu"
          className="mt-8 block overflow-hidden rounded-lg border border-rice/10 bg-rice/[0.035] shadow-2xl shadow-black/30 sm:mt-10"
          href={menuImage.src}
          rel="noreferrer"
          target="_blank"
        >
          <Image
            alt={menuImage.alt}
            className="h-auto w-full cursor-zoom-in"
            height={menuImage.height}
            priority
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 64px), 1152px"
            src={menuImage.src}
            width={menuImage.width}
          />
        </a>
      </section>
    </main>
  );
}
