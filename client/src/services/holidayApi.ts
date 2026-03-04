import type { Holiday } from '../types';

const NAGER_API = 'https://date.nager.at/api/v3';

const cache = new Map<string, Holiday[]>();

export async function fetchHolidays(year: number, countryCode: string): Promise<Holiday[]> {
  const key = `${year}-${countryCode}`;
  if (cache.has(key)) return cache.get(key)!;

  const res = await fetch(`${NAGER_API}/PublicHolidays/${year}/${countryCode}`);
  if (!res.ok) return [];
  const data: Holiday[] = await res.json();
  cache.set(key, data);
  return data;
}

export async function fetchAvailableCountries(): Promise<{ countryCode: string; name: string }[]> {
  const res = await fetch(`${NAGER_API}/AvailableCountries`);
  if (!res.ok) return [];
  return res.json();
}
