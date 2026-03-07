import React, { useState, useCallback } from 'react';
import type { DayData, Task, Holiday } from '../../types';
import { DAY_NAMES } from '../../utils/calendar';
import {
  ListViewWrapper,
  ListDayRow,
  ListDayHeader,
  ListDayDate,
  ListDayName,
  ListTaskList,
  ListAddBtn,
  AddTaskArea,
} from './styles';
import TaskItem from '../Task/TaskItem';
import TaskInput from '../Task/TaskInput';
import HolidayBadge from '../Holiday/HolidayBadge';

interface TouchDrag {
  handleTouchStart: (e: React.TouchEvent, task: Task) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
}

interface Props {
  days: DayData[];
  getTasksForDate: (date: string) => Task[];
  getHolidaysForDate: (date: string) => Holiday[];
  searchQuery: string;
  onAddTask: (title: string, date: string, color: string) => void;
  onEditTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, date: string, dropIndex: number) => void;
  touchDrag: TouchDrag;
}

const ListView: React.FC<Props> = ({
  days,
  getTasksForDate,
  getHolidaysForDate,
  searchQuery,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  touchDrag,
}) => {
  const [addingDate, setAddingDate] = useState<string | null>(null);
  const query = searchQuery.toLowerCase();

  const currentMonthDays = days.filter((d) => d.isCurrentMonth);

  const handleDrop = useCallback(
    (e: React.DragEvent, date: string, taskCount: number) => {
      onDrop(e, date, taskCount);
    },
    [onDrop]
  );

  return (
    <ListViewWrapper>
      {currentMonthDays.map((day) => {
        const tasks = getTasksForDate(day.date);
        const holidays = getHolidaysForDate(day.date);
        const dayOfWeek = new Date(day.date + 'T00:00:00').getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        return (
          <ListDayRow
            key={day.date}
            $isToday={day.isToday}
            $isCurrentMonth={day.isCurrentMonth}
            data-drop-date={day.date}
            onDragOver={onDragOver}
            onDrop={(e) => handleDrop(e, day.date, tasks.length)}
          >
            <ListDayHeader>
              <ListDayDate $isToday={day.isToday} $isWeekend={isWeekend}>
                {day.dayNumber} <ListDayName>{DAY_NAMES[dayOfWeek]}</ListDayName>
              </ListDayDate>
              {tasks.length > 0 && (
                <ListDayName>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</ListDayName>
              )}
            </ListDayHeader>

            <HolidayBadge holidays={holidays} />

            {tasks.length > 0 && (
              <ListTaskList>
                {tasks.map((task, index) => {
                  const dimmed = query.length > 0 && !task.title.toLowerCase().includes(query);
                  return (
                    <div
                      key={task._id}
                      data-task
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => {
                        e.stopPropagation();
                        onDrop(e, day.date, index);
                      }}
                      onTouchStart={(e) => touchDrag.handleTouchStart(e, task)}
                      onTouchMove={touchDrag.handleTouchMove}
                      onTouchEnd={touchDrag.handleTouchEnd}
                    >
                      <TaskItem
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        dimmed={dimmed}
                        onDragStart={(e) => onDragStart(e, task)}
                        onDragEnd={onDragEnd}
                      />
                    </div>
                  );
                })}
              </ListTaskList>
            )}

            {addingDate === day.date ? (
              <AddTaskArea data-task>
                <TaskInput
                  onSubmit={(title, color) => {
                    onAddTask(title, day.date, color);
                    setAddingDate(null);
                  }}
                  onCancel={() => setAddingDate(null)}
                />
              </AddTaskArea>
            ) : (
              <ListAddBtn onClick={() => setAddingDate(day.date)}>+ Add task</ListAddBtn>
            )}
          </ListDayRow>
        );
      })}
    </ListViewWrapper>
  );
};

export default ListView;
