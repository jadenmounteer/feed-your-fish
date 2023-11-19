import { GoldfishComponent } from '../components/fish/goldfish/goldfish.component';

export interface Fish {
  id: string;
  userId: string | undefined;
  name: string;
  fishType: FishType;
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
