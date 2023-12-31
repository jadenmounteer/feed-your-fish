import { GoldfishComponent } from '../components/fish/goldfish/goldfish.component';

export interface Fish {
  fishId: string;
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
  | 'octopus'
  | 'shrimp'
  | 'crab'
  | 'lobster'
  | 'squid'
  | 'seahorse'
  | 'jellyfish'
  | 'starfish'
  | 'seaturtle'
  | 'whale'
  | 'dolphin'
  | 'blobfish'
  | 'nessie'
  | 'pufferfish'
  | 'anglerfish'
  | 'piranha'
  | 'swordfish'
  | 'clownfish'
  | 'salmon'
  | 'tuna'
  | 'marlin'
  | 'stingray'
  | 'eel';

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

export type FishAnimationData = {
  fishName: string;
  fishAnimation: FishAnimation;
  fishId: string;
};

export type FishAnimation = 'swimLeft' | 'swimRight' | 'dead';

export type FishDetails = {
  name: string;
  imageURL: string;
  feedingInformation: string;
  fishType: FishType;
};
