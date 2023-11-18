import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankInfoComponent } from './tank-info.component';

describe('TankInfoComponent', () => {
  let component: TankInfoComponent;
  let fixture: ComponentFixture<TankInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
