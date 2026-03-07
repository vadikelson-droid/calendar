import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Task } from '../../types';
import { useCalendar } from '../../hooks/useCalendar';
import { useTasks } from '../../hooks/useTasks';
import { useHolidays } from '../../hooks/useHolidays';
import { useTouchDrag } from '../../hooks/useTouchDrag';
import { fetchAvailableCountries } from '../../services/holidayApi';
import { DAY_NAMES } from '../../utils/calendar';
import CalendarHeader, { formatTaskDate } from './CalendarHeader';
import type { ViewMode } from './CalendarHeader';
import DayCell from './DayCell';
import ListView from './ListView';
import { CalendarWrapper, Grid, DayHeader } from './styles';

interface CalendarProps {
  username: string;
  onLogout: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ username, onLogout }) => {
  const { year, days, monthKey, monthName, goToPrevMonth, goToNextMonth, goToToday } = useCalendar();
  const { tasks, addTask, editTask, removeTask, reorder, getTasksForDate } = useTasks(monthKey);
  const [countryCode, setCountryCode] = useState('US');
  const [countries, setCountries] = useState<{ countryCode: string; name: string }[]>([
    { countryCode: 'US', name: 'United States' },
    { countryCode: 'UA', name: 'Ukraine' },
    { countryCode: 'GB', name: 'United Kingdom' },
    { countryCode: 'DE', name: 'Germany' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return window.innerWidth <= 768 ? 'list' : 'grid';
  });
  const { getHolidaysForDate } = useHolidays(year, countryCode);

  const dragTaskRef = useRef<Task | null>(null);
  const touchDrag = useTouchDrag({ getTasksForDate, reorder });

  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return tasks
      .filter((t) => t.title.toLowerCase().includes(q))
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((task) => ({
        task,
        dateFormatted: formatTaskDate(task.date),
      }));
  }, [tasks, searchQuery]);

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

      const newTargetTasks = [...targetTasks];
      const insertIdx = Math.min(dropIndex, newTargetTasks.length);
      newTargetTasks.splice(insertIdx, 0, { ...draggedTask, date: targetDate });

      const reorderData: { id: string; date: string; order: number }[] = [];

      if (!isSameDay) {
        sourceTasks.forEach((t, i) => {
          reorderData.push({ id: t._id, date: draggedTask.date, order: i });
        });
      }

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
        viewMode={viewMode}
        searchResults={searchResults}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
        onSearchChange={setSearchQuery}
        onCountryChange={setCountryCode}
        onViewModeChange={setViewMode}
        username={username}
        onLogout={onLogout}
      />
      {viewMode === 'grid' ? (
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
              touchDrag={touchDrag}
            />
          ))}
        </Grid>
      ) : (
        <ListView
          days={days}
          getTasksForDate={getTasksForDate}
          getHolidaysForDate={getHolidaysForDate}
          searchQuery={searchQuery}
          onAddTask={handleAddTask}
          onEditTask={editTask}
          onDeleteTask={removeTask}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          touchDrag={touchDrag}
        />
      )}
    </CalendarWrapper>
  );
};

export default Calendar;
