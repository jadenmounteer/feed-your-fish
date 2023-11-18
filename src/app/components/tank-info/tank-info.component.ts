import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tank-info',
  templateUrl: './tank-info.component.html',
  styleUrls: ['./tank-info.component.scss'],
})
export class TankInfoComponent {
  @Input() userEmail: string | null | undefined;
  @Input() userId: string | undefined;
}
