import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTankModalComponent } from './create-tank-modal.component';

describe('CreateTankModalComponent', () => {
  let component: CreateTankModalComponent;
  let fixture: ComponentFixture<CreateTankModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTankModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTankModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
