import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Fish,
  FishStatus,
  SwimmingDirection,
  SwimmingSpeed,
} from '../types/fish';
import { Observable, from, map } from 'rxjs';
import { convertFirestoreTimestampToDate } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class FishService {
  constructor(private firestore: AngularFirestore) {}
  private MAXDIRECTIONRIGHT = 100;
  private MAXDIRECTIONLEFT = 0;
  // TODO Replace this with the fish's swimming speed
  private swimmingSpeed = 1;

  // TODO These will be dynamic
  private fishHeight = 300;
  private fishWidth = 300;

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
    const randomNumber = Math.floor(Math.random() * 9);
    switch (randomNumber) {
      case 0:
        return 'swim-left';
      case 1:
        return 'swim-right';
      case 2:
        return 'stand-still';
      case 3:
        return 'swim-up';
      case 4:
        return 'swim-down';
      case 5:
        return 'swim-up-left';
      case 6:
        return 'swim-up-right';
      case 7:
        return 'swim-down-left';
      case 8:
        return 'swim-down-right';
      default:
        return 'stand-still';
    }
  }

  public chooseRandomSpeed(): SwimmingSpeed {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? '5s' : '30s';
  }

  public initializeXPosition(swimmingDirection: SwimmingDirection): number {
    if (swimmingDirection === 'swim-left') {
      return this.getRandomNumberBetween(
        this.MAXDIRECTIONLEFT / 2,
        this.MAXDIRECTIONRIGHT
      );
    } else if (swimmingDirection === 'swim-right') {
      return this.getRandomNumberBetween(
        this.MAXDIRECTIONLEFT / 2,
        this.MAXDIRECTIONRIGHT
      );
    }
    return 0;
  }

  public initializeYPosition(swimmingDirection: SwimmingDirection): number {
    if (swimmingDirection === 'swim-left') {
      return this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    } else if (swimmingDirection === 'swim-right') {
      this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    } else if (swimmingDirection === 'swim-up') {
      return this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    } else if (swimmingDirection === 'swim-down') {
      return this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    } else if (swimmingDirection === 'swim-up-left') {
      return this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    } else if (swimmingDirection === 'swim-up-right') {
      return this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    } else if (swimmingDirection === 'swim-down-left') {
      return this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    } else if (swimmingDirection === 'swim-down-right') {
      return this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    } else if (swimmingDirection === 'stand-still') {
      return this.getRandomNumberBetween(0, this.MAXDIRECTIONRIGHT);
    }

    return 0;
  }

  private getRandomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  public swimLeft(fish: Fish) {
    fish.xPosition -= this.swimmingSpeed;
  }

  public swimRight(fish: Fish) {
    fish.xPosition += this.swimmingSpeed;
  }

  public swimUp(fish: Fish) {
    fish.yPosition -= this.swimmingSpeed;
  }

  public swimDown(fish: Fish) {
    fish.yPosition += this.swimmingSpeed;
  }

  public standStill(fish: Fish) {
    fish.xPosition = fish.xPosition;
    fish.yPosition = fish.yPosition;
  }

  public swimUpLeft(fish: Fish) {
    fish.xPosition -= this.swimmingSpeed;
    fish.yPosition -= this.swimmingSpeed;
  }

  public swimUpRight(fish: Fish) {
    fish.xPosition += this.swimmingSpeed;
    fish.yPosition -= this.swimmingSpeed;
  }

  public swimDownLeft(fish: Fish) {
    fish.xPosition -= this.swimmingSpeed;
    fish.yPosition += this.swimmingSpeed;
  }

  public swimDownRight(fish: Fish) {
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
