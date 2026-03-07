import React, { useState, useCallback } from 'react';
import type { DayData, Task, Holiday } from '../../types';
import { DayCellWrapper, DayNumber, CardCount, TaskList, AddTaskArea } from './styles';
import TaskItem from '../Task/TaskItem';
import TaskInput from '../Task/TaskInput';
import HolidayBadge from '../Holiday/HolidayBadge';

interface TouchDrag {
  handleTouchStart: (e: React.TouchEvent, task: Task) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
}

interface Props {
  day: DayData;
  tasks: Task[];
  holidays: Holiday[];
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

const DayCell: React.FC<Props> = ({
  day,
  tasks,
  holidays,
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
  const [showInput, setShowInput] = useState(false);

  const handleCellClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-task]') || (e.target as HTMLElement).closest('input')) return;
      setShowInput(true);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      onDrop(e, day.date, tasks.length);
    },
    [onDrop, day.date, tasks.length]
  );

  const handleTaskDrop = useCallback(
    (e: React.DragEvent, index: number) => {
      e.stopPropagation();
      onDrop(e, day.date, index);
    },
    [onDrop, day.date]
  );

  const query = searchQuery.toLowerCase();

  return (
    <DayCellWrapper
      $isCurrentMonth={day.isCurrentMonth}
      $isToday={day.isToday}
      data-drop-date={day.date}
      onClick={handleCellClick}
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      <DayNumber $isCurrentMonth={day.isCurrentMonth} $isToday={day.isToday}>
        {day.dayNumber}
        {tasks.length > 0 && <CardCount>{tasks.length} card{tasks.length !== 1 ? 's' : ''}</CardCount>}
      </DayNumber>

      <HolidayBadge holidays={holidays} />

      <TaskList>
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
              onDrop={(e) => handleTaskDrop(e, index)}
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
      </TaskList>

      {showInput && (
        <AddTaskArea data-task>
          <TaskInput
            onSubmit={(title, color) => {
              onAddTask(title, day.date, color);
              setShowInput(false);
            }}
            onCancel={() => setShowInput(false)}
          />
        </AddTaskArea>
      )}
    </DayCellWrapper>
  );
};

export default DayCell;
