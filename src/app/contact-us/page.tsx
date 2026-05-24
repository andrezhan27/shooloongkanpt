import { RouteShell } from "@/components/RouteShell";

export default function ContactPage() {
  return (
    <RouteShell
      body={{
        pt: "Entre em contacto para reservas, grupos e pedidos especiais. Esta página será expandida com mapa, formulário e contactos oficiais.",
        en: "Get in touch for reservations, groups, and special requests. This page will expand with a map, form, and official contact details."
      }}
      eyebrow={{ pt: "Contactos", en: "Contact" }}
      title={{ pt: "Fale connosco antes da mesa ferver.", en: "Speak with us before the table simmers." }}
      variant="contact"
    />
  );
}
