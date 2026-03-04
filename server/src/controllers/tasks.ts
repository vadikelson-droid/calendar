import { Request, Response } from 'express';
import Task from '../models/Task.js';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { month } = req.query; // "YYYY-MM"
    const filter: Record<string, unknown> = {};
    if (month && typeof month === 'string') {
      filter.date = { $regex: `^${month}` };
    }
    const tasks = await Task.find(filter).sort({ date: 1, order: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, date, color } = req.body;
    const maxOrder = await Task.findOne({ date }).sort({ order: -1 });
    const order = maxOrder ? maxOrder.order + 1 : 0;
    const task = await Task.create({ title, date, order, color });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

export const reorderTasks = async (req: Request, res: Response) => {
  try {
    const { tasks } = req.body; // [{ id, date, order }]
    const ops = tasks.map((t: { id: string; date: string; order: number }) => ({
      updateOne: {
        filter: { _id: t.id },
        update: { $set: { date: t.date, order: t.order } },
      },
    }));
    await Task.bulkWrite(ops);
    res.json({ message: 'Tasks reordered' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reorder tasks' });
  }
};
