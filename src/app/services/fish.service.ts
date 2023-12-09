import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Fish,
  FishAnimationData,
  FishStatus,
  SwimmingDirection,
  SwimmingSpeed,
} from '../types/fish';
import { Observable, Subject, from, map } from 'rxjs';
import { convertFirestoreTimestampToDate } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class FishService {
  public animationChangeEmitter = new Subject<FishAnimationData>();
  constructor(private firestore: AngularFirestore) {}

  // TODO Replace this with the fish's swimming speed
  private swimmingSpeed = 0.3;

  // TODO These will be dynamic
  private fishHeight = 150;
  private fishWidth = 150;

  public updateFishStatus(fishes: Fish[]): void {
    fishes.forEach((fish) => {
      if (this.timeForStatusChange(fish)) {
        fish.fishStatus = this.getNewFishStatus(fish);
        fish.dateOfLastFeeding = new Date();
      }
    });
  }

  private timeForStatusChange(fish: Fish): boolean {
    const today = new Date();
    const lastStatusChange = convertFirestoreTimestampToDate(
      fish.dateOfLastFeeding
    );
    const timeSinceLastStatusChange =
      today.getTime() - lastStatusChange.getTime();
    const daysSinceLastStatusChange =
      timeSinceLastStatusChange / (1000 * 3600 * 24);
    if (daysSinceLastStatusChange > fish.daysUntilStatusChange) {
      return true;
    }
    return false;
  }

  private getNewFishStatus(fish: Fish): FishStatus {
    if (fish.fishStatus === 'Happy') {
      return 'Hungry';
    }
    return 'Dead';
  }

  public feedFish(fish: Fish): void {
    fish.dateOfLastFeeding = new Date();
    fish.fishStatus = 'Happy';
  }

  public chooseRandomDirectionToSwimIn(): SwimmingDirection {
    const randomNumber = Math.floor(Math.random() * 6);
    switch (randomNumber) {
      case 0:
        return 'swim-left';
      case 1:
        return 'swim-right';
      case 2:
        return 'swim-up-left';
      case 3:
        return 'swim-down-left';
      case 4:
        return 'swim-up-right';
      case 5:
        return 'swim-down-right';
      default:
        return 'stand-still';
    }
  }

  public chooseRandomSpeed(): SwimmingSpeed {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? '5s' : '30s';
  }

  public initializeXPosition(
    swimmingDirection: SwimmingDirection,
    screenWidth: number
  ): number {
    if (swimmingDirection === 'swim-left') {
      return this.getRandomNumberBetween(0, screenWidth - this.fishWidth);
    } else if (swimmingDirection === 'swim-right') {
      return this.getRandomNumberBetween(0, screenWidth - this.fishWidth);
    } else if (swimmingDirection === 'swim-up-left') {
      return this.getRandomNumberBetween(0, screenWidth - this.fishWidth);
    } else if (swimmingDirection === 'swim-up-right') {
      return this.getRandomNumberBetween(0, screenWidth - this.fishWidth);
    } else if (swimmingDirection === 'swim-down-left') {
      return this.getRandomNumberBetween(0, screenWidth - this.fishWidth);
    } else if (swimmingDirection === 'swim-down-right') {
      return this.getRandomNumberBetween(0, screenWidth - this.fishWidth);
    }

    return 0;
  }

  public initializeYPosition(
    swimmingDirection: SwimmingDirection,
    screenHeight: number
  ): number {
    if (swimmingDirection === 'swim-left') {
      return this.getRandomNumberBetween(0, screenHeight);
    } else if (swimmingDirection === 'swim-right') {
      this.getRandomNumberBetween(0, screenHeight);
    } else if (swimmingDirection === 'swim-up-left') {
      return this.getRandomNumberBetween(0, screenHeight);
    } else if (swimmingDirection === 'swim-up-right') {
      return this.getRandomNumberBetween(0, screenHeight);
    } else if (swimmingDirection === 'swim-down-left') {
      return this.getRandomNumberBetween(0, screenHeight);
    } else if (swimmingDirection === 'swim-down-right') {
      return this.getRandomNumberBetween(0, screenHeight);
    } else if (swimmingDirection === 'stand-still') {
      return this.getRandomNumberBetween(0, screenHeight);
    }

    return 0;
  }

  private getRandomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  public swimLeft(fish: Fish) {
    const fishAnimationData: FishAnimationData = {
      fishName: fish.fishName,
      fishAnimation: 'swimLeft',
    };

    this.animationChangeEmitter.next(fishAnimationData);
    fish.xPosition -= this.swimmingSpeed;
  }

  public swimRight(fish: Fish) {
    const fishAnimationData: FishAnimationData = {
      fishName: fish.fishName,
      fishAnimation: 'swimRight',
    };

    this.animationChangeEmitter.next(fishAnimationData);
    fish.xPosition += this.swimmingSpeed;
  }

  public standStill(fish: Fish) {
    const fishAnimationData: FishAnimationData = {
      fishName: fish.fishName,
      fishAnimation: 'swimLeft',
    };

    this.animationChangeEmitter.next(fishAnimationData);
    fish.xPosition = fish.xPosition;
    fish.yPosition = fish.yPosition;
  }

  public swimUpLeft(fish: Fish) {
    const fishAnimationData: FishAnimationData = {
      fishName: fish.fishName,
      fishAnimation: 'swimLeft',
    };

    this.animationChangeEmitter.next(fishAnimationData);
    fish.xPosition -= this.swimmingSpeed;
    fish.yPosition -= this.swimmingSpeed;
  }

  public swimUpRight(fish: Fish) {
    const fishAnimationData: FishAnimationData = {
      fishName: fish.fishName,
      fishAnimation: 'swimRight',
    };

    this.animationChangeEmitter.next(fishAnimationData);
    fish.xPosition += this.swimmingSpeed;
    fish.yPosition -= this.swimmingSpeed;
  }

  public swimDownLeft(fish: Fish) {
    const fishAnimationData: FishAnimationData = {
      fishName: fish.fishName,
      fishAnimation: 'swimLeft',
    };

    this.animationChangeEmitter.next(fishAnimationData);
    fish.xPosition -= this.swimmingSpeed;
    fish.yPosition += this.swimmingSpeed;
  }

  public swimDownRight(fish: Fish) {
    const fishAnimationData: FishAnimationData = {
      fishName: fish.fishName,
      fishAnimation: 'swimRight',
    };

    this.animationChangeEmitter.next(fishAnimationData);
    fish.xPosition += this.swimmingSpeed;
    fish.yPosition += this.swimmingSpeed;
  }

  public fishTooFarLeft(fish: Fish, screenWidth: number): boolean {
    if (fish.xPosition <= 0) {
      return true;
    }
    return false;
  }

  public fishTooFarRight(fish: Fish, screenWidth: number): boolean {
    if (fish.xPosition >= screenWidth - this.fishWidth) {
      return true;
    }
    return false;
  }

  public fishTooFarUp(fish: Fish, screenHeight: number): boolean {
    // TODO return true if fish.yPosition <= 0
    if (fish.yPosition <= 0) {
      return true;
    }
    return false;
  }

  public fishTooFarDown(fish: Fish, screenHeight: number): boolean {
    if (fish.yPosition >= screenHeight - this.fishHeight) {
      return true;
    }
    return false;
  }
}
