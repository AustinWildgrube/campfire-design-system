import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsiInputComponent } from '../input.component';

import { UsiSharedModule } from 'usi-campfire/shared';

describe('UsiInputComponent', () => {
  let component: UsiInputComponent;
  let fixture: ComponentFixture<UsiInputComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, UsiSharedModule],
      declarations: [UsiInputComponent],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiInputComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create an input', () => {
    expect(component).toBeTruthy();

    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
  });

  it('should change the type of the input', () => {
    expect(debugElement.nativeElement.querySelector('.usi-input-group input').type).toBe('text');

    component.usiType = 'number';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').type).toBe('number');

    component.usiType = 'password';
    component.usiPassword = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').type).toBe('password');
    expect(debugElement.nativeElement.querySelector('.usi-input-group__suffix--password')).toBeTruthy();

    component.usiType = 'email';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').type).toBe('email');
  });

  it('should have a placeholder', () => {
    component.usiPlaceholder = 'placeholder';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').placeholder).toBe('placeholder');
  });

  // TODO: error template

  it('should be disabled', () => {
    expect(component.formControlValue.disabled).toBeFalsy();

    component.formControlValue.disable();
    fixture.detectChanges();

    expect(component.formControlValue.disabled).toBeTruthy();
  });

  it('should be a required input', () => {
    component.usiRequired = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').required).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__label').textContent).toBe('  *');

    // TODO: expand to capture form input
  });

  it('should force an error', () => {
    component.usiForceError = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--error')).toBeTruthy();
  });

  it('should have a prefix and suffix icon', () => {
    component.usiPrefix = 'coffee';
    component.usiSuffix = 'coffee';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__prefix')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--prefix')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__suffix')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--suffix')).toBeTruthy();
  });

  it('should show a hint', () => {
    component.usiHint = 'hint';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__hint')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__hint').textContent).toBe('hint');
  });

  it('should remove the hint if there is an error', () => {
    component.usiHint = 'hint';
    component.usiForceError = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__hint').textContent).toBeFalsy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__hint--error')).toBeTruthy();
  });

  it('should have a label', () => {
    component.usiLabel = 'label';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__label').textContent).toBe(' label ');
  });

  it('should have a default value', async () => {
    component.usiValue = 'default';
    component.ngOnInit();

    await fixture.detectChanges();

    expect(component.formControlValue.value).toBe('default');
  });

  it('should have a floating label when there is text', async () => {
    component.usiLabel = 'label';
    await fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--filled')).toBeFalsy();

    component.writeValue('text');
    await fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--filled')).toBeTruthy();
  });

  // TODO: Create tests for ngModel and formControlName
});
