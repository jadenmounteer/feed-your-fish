import { Fish } from './fish';

export interface Tank {
  id: string;
  collaboratorIds: string[] | undefined;
  tankName: string;
  fishes: Fish[] | undefined;
}
