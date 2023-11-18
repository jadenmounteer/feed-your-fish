import { Component, Input } from '@angular/core';
import { Tank } from 'src/app/types/tank';

@Component({
  selector: 'app-tank-info',
  templateUrl: './tank-info.component.html',
  styleUrls: ['./tank-info.component.scss'],
})
export class TankInfoComponent {
  @Input() userEmail: string | null | undefined;
  @Input() userId: string | undefined;

  protected tanks: Tank[] = [];
}
