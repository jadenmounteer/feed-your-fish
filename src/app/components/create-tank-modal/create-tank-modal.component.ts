import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tank } from 'src/app/types/tank';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { TankService } from 'src/app/services/tank.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-create-tank-modal',
  templateUrl: './create-tank-modal.component.html',
  styleUrls: ['./create-tank-modal.component.scss'],
})
export class CreateTankModalComponent {
  protected newTank: Partial<Tank> = {
    id: '',
    createdById: this.authService.userId,
    collaboratorIds: [],
    usersWatchingTank: [],
  };

  protected displayErrorMsg: boolean = false;
  protected errorMessage: string =
    'Unable to add fish tank. Please reach out to Jaden for help! 😭';

  constructor(
    public activeModal: NgbActiveModal,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private tankService: TankService
  ) {}

  protected onCreateTank() {
    const newTankId = this.angularFirestore.createId();

    this.newTank.createdById = this.authService.userId;

    this.tankService
      .createTank(this.newTank, newTankId)
      .pipe(
        tap((tank) => {
          this.activeModal.close(tank);
        }),
        catchError((err) => {
          this.displayErrorMsg = true;
          this.errorMessage = err;
          return throwError(err);
        })
      )
      .subscribe();
  }
}
