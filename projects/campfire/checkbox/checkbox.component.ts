import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

@Component({
  selector: 'label[usi-checkbox]',
  template: `
    <span class="usi-checkbox">
      <input
        class="usi-checkbox__input"
        [(ngModel)]="value"
        (ngModelChange)="updateChanges()"
        [disabled]="usiDisabled == true"
        [required]="usiRequired == true"
        [attr.aria-labelledby]="uid"
        type="checkbox"
      />
      <span [id]="uid" class="usi-checkbox__label" [ngClass]="{ 'usi-checkbox--disabled': usiDisabled }">
        <ng-content></ng-content> <span *ngIf="usiRequired"> *</span>
      </span>
    </span>
  `,
  styleUrls: ['./styles/checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiCheckboxComponent),
      multi: true,
    },
  ],
})
export class UsiCheckboxComponent implements ControlValueAccessor, OnInit {
  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  @Input()
  @InputBoolean()
  usiChecked?: BooleanInput;

  @Input()
  @InputBoolean()
  usiRequired?: BooleanInput;

  value: boolean = false;
  uid: string = '';

  constructor() {
    this.uid = UniqueId();
  }

  ngOnInit(): void {
    if (this.usiChecked) {
      this.value = true;
      this.updateChanges();
    }
  }

  /**
   * Method that is invoked on an update of a model
   * @return
   */
  updateChanges() {
    this.onChange(this.value);
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { any } value | the value to write
   * @return
   */
  writeValue(value: boolean): void {
    this.value = value;
    this.updateChanges();
  }

  /**
   * We need to register an onChange function since we need to overwrite the Angular onChange function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * As with the registerOnChange function we also need to register an onTouched function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @param { any } _ | Unused
   * @return
   */
  onChange: (_: any) => void = (_: any) => {};

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @return
   */
  onTouched: () => void = () => {};
}
