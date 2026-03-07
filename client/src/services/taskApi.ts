import type { Task } from '../types';
import { getToken } from './authApi';

const API_URL = import.meta.env.VITE_API_URL || '/calendar/api';

function authHeaders(): Record<string, string> {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function fetchTasks(month: string): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks?month=${month}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(data: { title: string; date: string; color?: string }): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete task');
}

export async function reorderTasks(tasks: { id: string; date: string; order: number }[]): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/reorder`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ tasks }),
  });
  if (!res.ok) throw new Error('Failed to reorder tasks');
}
