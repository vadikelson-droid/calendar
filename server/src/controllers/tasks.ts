import { Response } from 'express';
import Task from '../models/Task.js';
import type { AuthRequest } from '../middleware/auth.js';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { month } = req.query;
    const filter: Record<string, unknown> = { userId: req.userId };
    if (month && typeof month === 'string') {
      filter.date = { $regex: `^${month}` };
    }
    const tasks = await Task.find(filter).sort({ date: 1, order: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, date, color } = req.body;
    const maxOrder = await Task.findOne({ date, userId: req.userId }).sort({ order: -1 });
    const order = maxOrder ? maxOrder.order + 1 : 0;
    const task = await Task.create({ title, date, order, color, userId: req.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

export const reorderTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { tasks } = req.body;
    const ops = tasks.map((t: { id: string; date: string; order: number }) => ({
      updateOne: {
        filter: { _id: t.id, userId: req.userId },
        update: { $set: { date: t.date, order: t.order } },
      },
    }));
    await Task.bulkWrite(ops);
    res.json({ message: 'Tasks reordered' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reorder tasks' });
  }
};
