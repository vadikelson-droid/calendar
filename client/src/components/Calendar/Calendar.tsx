import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Task } from '../../types';
import { useCalendar } from '../../hooks/useCalendar';
import { useTasks } from '../../hooks/useTasks';
import { useHolidays } from '../../hooks/useHolidays';
import { fetchAvailableCountries } from '../../services/holidayApi';
import { DAY_NAMES } from '../../utils/calendar';
import CalendarHeader from './CalendarHeader';
import DayCell from './DayCell';
import { CalendarWrapper, Grid, DayHeader } from './styles';

const Calendar: React.FC = () => {
  const { year, days, monthKey, monthName, goToPrevMonth, goToNextMonth, goToToday } = useCalendar();
  const { addTask, editTask, removeTask, reorder, getTasksForDate } = useTasks(monthKey);
  const [countryCode, setCountryCode] = useState('US');
  const [countries, setCountries] = useState<{ countryCode: string; name: string }[]>([
    { countryCode: 'US', name: 'United States' },
    { countryCode: 'UA', name: 'Ukraine' },
    { countryCode: 'GB', name: 'United Kingdom' },
    { countryCode: 'DE', name: 'Germany' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const { getHolidaysForDate } = useHolidays(year, countryCode);

  const dragTaskRef = useRef<Task | null>(null);

  useEffect(() => {
    fetchAvailableCountries().then((data) => {
      if (data.length > 0) setCountries(data);
    });
  }, []);

  const handleAddTask = useCallback(
    (title: string, date: string, color: string) => {
      addTask(title, date, color);
    },
    [addTask]
  );

  const handleDragStart = useCallback((_e: React.DragEvent, task: Task) => {
    dragTaskRef.current = task;
  }, []);

  const handleDragEnd = useCallback(() => {
    dragTaskRef.current = null;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (_e: React.DragEvent, targetDate: string, dropIndex: number) => {
      const draggedTask = dragTaskRef.current;
      if (!draggedTask) return;

      const sourceTasks = getTasksForDate(draggedTask.date).filter((t) => t._id !== draggedTask._id);
      const isSameDay = draggedTask.date === targetDate;
      let targetTasks = isSameDay
        ? sourceTasks
        : getTasksForDate(targetDate);

      // Insert at drop position
      const newTargetTasks = [...targetTasks];
      const insertIdx = Math.min(dropIndex, newTargetTasks.length);
      newTargetTasks.splice(insertIdx, 0, { ...draggedTask, date: targetDate });

      // Build reorder data
      const reorderData: { id: string; date: string; order: number }[] = [];

      // Update source day if moved to different day
      if (!isSameDay) {
        sourceTasks.forEach((t, i) => {
          reorderData.push({ id: t._id, date: draggedTask.date, order: i });
        });
      }

      // Update target day
      newTargetTasks.forEach((t, i) => {
        reorderData.push({ id: t._id, date: targetDate, order: i });
      });

      reorder(reorderData);
      dragTaskRef.current = null;
    },
    [getTasksForDate, reorder]
  );

  return (
    <CalendarWrapper>
      <CalendarHeader
        monthName={monthName}
        year={year}
        searchQuery={searchQuery}
        countryCode={countryCode}
        countries={countries}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
        onSearchChange={setSearchQuery}
        onCountryChange={setCountryCode}
      />
      <Grid>
        {DAY_NAMES.map((name) => (
          <DayHeader key={name} $isWeekend={name === 'Sat' || name === 'Sun'}>{name}</DayHeader>
        ))}
        {days.map((day) => (
          <DayCell
            key={day.date}
            day={day}
            tasks={getTasksForDate(day.date)}
            holidays={getHolidaysForDate(day.date)}
            searchQuery={searchQuery}
            onAddTask={handleAddTask}
            onEditTask={editTask}
            onDeleteTask={removeTask}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </Grid>
    </CalendarWrapper>
  );
};

export default Calendar;
