import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiChipsComponent } from '../chips.component';

describe('ChipsComponent', () => {
  let component: UsiChipsComponent;
  let fixture: ComponentFixture<UsiChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiChipsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
