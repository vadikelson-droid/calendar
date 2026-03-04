export interface Task {
  _id: string;
  title: string;
  date: string;
  order: number;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  types: string[];
}

export interface DayData {
  date: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}
