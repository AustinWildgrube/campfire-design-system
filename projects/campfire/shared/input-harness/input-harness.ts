import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { AutofillEvent, AutofillMonitor } from '@angular/cdk/text-field';
import { Platform } from '@angular/cdk/platform';
import { Subject, takeUntil } from 'rxjs';

import { IconName } from '@fortawesome/pro-light-svg-icons';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

@Directive({
  selector: 'usi-input-harness',
})
export class UsiInputHarnessComponent<T = unknown> implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy, OnInit {
  @Input()
  usiPlaceholder: string = '';

  @Input()
  usiError: TemplateRef<ElementRef> | null = null;

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
  usiPrefix?: IconName;

  @Input()
  usiSuffix?: IconName;

  @Input()
  usiHint?: string;

  @Input()
  usiLabel?: string;

  @Input()
  usiValue?: T;

  @Input()
  formControlName?: string;

  uid: string = '';
  isEmpty: boolean = true;
  hasError: boolean | null = false;
  formControlValue: FormControl = new FormControl();

  protected unsubscribe = new Subject<boolean>();

  constructor(
    public parentFormGroup: FormGroupDirective,
    protected cdr: ChangeDetectorRef,
    protected platform: Platform,
    protected autofillMonitor: AutofillMonitor,
    protected elementRef: ElementRef
  ) {
    this.uid = UniqueId();

    // check if parent form is submitted
    this.parentFormGroup.ngSubmit.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.checkValidations();
    });
  }

  ngOnInit(): void {
    if (this.usiValue) {
      this.formControlValue.setValue(this.usiValue);
      this.checkValidations();
    }
  }

  ngAfterViewInit(): void {
    this.formControlValue.markAsUntouched();

    if (this.formControlName) {
      this.formControlValue = this.parentFormGroup.control.controls[this.formControlName] as FormControl;
      this.cdr.detectChanges();

      if (this.formControlValue.hasValidator(Validators.required)) {
        this.usiRequired = true;
      }

      if (this.formControlValue.disabled) {
        this.usiDisabled = true;
      }
    }

    // check if the value was autofilled
    let input = this.elementRef.nativeElement.querySelector('input');
    if (input) {
      this.autofillMonitor
        .monitor(input)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((event: AutofillEvent) => {
          this.isEmpty = !event.isAutofilled;
        });
    }

    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { usiDisabled, usiRequired, usiValue, usiForceError } = changes;

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
      this.formControlValue.setValue(usiValue.currentValue);
    }

    if (usiForceError) {
      if (usiForceError.currentValue) {
        this.usiForceError = true;
        this.formControlValue.setErrors({ usiForceError: true });

        if (this.formControlName) {
          setTimeout(() => {
            this.parentFormGroup.control.controls[this.formControlName!].setErrors({ usiForceError: true });
          });
        }
      } else {
        this.usiForceError = false;
        this.formControlValue.setErrors(null);

        if (this.formControlName) {
          setTimeout(() => {
            this.parentFormGroup.control.controls[this.formControlName!].setErrors(null);
          });
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
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
    if (!this.formControlName) {
      this.formControlValue.setValue(value);
    }

    this.usiValue = value;
    this.checkValidations();
  }

  /**
   * We need to register an onChange function since we need to overwrite the Angular onChange function
   * @param { (value: string) => void } fn | The function to overwrite with
   * @return
   */
  public registerOnChange(fn: any): void {
    this.formControlValue.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe(fn);
    this.onChange = fn;
  }

  /**
   * As with the registerOnChange function we also need to register an onTouched function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnTouched(fn: any): void {
    this.formControlValue.markAsTouched();
    this.onTouched = fn;
  }

  /**
   * We need to have custom validations to work with the floating labels
   * @return
   */
  public checkValidations(): void {
    this.formControlValue.markAsTouched();

    this.hasError = this.formControlValue.invalid && (this.formControlValue.dirty || this.formControlValue.touched || this.parentFormGroup.submitted);

    if (Array.isArray(this.usiValue)) {
      this.isEmpty = this.usiValue.length === 0;
    }

    if (typeof this.usiValue === 'string') {
      this.isEmpty = this.usiValue === '';
    }
  }
}
