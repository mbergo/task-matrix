
import { Quadrant } from './types';

interface QuadrantDetail {
  title: string;
  description: string;
  color: string;
  borderColor: string;
  textColor: string;
}

export const QUADRANT_DETAILS: Record<Quadrant, QuadrantDetail> = {
  [Quadrant.UrgentImportant]: {
    title: 'Urgent & Important',
    description: 'Do',
    color: 'bg-red-800/20',
    borderColor: 'border-red-600',
    textColor: 'text-red-300',
  },
  [Quadrant.NotUrgentImportant]: {
    title: 'Not Urgent & Important',
    description: 'Schedule',
    color: 'bg-green-800/20',
    borderColor: 'border-green-600',
    textColor: 'text-green-300',
  },
  [Quadrant.UrgentNotImportant]: {
    title: 'Urgent & Not Important',
    description: 'Delegate',
    color: 'bg-yellow-800/20',
    borderColor: 'border-yellow-600',
    textColor: 'text-yellow-300',
  },
  [Quadrant.NotUrgentNotImportant]: {
    title: 'Not Urgent & Not Important',
    description: 'Delete',
    color: 'bg-gray-800/20',
    borderColor: 'border-gray-600',
    textColor: 'text-gray-400',
  },
};
