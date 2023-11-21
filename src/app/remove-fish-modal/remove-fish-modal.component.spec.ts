import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFishModalComponent } from './remove-fish-modal.component';

describe('RemoveFishModalComponent', () => {
  let component: RemoveFishModalComponent;
  let fixture: ComponentFixture<RemoveFishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFishModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveFishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
