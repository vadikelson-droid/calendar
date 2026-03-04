import React, { useState } from 'react';
import type { Task } from '../../types';
import { TaskCard, TaskTitle, TaskActions, TaskActionBtn } from './styles';
import TaskInput from './TaskInput';

interface Props {
  task: Task;
  onEdit: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  dimmed?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

const TaskItem: React.FC<Props> = ({ task, onEdit, onDelete, dimmed, draggable = true, onDragStart, onDragEnd }) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <TaskInput
        initialTitle={task.title}
        initialColor={task.color}
        onSubmit={(title, color) => {
          onEdit(task._id, { title, color });
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <TaskCard
      $color={task.color}
      $dimmed={dimmed}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDoubleClick={() => setEditing(true)}
    >
      <TaskTitle>{task.title}</TaskTitle>
      <TaskActions>
        <TaskActionBtn onClick={() => setEditing(true)} title="Edit">✎</TaskActionBtn>
        <TaskActionBtn onClick={() => onDelete(task._id)} title="Delete">✕</TaskActionBtn>
      </TaskActions>
    </TaskCard>
  );
};

export default TaskItem;
