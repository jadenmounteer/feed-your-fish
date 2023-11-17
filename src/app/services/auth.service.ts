import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { User } from 'src/app/types/user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AuthData } from '../types/auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  public userId: string | undefined;
  public user$: Observable<User | null | undefined>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  // The oath was inspired by https://fireship.io/lessons/angularfire-google-oauth/
  // Note that if you change domains, for the login with google to work you have to add the domain to the list of authorized domains in firebase console.
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: firebase.User | null) {
    this.userId = user?.uid;
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user?.uid}`
    );

    const data = {
      uid: user!.uid,
      email: user!.email,
      displayName: user!.displayName,
      photoURL: user!.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  iniAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.onSuccessfulAuthentication();
        this.updateUserData(user);
      } else {
        this.onUnsuccessfulAuthentication();
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.onSuccessfulAuthentication();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    // TODO Cancel subscriptions in your services here. (see videso 95 and 96)
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private onSuccessfulAuthentication() {
    this.isAuthenticated = true;
    this.authChange.next(true);
  }

  private onUnsuccessfulAuthentication() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['']);
  }
}
