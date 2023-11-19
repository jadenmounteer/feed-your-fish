import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStatsSectionComponent } from './fish-stats-section.component';

describe('FishStatsSectionComponent', () => {
  let component: FishStatsSectionComponent;
  let fixture: ComponentFixture<FishStatsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishStatsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishStatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
