import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { AddFishModalComponent } from '../add-fish-modal/add-fish-modal.component';
import { Tank } from 'src/app/types/tank';
import { TankService } from 'src/app/services/tank.service';
import { Fish } from 'src/app/types/fish';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fish-stats-section',
  templateUrl: './fish-stats-section.component.html',
  styleUrls: ['./fish-stats-section.component.scss'],
})
export class FishStatsSectionComponent {
  @Input() tank!: Tank;

  constructor(
    protected iconService: IconService,
    private modalService: NgbModal,
    private tankService: TankService,
    protected authService: AuthService
  ) {}

  protected addFish(): void {
    const modalRef = this.modalService.open(AddFishModalComponent);
    modalRef.componentInstance.tank = this.tank;
  }
}
