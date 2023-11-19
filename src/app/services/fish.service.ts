import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Fish } from '../types/fish';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FishService {
  constructor(private firestore: AngularFirestore) {}

  public createFish(newFish: Partial<Fish>, fishId: string): Observable<any> {
    const createReviewObs$ = from(
      this.firestore.doc(`fish/${fishId}`).set(newFish)
    );

    return createReviewObs$.pipe(
      map((res) => {
        return {
          id: fishId,
          ...newFish,
        };
      })
    );
  }
}
