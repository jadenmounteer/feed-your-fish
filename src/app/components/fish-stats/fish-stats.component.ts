import { Component, Input } from '@angular/core';
import { Fish } from 'src/app/types/fish';

@Component({
  selector: 'app-fish-stats',
  templateUrl: './fish-stats.component.html',
  styleUrls: ['./fish-stats.component.scss'],
})
export class FishStatsComponent {
  @Input() fish!: Fish;
}
