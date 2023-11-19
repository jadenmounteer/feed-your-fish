import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStatsComponent } from './fish-stats.component';

describe('FishStatsComponent', () => {
  let component: FishStatsComponent;
  let fixture: ComponentFixture<FishStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
