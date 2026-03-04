import { useState, useCallback, useMemo } from 'react';
import { getCalendarDays, getMonthKey, MONTH_NAMES } from '../utils/calendar';

export function useCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const days = useMemo(() => getCalendarDays(year, month), [year, month]);
  const monthKey = useMemo(() => getMonthKey(year, month), [year, month]);
  const monthName = MONTH_NAMES[month];

  const goToPrevMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }, [month]);

  const goToNextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }, [month]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }, []);

  return { year, month, days, monthKey, monthName, goToPrevMonth, goToNextMonth, goToToday };
}
