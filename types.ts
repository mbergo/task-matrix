
export enum Quadrant {
  UrgentImportant = 'Q1',
  NotUrgentImportant = 'Q2',
  UrgentNotImportant = 'Q3',
  NotUrgentNotImportant = 'Q4',
}

export interface Task {
  id: string;
  title: string;
  quadrant: Quadrant;
}
