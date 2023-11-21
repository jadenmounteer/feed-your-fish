import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Fish } from '../types/fish';

@Component({
  selector: 'app-feed-fish-modal',
  templateUrl: './feed-fish-modal.component.html',
  styleUrls: ['./feed-fish-modal.component.scss'],
})
export class FeedFishModalComponent {
  @Input() fish!: Fish;
  protected contentLoaded: boolean = true;
  protected showAlert: boolean = false;
  protected alertMessage: string = '';

  constructor(protected activeModal: NgbActiveModal) {}
}
