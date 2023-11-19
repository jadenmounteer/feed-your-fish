import { Injectable } from '@angular/core';
import {
  faDumbbell,
  faUser,
  faEdit,
  faPlus,
  faPencilAlt,
  faTools,
  faTrashAlt,
  faArrowLeft,
  faGamepad,
  faAdd,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  public faDumbbell = faDumbbell;
  public faUser = faUser;
  public faGoogle = faGoogle;
  public faEdit = faEdit;
  public faPlus = faPlus;
  public faPencilAlt = faPencilAlt;
  public faTools = faTools;
  public faTrashAlt = faTrashAlt;
  public faArrowLeft = faArrowLeft;
  public faGamepad = faGamepad;
  public faAdd = faAdd;
  public faArrowRight = faArrowRight;

  constructor() {}
}
