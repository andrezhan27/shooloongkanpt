import { reservationWidgetUrl } from "@/lib/restaurantInfo";

const restaurantInfo = { reservationWidgetUrl };

export default function ReservationsPage() {
  return (
    <main className="h-svh bg-white pt-[calc(var(--nav-height)+0.75rem)] sm:pt-[calc(var(--nav-height)+1rem)]">
      <iframe
        className="block h-full w-full border-0"
        loading="eager"
        src={restaurantInfo.reservationWidgetUrl}
        title="Shoo Loong Kan Reservation"
      />
    </main>
  );
}
