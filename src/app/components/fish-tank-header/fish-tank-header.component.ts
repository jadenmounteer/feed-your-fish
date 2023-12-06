import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-fish-tank-header',
  templateUrl: './fish-tank-header.component.html',
  styleUrls: ['./fish-tank-header.component.scss'],
})
export class FishTankHeaderComponent {
  constructor(public icon: IconService, protected authService: AuthService) {}
}
