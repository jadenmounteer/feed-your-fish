import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { IconService } from 'src/app/services/icon.service';
import { TankService } from 'src/app/services/tank.service';
import { Tank } from 'src/app/types/tank';
import { CreateTankModalComponent } from '../create-tank-modal/create-tank-modal.component';

@Component({
  selector: 'app-fish-tank-header',
  templateUrl: './fish-tank-header.component.html',
  styleUrls: ['./fish-tank-header.component.scss'],
})
export class FishTankHeaderComponent {
  @Input() tankUserIsViewing: Tank | undefined;
  @Input() tanks: Tank[] = [];
  constructor(
    public icon: IconService,
    protected authService: AuthService,
    private modalService: NgbModal,
    private tankService: TankService
  ) {}

  protected onCreateTank(): void {
    const modalRef = this.modalService.open(CreateTankModalComponent);
    modalRef.result.then((result) => {
      if (result !== undefined) {
        this.tanks.push(result);
        this.setUserCurrentlyViewingTank(result);
      }
    });
  }

  protected setUserCurrentlyViewingTank(tank: Tank): void {
    this.tankService.updateTankUserIsCurrentlyViewing(tank.id);
    this.tankUserIsViewing = tank;
    this.tankService.tankViewingChanged.next(tank);
  }
}
