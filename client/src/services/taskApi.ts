import type { Task } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://91.219.61.4/calendar/api';

export async function fetchTasks(month: string): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks?month=${month}`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(data: { title: string; date: string; color?: string }): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}

export async function reorderTasks(tasks: { id: string; date: string; order: number }[]): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tasks }),
  });
  if (!res.ok) throw new Error('Failed to reorder tasks');
}
