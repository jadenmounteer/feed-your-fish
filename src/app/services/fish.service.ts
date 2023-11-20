import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Fish, FishStatus } from '../types/fish';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FishService {
  constructor(private firestore: AngularFirestore) {}

  public updateFishStatus(fishes: Fish[]): void {
    fishes.forEach((fish) => {
      if (this.timeForStatusChange(fish)) {
        // TODO update the fish status
        fish.fishStatus = this.getNewFishStatus(fish);
        fish.dateOfLastFeeding = new Date();
      }
    });
  }

  private timeForStatusChange(fish: Fish): boolean {
    const today = new Date();
    const lastStatusChange = fish.dateOfLastFeeding;
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
}
