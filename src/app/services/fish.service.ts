import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Fish, FishStatus } from '../types/fish';
import { Observable, from, map } from 'rxjs';
import { convertFirestoreTimestampToDate } from './db-utils';

@Injectable({
  providedIn: 'root',
})
export class FishService {
  constructor(private firestore: AngularFirestore) {}

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
}
