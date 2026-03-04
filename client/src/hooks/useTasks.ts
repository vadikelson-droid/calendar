import { useState, useEffect, useCallback, useRef } from 'react';
import type { Task } from '../types';
import * as api from '../services/taskApi';

const LOCAL_KEY = 'calendar_tasks';

function loadLocal(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocal(tasks: Task[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
}

let idCounter = Date.now();

export function useTasks(monthKey: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const useLocalRef = useRef(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.fetchTasks(monthKey);
      setTasks(data);
      useLocalRef.current = false;
    } catch {
      const local = loadLocal();
      setTasks(local);
      useLocalRef.current = true;
    } finally {
      setLoading(false);
    }
  }, [monthKey]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const persist = useCallback((updatedTasks: Task[]) => {
    if (useLocalRef.current) {
      saveLocal(updatedTasks);
    }
  }, []);

  const addTask = useCallback(async (title: string, date: string, color?: string) => {
    if (!useLocalRef.current) {
      try {
        const task = await api.createTask({ title, date, color });
        setTasks((prev) => [...prev, task]);
        return;
      } catch {
        useLocalRef.current = true;
      }
    }
    setTasks((prev) => {
      const task: Task = {
        _id: String(idCounter++),
        title,
        date,
        order: prev.filter((t) => t.date === date).length,
        color: color || '#4dabf7',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const next = [...prev, task];
      persist(next);
      return next;
    });
  }, [persist]);

  const editTask = useCallback(async (id: string, updates: Partial<Task>) => {
    if (!useLocalRef.current) {
      try {
        const updated = await api.updateTask(id, updates);
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
        return;
      } catch {
        useLocalRef.current = true;
      }
    }
    setTasks((prev) => {
      const next = prev.map((t) => (t._id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t));
      persist(next);
      return next;
    });
  }, [persist]);

  const removeTask = useCallback(async (id: string) => {
    if (!useLocalRef.current) {
      try {
        await api.deleteTask(id);
        setTasks((prev) => prev.filter((t) => t._id !== id));
        return;
      } catch {
        useLocalRef.current = true;
      }
    }
    setTasks((prev) => {
      const next = prev.filter((t) => t._id !== id);
      persist(next);
      return next;
    });
  }, [persist]);

  const reorder = useCallback(async (reorderData: { id: string; date: string; order: number }[]) => {
    if (!useLocalRef.current) {
      try {
        await api.reorderTasks(reorderData);
      } catch {
        useLocalRef.current = true;
      }
    }
    setTasks((prev) => {
      const updated = [...prev];
      for (const r of reorderData) {
        const idx = updated.findIndex((t) => t._id === r.id);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], date: r.date, order: r.order };
        }
      }
      const sorted = updated.sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order);
      persist(sorted);
      return sorted;
    });
  }, [persist]);

  const getTasksForDate = useCallback(
    (date: string) => tasks.filter((t) => t.date === date).sort((a, b) => a.order - b.order),
    [tasks]
  );

  return { tasks, loading, addTask, editTask, removeTask, reorder, getTasksForDate, reload: loadTasks };
}
