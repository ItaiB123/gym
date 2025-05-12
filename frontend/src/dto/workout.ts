import type { User } from "./User";

export interface Workout {
    id: string;
    date: string;
    startTime: string;
    durationInMinutes: number;
    instructors: User[];
    clients: User[];
  }