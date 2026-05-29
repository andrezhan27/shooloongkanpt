import { readdirSync } from "node:fs";
import { join } from "node:path";

const imageExtensions = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);
const fullMenuImage = "xlk_menu.webp";

export function getMenuImages() {
  const menuDirectory = join(process.cwd(), "public", "images", "menu");
  const collator = new Intl.Collator("en", { numeric: true });

  return readdirSync(menuDirectory)
    .filter((fileName) => {
      const lowerCaseName = fileName.toLowerCase();
      const extension = lowerCaseName.slice(lowerCaseName.lastIndexOf("."));

      return imageExtensions.has(extension) && lowerCaseName !== fullMenuImage;
    })
    .sort((first, second) => collator.compare(first, second))
    .map((fileName) => `/images/menu/${fileName}`);
}
