import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-fish-modal',
  templateUrl: './add-fish-modal.component.html',
  styleUrls: ['./add-fish-modal.component.scss'],
})
export class AddFishModalComponent {
  protected contentLoaded: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private angularFirestore: AngularFirestore
  ) {
    this.contentLoaded = true;
  }

  protected onSubmit(form: NgForm): void {}
}
