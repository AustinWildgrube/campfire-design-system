import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, InputBoolean } from '../utils/convert';

@Component({
  selector: 'label[usi-checkbox]',
  template: `
    <span class="usi-checkbox">
      <input
        id="usi-checkbox-{{ uid }}"
        class="usi-checkbox__input"
        [(ngModel)]="value"
        (ngModelChange)="updateChanges()"
        [disabled]="disabled == true"
        [required]="required == true"
        type="checkbox"
      />
      <span class="usi-checkbox__label" [ngClass]="{ 'usi-checkbox--disabled': disabled }"> <ng-content></ng-content> <span *ngIf="required"> *</span> </span>
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
  disabled?: BooleanInput;

  @Input()
  @InputBoolean()
  checked?: BooleanInput;

  @Input()
  @InputBoolean()
  required?: BooleanInput;

  value: boolean = false;
  uid: string = '';

  constructor() {
    // Generate random name so we don't have matching ids
    this.uid = (Math.random() + 1).toString(36).substring(7);
  }

  ngOnInit(): void {
    if (this.checked) {
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
