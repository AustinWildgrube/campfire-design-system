import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostListener,
  Injector,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

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
          [formControl]="control"
          [placeholder]="usiPlaceholder"
          [attr.aria-labelledby]="uid"
          (blur)="checkValidations($any($event).target.value)"
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
          [formControl]="control"
          [placeholder]="usiPlaceholder"
          [attr.aria-labelledby]="uid"
          (blur)="checkValidations($any($event).target.value)"
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
          [formControl]="control"
          [placeholder]="usiPlaceholder"
          [attr.aria-labelledby]="uid"
          (blur)="checkValidations($any($event).target.value)"
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
          [formControl]="control"
          [placeholder]="usiPlaceholder"
          [attr.aria-labelledby]="uid"
          (blur)="checkValidations($any($event).target.value)"
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
  get usiValue(): any {
    return this.getValue();
  }

  set usiValue(v: any) {
    if (v !== this.getValue() && v !== '' && v !== null) {
      this.writeValue(v);
      this.isEmpty = false;
      this.touched = true;
    }
  }

  @HostListener('document:click', ['$event'])
  formClickEvent(event: any) {
    if (event && event.path) {
      if (event.path[0].getAttribute('type') === 'submit' || (event.path[0].offsetParent && event.path[0].offsetParent.form)) {
        this.checkValidations(this.control.value, false);
      }
    }
  }

  @HostListener('change', ['$event.target'])
  checkAutofill(target: { value: any }) {
    this.ngZone.run(() => {
      if (target.value) {
        this.checkValidations(target.value, false);
      }
    });
  }

  uid: string = '';
  isEmpty: boolean = true;
  hasError: boolean | null = false;
  touched: boolean | null = false;

  public control: FormControl = new FormControl();

  constructor(public parentFormGroup: FormGroupDirective, private injector: Injector, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this.uid = UniqueId();
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(() => {
      const value = this.getValue();
      this.checkValidations(value);
      this._onChange(value);
    });
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);
    if (ngControl?.control?.hasValidator(Validators.required)) {
      this.usiRequired = true;
    }

    this.checkForExistingValidations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { usiDisabled, usiRequired } = changes;

    if (usiDisabled) {
      this.setDisabledState(usiDisabled.currentValue);
    }

    if (usiRequired) {
      this.checkForExistingValidations();
    }
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { any } value | the value to write
   * @return
   */
  public writeValue(value: any): void {
    this.onTouched();

    if (value && typeof value === 'object') {
      this.control.setValue(value.value);
    } else {
      this.control.setValue(value);
    }

    this.checkValidations(value);
  }

  /**
   * We need to register an onChange function since we need to overwrite the Angular onChange function
   * @param { (value: string) => void } fn | The function to overwrite with
   * @return
   */
  public registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  /**
   * As with the registerOnChange function we also need to register an onTouched function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @param { string } _value | Unused
   * @return
   */
  private _onChange = (_value: string): void => undefined;

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @return
   */
  public onTouched = (): void => undefined;

  /**
   * Set the disabled state of the input
   * @param { boolean } isDisabled | The state of the input
   * @return
   */
  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  /**
   * We need to have custom validations to work with the floating labels
   * @param { string | number | { value: string } } value | The value to check
   * @param { boolean } touched | Whether the user has touched the input
   * @return
   */
  public async checkValidations(value: string | number | object | null, touched: boolean = true): Promise<void> {
    setTimeout(() => {
      this.isEmpty = value === '' || value === null;

      if (touched || this.parentFormGroup.submitted) {
        this.control.markAllAsTouched();
        this.touched = this.control.touched;
      }

      this.hasError = this.control.invalid && (this.control.dirty || this.control.touched || this.parentFormGroup.submitted);
    }, 0);
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
  private checkForExistingValidations(): void {
    if (this.control.hasValidator(Validators.required) || this.usiRequired) {
      if (!this.control.hasValidator(Validators.required)) {
        this.control.setValidators([Validators.required]);
      } else if (!this.usiRequired) {
        this.usiRequired = true;
      }

      this.cdr.detectChanges();
    }

    if (this.usiDisabled) {
      this.control.disable();
    }

    if (this.usiForceError) {
      this.hasError = true;
      this.control.hasError('');
    }
  }

  /**
   * Get the value of the form control
   * @return string | The value of the form control
   */
  private getValue(): string {
    if (this.control.value && typeof this.control.value === 'object') {
      return this.control.value.value;
    }

    return this.control.value;
  }
}
