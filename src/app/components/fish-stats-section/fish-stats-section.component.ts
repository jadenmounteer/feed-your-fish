import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { AddFishModalComponent } from '../add-fish-modal/add-fish-modal.component';

@Component({
  selector: 'app-fish-stats-section',
  templateUrl: './fish-stats-section.component.html',
  styleUrls: ['./fish-stats-section.component.scss'],
})
export class FishStatsSectionComponent {
  constructor(
    protected iconService: IconService,
    private modalService: NgbModal
  ) {}

  protected addFish(): void {
    const modalRef = this.modalService.open(AddFishModalComponent);

    modalRef.result.then((result) => {
      if (result === 'Yes') {
      }
    });
  }
}
