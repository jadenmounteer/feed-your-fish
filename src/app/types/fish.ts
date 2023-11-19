import { GoldfishComponent } from '../components/fish/goldfish/goldfish.component';

export interface Fish {
  userId: string | undefined;
  fishName: string;
  fishType: FishType;
  feedingSteps: string[];
  fishStatus: FishStatus;
  daysUntilStatusChange: number;
  createdDate: Date;
  dateOfLastFeeding: Date;
}

export type FishType =
  | 'goldfish'
  | 'betta'
  | 'guppy'
  | 'tetra'
  | 'catfish'
  | 'shark'
  | 'mermaid'
  | 'octopus';

export type FishStatus = 'Happy' | 'Hungry' | 'Dead';
