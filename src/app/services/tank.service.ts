import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, from, map } from 'rxjs';
import { Tank } from '../types/tank';
import { convertSnaps } from './db-utils';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class TankService {
  constructor(private firestore: AngularFirestore) {}

  public createTank(newTank: Partial<Tank>, tankId: string) {
    const createReviewObs$ = from(
      this.firestore.doc(`tanks/${tankId}`).set(newTank)
    );

    return createReviewObs$.pipe(
      map((res) => {
        return {
          id: tankId,
          ...newTank,
        };
      })
    );
  }

  public fetchTanksByUser(userId: string): Observable<Tank[]> {
    return this.firestore
      .collection('tanks', (ref) =>
        ref.where('collaboratorIds', 'array-contains', userId)
      )
      .get()
      .pipe(map((result) => convertSnaps<Tank>(result)));
  }

  public updateTank(tankId: string, changes: Partial<Tank>): Observable<any> {
    return from(this.firestore.doc(`tanks/${tankId}`).update(changes));
  }

  public updateUserData(
    userId: string,
    changes: Partial<User>
  ): Observable<any> {
    return from(this.firestore.doc(`users/${userId}`).update(changes));
  }

  public getUserData(userId: string): Observable<User[]> {
    return this.firestore
      .collection('users', (ref) => ref.where('uid', '==', userId))
      .get()
      .pipe(map((result) => convertSnaps<User>(result)));
  }

  public getTankUserIsViewing(idOfTankViewing: string, tanks: Tank[]): Tank {
    return tanks.filter((tank) => tank.id === idOfTankViewing)[0];
  }

  public deleteReview(tankId: string): Observable<void> {
    return from(this.firestore.doc(`tanks/${tankId}`).delete());
  }
}
