import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFishModalComponent } from './add-fish-modal.component';

describe('AddFishModalComponent', () => {
  let component: AddFishModalComponent;
  let fixture: ComponentFixture<AddFishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFishModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
