import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiChipGroupComponent } from '../chip-group.component';

describe('UsiChipGroupComponent', () => {
  let component: UsiChipGroupComponent;
  let fixture: ComponentFixture<UsiChipGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiChipGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiChipGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
