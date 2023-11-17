import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldfishComponent } from './goldfish.component';

describe('GoldfishComponent', () => {
  let component: GoldfishComponent;
  let fixture: ComponentFixture<GoldfishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldfishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldfishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
