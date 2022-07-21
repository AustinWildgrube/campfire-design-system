import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { UsiTextareaComponent } from '../textarea.component';

describe('UsiTextareaComponent', () => {
  let component: UsiTextareaComponent;
  let fixture: ComponentFixture<UsiTextareaComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTextareaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiTextareaComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a textarea', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
  });
});