import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { AutofillEvent, AutofillMonitor } from '@angular/cdk/text-field';
import { Platform } from '@angular/cdk/platform';

import { IconName } from '@fortawesome/pro-light-svg-icons';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

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

      <ng-container [ngSwitch]="usiType">
        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': isEmpty == false,
            'usi-input-group__input--prefix': usiPrefix,
            'usi-input-group__input--suffix': usiSuffix || usiPassword
          }"
          [formControl]="formControlValue"
          [placeholder]="usiPlaceholder"
          [attr.aria-labelledby]="uid"
          [required]="!!usiRequired"
          (input)="writeValue($any($event).target.value)"
          (blur)="checkValidations()"
          *ngSwitchCase="'text'"
          type="text"
        />

        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': isEmpty == false,
            'usi-input-group__input--prefix': usiPrefix,
            'usi-input-group__input--suffix': usiSuffix || usiPassword
          }"
          [formControl]="formControlValue"
          [placeholder]="usiPlaceholder"
          [attr.aria-labelledby]="uid"
          [required]="!!usiRequired"
          (input)="writeValue($any($event).target.value)"
          (blur)="checkValidations()"
          *ngSwitchCase="'number'"
          type="number"
        />

        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': isEmpty == false,
            'usi-input-group__input--prefix': usiPrefix,
            'usi-input-group__input--suffix': usiSuffix || usiPassword
          }"
          [formControl]="formControlValue"
          [placeholder]="usiPlaceholder"
          [attr.aria-labelledby]="uid"
          [required]="!!usiRequired"
          (input)="writeValue($any($event).target.value)"
          (blur)="checkValidations()"
          *ngSwitchCase="'email'"
          type="email"
        />

        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': isEmpty == false,
            'usi-input-group__input--prefix': usiPrefix,
            'usi-input-group__input--suffix': usiSuffix || usiPassword
          }"
          [formControl]="formControlValue"
          [placeholder]="usiPlaceholder"
          [attr.aria-labelledby]="uid"
          [required]="!!usiRequired"
          (input)="writeValue($any($event).target.value)"
          (blur)="checkValidations()"
          *ngSwitchCase="'password'"
          type="password"
        />
      </ng-container>

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

      <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">{{ usiHint }}</span>

      <div *ngIf="(usiError && formControlValue.touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
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
export class UsiInputComponent implements AfterViewInit, ControlValueAccessor, OnChanges, OnInit {
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
  usiValue?: string | number;

  @Input()
  formControlName?: string;

  uid: string = '';
  isEmpty: boolean = true;
  hasError: boolean | null = false;
  formControlValue: FormControl = new FormControl();

  constructor(
    public parentFormGroup: FormGroupDirective,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private autofillMonitor: AutofillMonitor,
    private elementRef: ElementRef
  ) {
    this.uid = UniqueId();

    // check if parent form is submitted
    this.parentFormGroup.ngSubmit.subscribe(() => {
      this.checkValidations();
    });
  }

  ngOnInit(): void {
    if (this.usiValue) {
      this.writeValue(this.usiValue);
    }
  }

  ngAfterViewInit(): void {
    this.formControlValue.markAsUntouched();

    if (this.formControlName) {
      // copy errors from parent form control to mark input as invalid
      this.parentFormGroup.control.controls[this.formControlName].valueChanges.subscribe(() => {
        if (this.parentFormGroup.control.controls[this.formControlName!].errors) {
          this.formControlValue.setErrors(this.parentFormGroup.control.controls[this.formControlName!].errors);
        }
      });

      if (this.parentFormGroup.control.controls[this.formControlName].hasError('required')) {
        this.usiRequired = true;
        this.formControlValue.setValidators(Validators.required);
      }

      if (this.parentFormGroup.control.controls[this.formControlName].disabled) {
        this.usiDisabled = true;
        this.formControlValue.disable();
      }
    }

    // check if the value was autofilled
    this.autofillMonitor.monitor(this.elementRef.nativeElement.querySelector('input')).subscribe((event: AutofillEvent) => {
      this.isEmpty = !event.isAutofilled;
    });

    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { usiDisabled, usiRequired, usiValue } = changes;

    if (usiDisabled) {
      this.usiDisabled = usiDisabled.currentValue;

      if (usiDisabled.currentValue) {
        this.formControlValue.disable();
      } else {
        this.formControlValue.enable();
      }
    }

    if (usiRequired) {
      this.usiRequired = usiRequired.currentValue;
    }

    if (usiValue) {
      this.writeValue(usiValue.currentValue);
    }
  }

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @param { any } _ | Unused
   * @return
   */
  public onChange = (_: any): void => {};

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @return
   */
  public onTouched = (): void => {};

  /**
   * Write form value to the DOM element (model => view)
   * @param { any } value | the value to write
   * @return
   */
  public writeValue(value: any): void {
    this.formControlValue.setValue(value);
    this.usiValue = value;
    this.checkValidations();
  }

  /**
   * We need to register an onChange function since we need to overwrite the Angular onChange function
   * @param { (value: string) => void } fn | The function to overwrite with
   * @return
   */
  public registerOnChange(fn: any): void {
    this.formControlValue.valueChanges.subscribe(fn);
  }

  /**
   * As with the registerOnChange function we also need to register an onTouched function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnTouched(fn: any): void {
    this.formControlValue.markAsTouched();
  }

  /**
   * Change between the two states of the input type during password input
   * @return
   */
  public revealPassword(): void {
    this.usiType === 'password' ? (this.usiType = 'text') : (this.usiType = 'password');
  }

  /**
   * We need to have custom validations to work with the floating labels
   * @return
   */
  public checkValidations(): void {
    this.formControlValue.markAsTouched();

    if (this.formControlName) {
      this.parentFormGroup.control.controls[this.formControlName].markAsTouched();
    }

    this.isEmpty = this.usiValue === null || this.usiValue === '';
    this.hasError = this.formControlValue.invalid && (this.formControlValue.dirty || this.formControlValue.touched || this.parentFormGroup.submitted);
  }
}
