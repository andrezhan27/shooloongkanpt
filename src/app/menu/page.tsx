import { RouteShell } from "@/components/RouteShell";

export default function MenuPage() {
  return (
    <RouteShell
      body={{
        pt: "Uma página de menu completa chegará em breve. Por agora, destacamos os caldos, cortes e acompanhamentos essenciais para uma experiência de hotpot equilibrada.",
        en: "A complete menu page is coming soon. For now, the essentials are broths, cuts, and sides for a balanced hotpot experience."
      }}
      eyebrow={{ pt: "Menu", en: "Menu" }}
      title={{ pt: "Clássicos de hotpot, preparados para partilhar.", en: "Hotpot classics, prepared to share." }}
      variant="menu"
    />
  );
}
