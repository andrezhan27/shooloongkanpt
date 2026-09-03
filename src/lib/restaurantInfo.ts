import "server-only";

export type RestaurantInfo = {
  privacyPolicyUrl?: string;
  reservationWidgetUrl: string;
  termsAndConditionsUrl?: string;
};

type RestaurantRow = {
  privacy_policy_url: string | null;
  terms_and_conditions_url: string | null;
};

export const reservationWidgetUrl = "https://reserve.intelis.pt/shooloongkan";

export const restaurantInfo = {
  databaseId: "shooloongkan"
} as const;

function getSupabaseCredentials() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return { key, url };
}

function getSafeDocumentUrl(value: string | null | undefined) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

export async function getRestaurantInfo(): Promise<RestaurantInfo> {
  const fallback: RestaurantInfo = { reservationWidgetUrl };
  const { key, url } = getSupabaseCredentials();

  if (!key || !url) return fallback;

  const endpoint = new URL("/rest/v1/restaurants", url);
  endpoint.searchParams.set(
    "select",
    "terms_and_conditions_url,privacy_policy_url"
  );
  endpoint.searchParams.set("id", `eq.${restaurantInfo.databaseId}`);
  endpoint.searchParams.set("limit", "1");

  try {
    const response = await fetch(endpoint, {
      headers: { apikey: key },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      console.error(
        `Unable to load restaurant legal links from Supabase (${response.status}).`
      );
      return fallback;
    }

    const [restaurant] = (await response.json()) as RestaurantRow[];

    return {
      privacyPolicyUrl: getSafeDocumentUrl(restaurant?.privacy_policy_url),
      reservationWidgetUrl,
      termsAndConditionsUrl: getSafeDocumentUrl(
        restaurant?.terms_and_conditions_url
      )
    };
  } catch (error) {
    console.error("Unable to load restaurant legal links from Supabase.", error);
    return fallback;
  }
}
