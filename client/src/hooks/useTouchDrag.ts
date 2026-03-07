import { useRef, useCallback } from 'react';
import type { Task } from '../types';

interface TouchDragState {
  task: Task;
  startX: number;
  startY: number;
  ghost: HTMLElement | null;
  moved: boolean;
}

interface UseTouchDragOptions {
  getTasksForDate: (date: string) => Task[];
  reorder: (data: { id: string; date: string; order: number }[]) => void;
}

export function useTouchDrag({ getTasksForDate, reorder }: UseTouchDragOptions) {
  const stateRef = useRef<TouchDragState | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent, task: Task) => {
    const touch = e.touches[0];
    stateRef.current = {
      task,
      startX: touch.clientX,
      startY: touch.clientY,
      ghost: null,
      moved: false,
    };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const state = stateRef.current;
    if (!state) return;

    const touch = e.touches[0];
    const dx = touch.clientX - state.startX;
    const dy = touch.clientY - state.startY;

    // Only start drag after 10px movement
    if (!state.moved && Math.abs(dx) < 10 && Math.abs(dy) < 10) return;

    if (!state.moved) {
      state.moved = true;
      // Create ghost element
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const ghost = target.cloneNode(true) as HTMLElement;
      ghost.style.cssText = `
        position: fixed;
        left: ${rect.left}px;
        top: ${rect.top}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        opacity: 0.85;
        z-index: 9999;
        pointer-events: none;
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        border-radius: 6px;
        transition: none;
      `;
      document.body.appendChild(ghost);
      state.ghost = ghost;
      // Dim original
      (e.currentTarget as HTMLElement).style.opacity = '0.3';
    }

    e.preventDefault();

    if (state.ghost) {
      state.ghost.style.left = `${touch.clientX - state.ghost.offsetWidth / 2}px`;
      state.ghost.style.top = `${touch.clientY - state.ghost.offsetHeight / 2}px`;
    }

    // Highlight drop target
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    document.querySelectorAll('[data-drop-date]').forEach((node) => {
      (node as HTMLElement).style.outline = '';
    });
    const dropTarget = el?.closest('[data-drop-date]') as HTMLElement | null;
    if (dropTarget) {
      dropTarget.style.outline = '2px solid #3B82F6';
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const state = stateRef.current;
    if (!state) return;

    // Clean up highlight
    document.querySelectorAll('[data-drop-date]').forEach((node) => {
      (node as HTMLElement).style.outline = '';
    });

    // Restore original opacity
    (e.currentTarget as HTMLElement).style.opacity = '';

    if (state.ghost) {
      const ghostRect = state.ghost.getBoundingClientRect();
      const centerX = ghostRect.left + ghostRect.width / 2;
      const centerY = ghostRect.top + ghostRect.height / 2;
      state.ghost.remove();

      // Find drop target
      const el = document.elementFromPoint(centerX, centerY);
      const dropTarget = el?.closest('[data-drop-date]') as HTMLElement | null;

      if (dropTarget) {
        const targetDate = dropTarget.dataset.dropDate!;
        const draggedTask = state.task;

        const sourceTasks = getTasksForDate(draggedTask.date).filter((t) => t._id !== draggedTask._id);
        const isSameDay = draggedTask.date === targetDate;
        const targetTasks = isSameDay ? sourceTasks : getTasksForDate(targetDate);

        const newTargetTasks = [...targetTasks, { ...draggedTask, date: targetDate }];

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
      }
    }

    stateRef.current = null;
  }, [getTasksForDate, reorder]);

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}
