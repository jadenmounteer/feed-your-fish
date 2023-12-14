import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStatsModalComponent } from './fish-stats-modal.component';

describe('FishStatsModalComponent', () => {
  let component: FishStatsModalComponent;
  let fixture: ComponentFixture<FishStatsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishStatsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishStatsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
