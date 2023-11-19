import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Tank } from 'src/app/types/tank';
import { FishType } from 'src/app/types/fish';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-add-fish-modal',
  templateUrl: './add-fish-modal.component.html',
  styleUrls: ['./add-fish-modal.component.scss'],
})
export class AddFishModalComponent {
  @Input() tank!: Tank;
  protected contentLoaded: boolean = false;
  protected fishChosen: boolean = false;
  protected fishType: FishType | undefined;
  protected fishName: string = '';
  protected alertMessage: string = '';
  protected showAlert: boolean = false;
  protected nameChosen: boolean = false;
  protected step1: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private angularFirestore: AngularFirestore,
    protected iconService: IconService
  ) {
    this.contentLoaded = true;
  }

  protected onSelectFishType(fishType: FishType): void {
    this.fishChosen = true;
    this.fishType = fishType;
  }

  protected nameFish() {
    this.showAlert = false;
    if (this.fishName === '') {
      this.showAlert = true;
      this.alertMessage = 'Please enter a name for your fish.';
      return;
    }
    this.nameChosen = true;
  }

  protected addToTank(): void {
    this.showAlert = false;
  }
}
