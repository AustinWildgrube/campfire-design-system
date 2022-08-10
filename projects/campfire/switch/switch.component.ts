import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

@Component({
  selector: 'label[usi-switch]',
  template: `
    <span class="usi-switch">
      <div class="usi-switch__input">
        <input [(ngModel)]="value" (ngModelChange)="updateChanges()" [disabled]="usiDisabled == true" [attr.aria-labelledby]="uid" type="checkbox" />
        <fa-icon *ngIf="value" [icon]="['far', 'check']"></fa-icon>
      </div>

      <span [id]="uid" class="usi-switch__label" [ngClass]="{ 'usi-switch__label--disabled': usiDisabled }"><ng-content></ng-content></span>
      <span class="usi-switch__status" [ngClass]="{ 'usi-switch__label--disabled': usiDisabled }">{{ value ? 'On' : 'Off' }}</span>
    </span>
  `,
  styleUrls: ['./styles/switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiSwitchComponent),
      multi: true,
    },
  ],
})
export class UsiSwitchComponent implements ControlValueAccessor, OnInit {
  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  @Input()
  @InputBoolean()
  usiChecked?: BooleanInput;

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
  public updateChanges(): void {
    this.onChange(this.value);
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { any } value | the value to write
   * @return
   */
  public writeValue(value: boolean): void {
    this.value = value;
    this.updateChanges();
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
}
