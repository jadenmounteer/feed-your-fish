import { Component } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-fish-stats-section',
  templateUrl: './fish-stats-section.component.html',
  styleUrls: ['./fish-stats-section.component.scss'],
})
export class FishStatsSectionComponent {
  constructor(protected iconService: IconService) {}
}
