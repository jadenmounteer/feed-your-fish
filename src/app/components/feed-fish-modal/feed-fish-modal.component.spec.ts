import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFishModalComponent } from './feed-fish-modal.component';

describe('FeedFishModalComponent', () => {
  let component: FeedFishModalComponent;
  let fixture: ComponentFixture<FeedFishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedFishModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedFishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
