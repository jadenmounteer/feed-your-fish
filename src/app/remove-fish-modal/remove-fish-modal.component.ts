import { Component, Input, OnInit } from '@angular/core';
import { Fish } from '../types/fish';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-fish-modal',
  templateUrl: './remove-fish-modal.component.html',
  styleUrls: ['./remove-fish-modal.component.scss'],
})
export class RemoveFishModalComponent implements OnInit {
  @Input() fish!: Fish;
  protected contentLoaded: boolean = false;
  protected showAlert: boolean = false;
  protected alertMessage: string = '';
  protected eulogy: string = '';

  constructor(protected activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.eulogy = this.generateEulogyForDeadFish();
    this.contentLoaded = true;
  }

  private generateEulogyForDeadFish(): string {
    return `Here lies ${this.fish.fishName}. They were a good fish. They will be missed.`;
  }
}
