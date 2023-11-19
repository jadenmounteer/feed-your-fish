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
      fishName: this.fishName,
      fishType: this.fishType,
      feedingSteps: [this.step1],
      fishStatus: 'Happy',
      daysUntilStatusChange: 1,
      createdDate: new Date(),
      dateOfLastFeeding: new Date(),
      userId: this.authService.userId,
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
