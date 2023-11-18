import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tank } from 'src/app/types/tank';
import { CreateTankModalComponent } from '../create-tank-modal/create-tank-modal.component';

@Component({
  selector: 'app-tank-info',
  templateUrl: './tank-info.component.html',
  styleUrls: ['./tank-info.component.scss'],
})
export class TankInfoComponent {
  @Input() userEmail: string | null | undefined;
  @Input() userId: string | undefined;

  protected tanks: Tank[] = [];

  constructor(private modalService: NgbModal) {}

  protected onCreateTank(): void {
    const modalRef = this.modalService.open(CreateTankModalComponent);
    modalRef.result.then((result) => {
      if (result !== undefined) {
        this.tanks.push(result);
      }
    });
  }
}
