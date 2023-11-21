import { Component, Input } from '@angular/core';
import { Fish } from '../types/fish';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-fish-modal',
  templateUrl: './remove-fish-modal.component.html',
  styleUrls: ['./remove-fish-modal.component.scss'],
})
export class RemoveFishModalComponent {
  @Input() fish!: Fish;
  protected contentLoaded: boolean = true;
  protected showAlert: boolean = false;
  protected alertMessage: string = '';

  constructor(protected activeModal: NgbActiveModal) {}
}
