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
  swimmingSpeed: SwimmingSpeed;
  swimmingDirection: SwimmingDirection;
  xPosition: number;
  yPosition: number;
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

export type SwimmingDirection =
  | 'swim-left'
  | 'swim-right'
  | 'stand-still'
  | 'swim-up'
  | 'swim-down'
  | 'swim-up-left'
  | 'swim-up-right'
  | 'swim-down-left'
  | 'swim-down-right';

export type SwimmingSpeed = '5s' | '30s';

// TODO I will need to add the fish to their own collections so they have their own ID, but for now I compare by name
export type FishAnimationData = {
  fishName: string;
  fishAnimation: FishAnimation;
};

export type FishAnimation = 'swimLeft' | 'swimRight' | 'dead';
