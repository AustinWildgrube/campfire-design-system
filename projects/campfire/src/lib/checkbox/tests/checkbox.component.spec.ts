import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiCheckboxComponent } from '../checkbox.component';

describe('CheckboxComponent', () => {
  let component: UsiCheckboxComponent;
  let fixture: ComponentFixture<UsiCheckboxComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiCheckboxComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiCheckboxComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(debugElement.nativeElement.querySelector('.usi-checkbox')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-checkbox__input')).toBeTruthy();
  });

  it('should emit event when checked', () => {
    expect(debugElement.nativeElement.querySelector('.usi-checkbox__input').checked).toBeFalsy();

    debugElement.nativeElement.querySelector('.usi-checkbox__input').click();
    expect(debugElement.nativeElement.querySelector('.usi-checkbox__input').checked).toBe(true);

    debugElement.nativeElement.querySelector('.usi-checkbox__input').click();
    expect(debugElement.nativeElement.querySelector('.usi-checkbox__input').checked).toBeFalsy();
  });

  it('should be required', () => {
    component.usiRequired = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-checkbox__input').required).toBeTruthy();
  });

  it('should disable checkbox', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    expect(component.usiDisabled).toBeTruthy();

    fixture.detectChanges();
    expect(component.value).toBe(false);

    debugElement.nativeElement.click();

    fixture.detectChanges();
    expect(component.value).toBe(false);
  });
});
