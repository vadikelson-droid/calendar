import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Holiday } from '../types';
import { fetchHolidays } from '../services/holidayApi';

export function useHolidays(year: number, countryCode: string) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    fetchHolidays(year, countryCode).then(setHolidays).catch(() => setHolidays([]));
  }, [year, countryCode]);

  const holidayMap = useMemo(() => {
    const map = new Map<string, Holiday[]>();
    for (const h of holidays) {
      const existing = map.get(h.date) || [];
      existing.push(h);
      map.set(h.date, existing);
    }
    return map;
  }, [holidays]);

  const getHolidaysForDate = useCallback(
    (date: string) => holidayMap.get(date) || [],
    [holidayMap]
  );

  return { holidays, getHolidaysForDate };
}
