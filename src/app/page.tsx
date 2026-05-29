import { BookTable } from "@/components/BookTable";
import { Hero } from "@/components/Hero";
import { MenuPreview } from "@/components/MenuPreview";
import { SpaceCarousel } from "@/components/SpaceCarousel";
import { getMenuImages } from "@/lib/menuImages";

export default function Home() {
  const menuImages = getMenuImages();

  return (
    <main>
      <Hero />
      <MenuPreview images={menuImages} />
      <SpaceCarousel />
      <BookTable />
    </main>
  );
}
