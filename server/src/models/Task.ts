import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  date: string; // "YYYY-MM-DD"
  order: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true, index: true },
    order: { type: Number, default: 0 },
    color: { type: String, default: '#4dabf7' },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);
