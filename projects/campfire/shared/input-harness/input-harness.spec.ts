import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { UsiInputComponent } from 'usi-campfire/input';
import { UsiSharedModule } from 'usi-campfire/shared';

@Component({
  template: `
    <form [formGroup]="form">
      <usi-input usiLabel="Label" formControlName="input"></usi-input>
    </form>
  `,
})
class TestComponent extends UsiInputComponent {
  form = new FormGroup({
    input: new FormControl('Default Value', [Validators.required, Validators.maxLength(2)]),
  });
}

@Component({
  template: `<usi-input usiLabel="Label" [(ngModel)]="input"></usi-input>`,
})
class TestComponentModel extends UsiInputComponent {
  input = 'Default Value';
}

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
});

describe('Input Harness in a Form', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, UsiSharedModule],
      declarations: [UsiInputComponent, TestComponent],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create an input', () => {
    expect(component).toBeTruthy();

    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
  });

  it('should have a default value', () => {
    expect(debugElement.nativeElement.querySelector('.usi-input-group input').value).toBe('Default Value');
    expect(component.form.get('input')?.value).toBe('Default Value');
  });

  it('should change the form value when the input changes', () => {
    const input = debugElement.nativeElement.querySelector('.usi-input-group input');
    input.value = 'New Value';
    input.dispatchEvent(new Event('input'));

    expect(component.form.get('input')?.value).toBe('New Value');
  });

  it('should be required because of a validator', () => {
    expect(debugElement.nativeElement.querySelector('.usi-input-group input').required).toBe(true);
    expect(debugElement.nativeElement.querySelector('.usi-input-group__label').textContent.trim()).toBe('Label *');
  });

  it('should have a max length because of a validator', () => {
    expect(component.form.status).toBe('INVALID');
  });
});

describe('Input Harness With an NgModel', () => {
  let component: TestComponentModel;
  let fixture: ComponentFixture<TestComponentModel>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, UsiSharedModule],
      declarations: [UsiInputComponent, TestComponentModel],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentModel);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create an input', () => {
    expect(component).toBeTruthy();

    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
  });

  it('should have a default value', async () => {
    await fixture.whenStable();
    const inputElement = fixture.debugElement.query(By.css('.usi-input-group__input')).nativeElement;
    expect(inputElement.value).toBe('Default Value');
  });

  it('should change the form value when the input changes', () => {
    const input = debugElement.nativeElement.querySelector('.usi-input-group__input');
    input.value = 'New Value';
    input.dispatchEvent(new Event('input'));

    expect(component.input).toBe('New Value');
  });
});
