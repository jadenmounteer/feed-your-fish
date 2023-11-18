import { Fish } from './fish';

export interface Tank {
  id: string;
  createdById: string;
  collaboratorIds: string[];
  usersWatchingTank: string[]; // Whoever has an id on this tank will default to watching it
  tankName: string;
  fishes: Fish[];
}
