import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tank } from 'src/app/types/tank';
import { CreateTankModalComponent } from '../create-tank-modal/create-tank-modal.component';
import { TankService } from 'src/app/services/tank.service';

@Component({
  selector: 'app-tank-info',
  templateUrl: './tank-info.component.html',
  styleUrls: ['./tank-info.component.scss'],
})
export class TankInfoComponent implements OnInit {
  @Input() userEmail: string | null | undefined;
  @Input() userId!: string | undefined;

  @Input() tanks: Tank[] = [];
  @Input() tankUserIsViewing: Tank | undefined;

  @Output() toggleFishControls = new EventEmitter<boolean>();

  private showFishControls = false;

  constructor(
    private modalService: NgbModal,
    private tankService: TankService
  ) {}

  ngOnInit(): void {
    if (!this.userId) {
      throw new Error('userId is undefined');
    }
  }

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

  protected onToggleFishControls(): void {
    this.showFishControls = !this.showFishControls;
    this.toggleFishControls.emit(this.showFishControls);
  }
}
