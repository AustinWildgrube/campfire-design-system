import { AfterViewInit, Component, ElementRef, forwardRef, Injector, Input, TemplateRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { BooleanInput, InputBoolean, UniqueId, UsiSpacing } from 'usi-campfire/utils';

@Component({
  selector: 'usi-textarea',
  template: `
    <div class="usi-input-group">
      <!-- Prettier is causing strange EOL behavior with the textarea -->
      <!-- prettier-ignore -->
      <textarea
        class="usi-input-group__input"
        [ngClass]="{
          'usi-input-group__input--error': hasError || usiForceError,
          'usi-input-group__input--filled': inputEmpty,
          'usi-input-group__input--resizeable': usiResizeable
        }"
        (input)="onChange($any($event).target.value)"
        (keyup)="checkValidations($any($event).target.value)"
        [disabled]="usiDisabled == true"
        [placeholder]="usiPlaceholder"
        [attr.aria-labelledby]="uid"
        >{{ innerValue }}</textarea>

      <label
        [id]="uid"
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
  styleUrls: ['./styles/textarea.component.scss', '../input/styles/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiTextareaComponent),
      multi: true,
    },
  ],
})
export class UsiTextareaComponent extends UsiSpacing implements AfterViewInit {
  @Input()
  usiLabel: string = '';

  @Input()
  usiPlaceholder: string = '';

  @Input()
  usiHint?: string;

  @Input()
  usiError: TemplateRef<any> | null = null;

  @Input()
  @InputBoolean()
  usiResizeable?: BooleanInput;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiRequired?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiForceError?: BooleanInput;

  @Input()
  get usiValue(): string {
    return this.innerValue;
  }

  set usiValue(v: any) {
    this.writeValue(v);
    this.registerOnChange(v);
    this.checkValidations(this.usiValue);

    this.touched = true;
  }

  private control: FormControl = new FormControl();

  uid: string = '';
  innerValue: string = '';
  inputEmpty: boolean = false;
  hasError: boolean | null = false;
  touched: boolean | null = false;

  constructor(private injector: Injector, private elementRef: ElementRef) {
    super(elementRef);
    this.uid = UniqueId();
  }

  // The form control is only set after initialization
  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    // Bind the form control to the input
    if (ngControl) {
      this.control = ngControl.control as FormControl;
    }

    if (this.usiForceError && this.control) {
      this.hasError = true;
      this.control.markAsTouched();
    }
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { any } value | the value to write
   * @return
   */
  public writeValue(value: any): void {
    this.innerValue = value;
    this.onTouched();
    this.checkValidations(value);
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

  /**
   * We need to have custom validations to work with the floating labels
   * @param { string } value | The value to check
   * @return
   */
  public checkValidations(value: string): void {
    this.inputEmpty = value !== '';

    if (value !== '') {
      this.control.markAsTouched();
    }

    if (this.control) {
      this.hasError = this.control.invalid && this.control.touched;
      this.touched = this.control.touched;
    }
  }
}
