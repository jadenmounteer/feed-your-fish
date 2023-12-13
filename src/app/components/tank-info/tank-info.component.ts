import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tank-info',
  templateUrl: './tank-info.component.html',
  styleUrls: ['./tank-info.component.scss'],
})
export class TankInfoComponent implements OnInit {
  @Input() userEmail: string | null | undefined;
  @Input() userId!: string | undefined;

  @Output() toggleFishControls = new EventEmitter<boolean>();

  private showFishControls = false;

  constructor() {}

  ngOnInit(): void {
    if (!this.userId) {
      throw new Error('userId is undefined');
    }
  }

  protected onToggleFishControls(): void {
    this.showFishControls = !this.showFishControls;
    this.toggleFishControls.emit(this.showFishControls);
  }
}
