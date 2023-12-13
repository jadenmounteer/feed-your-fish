import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tank } from 'src/app/types/tank';
import { Fish, FishType } from 'src/app/types/fish';
import { IconService } from 'src/app/services/icon.service';
import { AuthService } from 'src/app/services/auth.service';
import { FishService } from 'src/app/services/fish.service';
import { catchError, tap, throwError } from 'rxjs';
import { TankService } from 'src/app/services/tank.service';

@Component({
  selector: 'app-add-fish-modal',
  templateUrl: './add-fish-modal.component.html',
  styleUrls: ['./add-fish-modal.component.scss'],
})
export class AddFishModalComponent {
  @Input() tank!: Tank;
  protected contentLoaded: boolean = false;
  protected fishChosen: boolean = false;
  protected fishType: FishType | undefined;
  protected fishName: string = '';
  protected alertMessage: string = '';
  protected showAlert: boolean = false;
  protected nameChosen: boolean = false;
  protected step1: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private angularFirestore: AngularFirestore,
    protected iconService: IconService,
    private authService: AuthService,
    private fishService: FishService,
    private tankService: TankService
  ) {
    this.contentLoaded = true;
  }

  protected onSelectFishType(fishType: FishType): void {
    this.fishChosen = true;
    this.fishType = fishType;
  }

  protected generateRandomName(): void {
    const randomNames = [
      'Gerald',
      'Geraldine',
      'Gary',
      'Goldie',
      'Bubbles',
      'Nemo',
      'Nathan',
      'Nancy',
      'Junior',
      'Dory',
      'Bub',
      'Bubba',
      'Lucy',
      'Chris',
      'Sally',
      'Martha',
      'Bob',
      'Squishy',
      'Sam',
      'Samantha',
      'Squirt',
      'Bruce',
      'Rex',
      'George',
      'Fred',
      'Frank',
      'Tina',
      'Terry',
      'Trevor',
      'Toby',
      'Tim',
      'Tom',
      'Tammy',
      'Velma',
      'Vicky',
      'Vivian',
      'Wendy',
      'Wanda',
      'Walter',
      'Xavier',
      'Xena',
      'Yolanda',
      'Yvonne',
      'Yvette',
      'Zelda',
      'Zoey',
      'Zach',
      'Jeff',
      'Jenny',
      'Jill',
      'Jack',
      'Jared',
      'Jesse',
      'Jasmine',
      'Jasper',
      'Joey',
      'Jade',
      'Rick',
      'Morty',
      'Summer',
      'Beth',
      'Cpt. Crunch',
      'Tony the Tiger',
      'Toucan Sam',
      'Snap',
      'Crackle',
      'Pop',
      'Mr. Owl',
      'Sugar Bear',
      'Tiger',
      'Flakey',
      'Cpt. Jack',
      'Cpt. Morgan',
      'Cpt. Hook',
      'Cpt. Nemo',
      'Bill',
      'Ted',
      'Rufus',
      'Barney',
      'Flipper',
      'Finley',
      'Jaws',
      'Sharky',
      'Sharkbait',
      'Sharknado',
      'Sharkisha',
      'Calypso',
      'Ariel',
      'Sebastian',
      'Flounder',
      'Ursula',
      'Davy Jones',
      'Marlin',
      'Larry',
      'Moe',
      'Sushi',
      'Fin',
      'Angel',
      'Otto',
      'Oscar',
      'Long John Silver',
      'Chip',
      'Slimy Steve',
      'Big Joe',
      'Big Bertha',
      'Rocky',
      'Bartholomew ',
    ];

    const randomIndex = Math.floor(Math.random() * randomNames.length);
    this.fishName = randomNames[randomIndex];
  }

  protected nameFish() {
    this.showAlert = false;
    if (this.fishName === '') {
      this.showAlert = true;
      this.alertMessage = 'Please enter a name for your fish.';
      return;
    }
    this.nameChosen = true;
  }

  protected addToTank(): void {
    this.showAlert = false;

    if (!this.step1) {
      this.showAlert = true;
      this.alertMessage = 'Please fill out step 1.';
      return;
    }

    if (!this.fishType) {
      return;
    }

    const newFish: Fish = {
      fishId: this.angularFirestore.createId(),
      fishName: this.fishName,
      fishType: this.fishType,
      feedingSteps: [this.step1],
      fishStatus: 'Happy',
      daysUntilStatusChange: 1,
      createdDate: new Date(),
      dateOfLastFeeding: new Date(),
      userId: this.authService.userId,
      swimmingSpeed: '5s',
      swimmingDirection: 'stand-still',
      xPosition: 0,
      yPosition: 0,
    };

    this.tank.fishes.push(newFish);

    this.tankService
      .updateTank(this.tank.id, this.tank)
      .pipe(
        tap((tank) => {
          this.tankService.tankViewingChanged.next(this.tank);

          this.activeModal.close(tank);
        }),
        catchError((err) => {
          this.showAlert = true;
          this.alertMessage = err;
          return throwError(err);
        })
      )
      .subscribe();
  }
}
