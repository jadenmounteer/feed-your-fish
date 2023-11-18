import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tank } from 'src/app/types/tank';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { TankService } from 'src/app/services/tank.service';

@Component({
  selector: 'app-create-tank-modal',
  templateUrl: './create-tank-modal.component.html',
  styleUrls: ['./create-tank-modal.component.scss'],
})
export class CreateTankModalComponent {
  protected newTank: Partial<Tank> = {
    id: '',
    collaboratorIds: [],
    usersWatchingTank: [],
  };

  constructor(
    public activeModal: NgbActiveModal,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private tankService: TankService
  ) {}
}
