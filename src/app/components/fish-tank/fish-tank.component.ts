import { Component, Input } from '@angular/core';
import { Tank } from 'src/app/types/tank';

@Component({
  selector: 'app-fish-tank',
  templateUrl: './fish-tank.component.html',
  styleUrls: ['./fish-tank.component.scss'],
})
export class FishTankComponent {
  @Input() tank!: Tank;
}
