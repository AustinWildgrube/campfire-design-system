import { DebugElement } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiTextareaComponent } from '../textarea.component';

import { UsiTextareaModule } from 'usi-campfire/textarea';

describe('UsiTextareaComponent', () => {
  let component: UsiTextareaComponent;
  let fixture: ComponentFixture<UsiTextareaComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTextareaComponent],
      imports: [UsiTextareaModule],
      providers: [FormGroupDirective],
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

  it('should be resizeable', () => {
    component.usiResizeable = true;
    fixture.detectChanges();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--resizeable')).toBeTruthy();
  });

  it('should have a min length', () => {
    component.usiMin = 5;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('[minlength="5"]')).toBeTruthy();
  });

  it('should have a max length', () => {
    component.usiMax = 10;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('[maxlength="10"]')).toBeTruthy();
  });
});
