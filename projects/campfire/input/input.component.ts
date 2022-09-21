import { Component, Input, TemplateRef, forwardRef, Injector, AfterViewInit, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { IconName } from '@fortawesome/pro-light-svg-icons';

import { BooleanInput, InputBoolean, UniqueId, UsiSpacing } from 'usi-campfire/utils';

@Component({
  selector: 'usi-input',
  template: `
    <div class="usi-input-group">
      <fa-icon *ngIf="usiPrefix" class="usi-input-group__prefix" [icon]="['fal', usiPrefix]"></fa-icon>
      <fa-icon *ngIf="usiSuffix && !usiPassword" class="usi-input-group__suffix" [icon]="['fal', usiSuffix]"></fa-icon>

      <fa-icon
        *ngIf="usiPassword === true && usiType === 'password'"
        class="usi-input-group__suffix usi-input-group__suffix--password"
        (click)="revealPassword()"
        [icon]="['fal', 'eye-slash']"
      >
      </fa-icon>

      <fa-icon
        *ngIf="usiPassword && usiType !== 'password'"
        class="usi-input-group__suffix usi-input-group__suffix--password"
        (click)="revealPassword()"
        [icon]="['fal', 'eye']"
      >
      </fa-icon>

      <input
        class="usi-input-group__input"
        [ngClass]="{
          'usi-input-group__input--error': hasError || usiForceError,
          'usi-input-group__input--filled': inputEmpty,
          'usi-input-group__input--prefix': usiPrefix,
          'usi-input-group__input--suffix': usiSuffix || usiPassword
        }"
        [placeholder]="usiPlaceholder"
        [disabled]="usiDisabled == true"
        [type]="usiType"
        [value]="usiValue"
        [required]="usiRequired"
        (input)="onChange($any($event).target.value)"
        (keydown)="checkValidations($any($event).target.value)"
        (blur)="checkValidations($any($event).target.value)"
        [attr.aria-labelledby]="uid"
      />

      <label
        [id]="uid"
        class="usi-input-group__label"
        [ngClass]="{
          'usi-input-group__label--prefix': usiPrefix,
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
  styleUrls: ['./styles/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiInputComponent),
      multi: true,
    },
  ],
})
export class UsiInputComponent extends UsiSpacing implements AfterViewInit, ControlValueAccessor {
  @Input()
  usiType: 'text' | 'email' | 'password' | 'number' = 'text';

  @Input()
  usiPlaceholder: string = '';

  @Input()
  usiError: TemplateRef<any> | null = null;

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
  @InputBoolean()
  usiPassword?: BooleanInput;

  @Input()
  usiPrefix?: IconName;

  @Input()
  usiSuffix?: IconName;

  @Input()
  usiHint?: string;

  @Input()
  usiLabel?: string;

  @Input()
  get usiValue(): any {
    return this.innerValue;
  }

  set usiValue(v: any) {
    if (v !== this.innerValue && v !== '' && v !== null) {
      this.innerValue = v;
      this.registerOnChange(v);
      this.checkValidations(this.usiValue);
      this.touched = true;
    }
  }

  @HostListener('document:click', ['$event'])
  formClickEvent(event: any) {
    if (event.path[0].getAttribute('type') || (event.path[0].offsetParent && event.path[0].offsetParent.form)) {
      this.checkValidations(this.usiValue, false);
    }
  }

  private innerValue: any = '';
  private control: FormControl = new FormControl();

  uid: string = '';
  inputEmpty: boolean = false;
  hasError: boolean | null = false;
  touched: boolean | null = false;

  constructor(public parentFormGroup: FormGroupDirective, private injector: Injector, private cdr: ChangeDetectorRef, private elementRef: ElementRef) {
    super(elementRef);
    this.uid = UniqueId();
  }

  // The form control is only set after initialization
  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    // Bind the form control to the input
    if (ngControl) {
      this.control = ngControl.control as FormControl;
      this.checkForValidations();
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
    this.onTouched();
    this.usiValue = value;
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
   * Set the disabled state of the input
   * @param { boolean } isDisabled | The state of the input
   * @return
   */
  public setDisabledState(isDisabled: boolean): void {
    this.usiDisabled = isDisabled;
  }

  /**
   * We need to have custom validations to work with the floating labels
   * @param { string } value | The value to check
   * @param { boolean } touched | Whether the user has touched the input
   * @return
   */
  public async checkValidations(value: string, touched: boolean = true): Promise<void> {
    this.inputEmpty = value !== '';

    if (this.control) {
      setTimeout(() => {
        if (touched || this.parentFormGroup.submitted) {
          this.control.markAllAsTouched();
          this.touched = this.control.touched;
        }

        this.hasError = this.control.invalid && (this.control.dirty || this.control.touched || this.parentFormGroup.submitted);
      }, 0);
    }
  }

  /**
   * Change between the two states of the input type during password input
   * @return
   */
  public revealPassword(): void {
    this.usiType === 'password' ? (this.usiType = 'text') : (this.usiType = 'password');
  }

  /**
   * We can check for validations that are presented in the form control even
   * if they are not provided on the input itself.
   * @private
   */
  private checkForValidations(): void {
    if (this.control.hasValidator(Validators.required)) {
      this.usiRequired = true;
      this.cdr.detectChanges();
    }
  }
}
