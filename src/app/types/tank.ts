import { Fish } from './fish';

export interface Tank {
  id: string;
  collaboratorIds: string[] | undefined;
  usersWatchingTank: string[] | undefined; // Whoever has an id on this tank will default to watching it
  tankName: string;
  fishes: Fish[] | undefined;
}
