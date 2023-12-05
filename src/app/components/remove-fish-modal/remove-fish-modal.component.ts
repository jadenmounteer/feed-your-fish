import { Component, Input, OnInit } from '@angular/core';
import { Fish } from '../../types/fish';
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
    this.eulogy = this.generateRandomEulogyForDeadFish();
    this.contentLoaded = true;
  }

  private generateRandomEulogyForDeadFish(): string {
    const string = `RIP ${this.fish.fishName}...`;
    const eulogies: string[] = [
      `${this.fish.fishName} the ${this.fish.fishType}, You were a good fish. You will be missed.`,
      `RIP ${this.fish.fishName} the ${this.fish.fishType}, you were a good fish. You will be missed.`,
      `What can be said about ${this.fish.fishName} the ${this.fish.fishType}? They were a good fish. They will be missed.`,
      `${this.fish.fishName} was about the best ${this.fish.fishType} you could ever own. They will be missed.`,
      `${this.fish.fishName} was a ${this.fish.fishType} of few words, but they were a good fish. They will be missed.`,
      `${this.fish.fishName} lived a long and happy life as a ${this.fish.fishType}. They will be missed.`,
    ];
    const randomIndex = Math.floor(Math.random() * eulogies.length);
    return eulogies[randomIndex];
  }
}
