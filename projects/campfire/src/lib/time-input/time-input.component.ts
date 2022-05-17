import { AfterViewInit, Component, forwardRef, Injector, Input, TemplateRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NgControl, ControlValueAccessor } from '@angular/forms';

import { BooleanInput, InputBoolean } from '../utils/convert';

@Component({
  selector: 'usi-time-input',
  template: `
    <div class="usi-input-group">
      <input
        class="usi-input-group__input usi-input-group__input--filled"
        [ngClass]="{ 'usi-input-group__input--error': hasError || usiForceError }"
        (input)="onChange($any($event).target.value)"
        (change)="checkValidations($any($event).target.value)"
        (blur)="onTouched()"
        [required]="usiRequired"
        [disabled]="usiDisabled"
        [value]="usiValue || value"
        [attr.aria-labelledby]="uuid"
        type="time"
      />

      <label
        [id]="uuid"
        class="usi-input-group__label"
        [ngClass]="{
          'usi-input-group__label--error': hasError || usiForceError
        }"
      >
        {{ usiLabel }} <span *ngIf="usiRequired">*</span>
      </label>

      <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
        {{ usiHint }}
      </span>

      <div *ngIf="(usiError && touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
        <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./styles/time-input.component.scss', '../input/styles/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiTimeInputComponent),
      multi: true,
    },
  ],
})
export class UsiTimeInputComponent implements AfterViewInit, ControlValueAccessor {
  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  @Input()
  @InputBoolean()
  usiRequired?: BooleanInput;

  @Input()
  @InputBoolean()
  usiForceError?: BooleanInput;

  @Input()
  usiError: TemplateRef<any> | null = null;

  @Input()
  usiHint?: string;

  @Input()
  usiValue?: any;

  @Input()
  usiLabel: string = '';

  private control: FormControl = new FormControl();

  uuid: string = (Math.random() + 1).toString(36).substring(7);
  inputEmpty: boolean = false;
  hasError: boolean | null = false;
  touched: boolean | null = false;
  value: string = this.usiValue || '00:00';

  constructor(private injector: Injector) {}

  // The form control is only set after initialization
  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    // Bind the form control to the input
    if (ngControl) {
      this.control = ngControl.control as FormControl;
    }
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { any } value | the value to write
   * @return
   */
  public writeValue(value: any): void {
    this.onTouched();
    this.value = value;
  }

  /**
   * We need to register an onChange function since we need to overwrite the Angular onChange function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * As with the registerOnChange function we also need to register an onTouched function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * We need to have custom validations to work with the floating labels
   * @param { string } value | The value to check
   * @return
   */
  public checkValidations(value: string): void {
    console.log(value);
    this.inputEmpty = value !== '';

    if (value !== '') {
      this.control.markAsTouched();
    }

    if (this.control) {
      this.hasError = this.control.invalid && this.control.touched;
      this.touched = this.control.touched;
    }
  }

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @param { any } _ | Unused
   * @return
   */
  public onChange: (_: any) => void = (_: any) => {};

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @return
   */
  public onTouched: () => void = () => {};
}
