import { BookTable } from "@/components/BookTable";
import { Hero } from "@/components/Hero";
import { MenuPreview } from "@/components/MenuPreview";
import { SpaceCarousel } from "@/components/SpaceCarousel";

export default function Home() {
  return (
    <main>
      <Hero />
      <MenuPreview />
      <SpaceCarousel />
      <BookTable />
    </main>
  );
}
