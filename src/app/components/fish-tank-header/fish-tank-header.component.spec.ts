import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishTankHeaderComponent } from './fish-tank-header.component';

describe('FishTankHeaderComponent', () => {
  let component: FishTankHeaderComponent;
  let fixture: ComponentFixture<FishTankHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishTankHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishTankHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
