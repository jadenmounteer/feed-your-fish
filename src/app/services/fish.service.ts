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
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? 'swim-left' : 'swim-right';
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
    }
    return 0;
  }

  private getRandomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }
}
