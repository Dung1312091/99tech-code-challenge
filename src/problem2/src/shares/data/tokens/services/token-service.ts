import { apiClient } from "@/core/api/api-client";
import { PRICES_URL, ICON_BASE } from "@/shares/constants/api";
import type { Token, TokenPrice } from "../types";

/**
 * Fetches token prices from the Switcheo API.
 * Deduplicates by keeping the latest entry per currency.
 * Returns a sorted list of tokens with icon URLs.
 */
export async function fetchTokens(signal?: AbortSignal): Promise<Token[]> {
  const data = await apiClient.get<TokenPrice[]>(PRICES_URL, { signal });

  // Deduplicate: keep latest entry per currency
  const latest = new Map<string, TokenPrice>();
  for (const entry of data) {
    const existing = latest.get(entry.currency);
    if (!existing || new Date(entry.date) > new Date(existing.date)) {
      latest.set(entry.currency, entry);
    }
  }

  // Convert to Token array, sorted alphabet
  return Array.from(latest.values())
    .filter((t) => t.price > 0)
    .map((t) => ({
      currency: t.currency,
      price: t.price,
      icon: `${ICON_BASE}/${t.currency}.svg`,
    }))
    .sort((a, b) => a.currency.localeCompare(b.currency));
}
