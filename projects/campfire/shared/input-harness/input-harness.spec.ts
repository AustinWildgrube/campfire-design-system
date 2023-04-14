import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsiInputComponent } from 'usi-campfire/input';
import { UsiSharedModule } from 'usi-campfire/shared';

// Since this is a harness we need to test it with a component that will extend it.
describe('UsiInputHarnessComponent', () => {
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

  it('should have a label', () => {
    const label = 'label';
    component.usiLabel = label;
    fixture.detectChanges();

    const labelElement = debugElement.nativeElement.querySelector('.usi-input-group__label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent.trim()).toBe(label);
  });

  it('should have a placeholder', () => {
    const placeholder = 'placeholder';
    component.usiPlaceholder = placeholder;
    fixture.detectChanges();

    const placeholderElement = debugElement.nativeElement.querySelector('.usi-input-group input');
    expect(placeholderElement).toBeTruthy();
    expect(placeholderElement.placeholder.trim()).toBe(placeholder);
  });

  it('should be disabled', () => {
    expect(component.formControlValue.disabled).toBeFalsy();

    component.usiDisabled = true;
    component.ngOnChanges({
      usiDisabled: {
        currentValue: true,
        previousValue: false,
        isFirstChange: () => true,
        firstChange: true,
      },
    });

    fixture.detectChanges();

    expect(component.formControlValue.disabled).toBeTruthy();
  });

  it('should be a required input', () => {
    component.usiRequired = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').required).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__label').textContent).toContain('*');
  });

  it('should force an error', () => {
    component.usiForceError = true;
    component.ngOnChanges({
      usiForceError: {
        currentValue: true,
        previousValue: false,
        isFirstChange: () => true,
        firstChange: true,
      },
    });

    fixture.detectChanges();

    expect(component.formControlValue.status).toBe('INVALID');
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

  it('should have a default value', () => {
    component.usiValue = 'default';
    component.ngOnChanges({
      usiValue: {
        currentValue: 'default',
        previousValue: null,
        isFirstChange: () => true,
        firstChange: true,
      },
    });

    fixture.detectChanges();

    expect(component.formControlValue.value).toBe('default');
  });

  it('should have a floating label when there is text', () => {
    component.usiLabel = 'label';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--filled')).toBeFalsy();

    component.writeValue('text');
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--filled')).toBeTruthy();
  });

  // TODO: test form group validators
});
