import { GoldfishComponent } from '../components/fish/goldfish/goldfish.component';

export interface Fish {
  id: string;
  userId: string | undefined;
  fishName: string;
  fishType: FishType;
  feedingSteps: string[];
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
