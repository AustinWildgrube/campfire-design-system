import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

@Component({
  selector: 'usi-switch',
  template: `
    <span class="usi-switch" [attr.aria-checked]="value">
      <div class="usi-switch__input">
        <input [id]="uid" [(ngModel)]="value" (ngModelChange)="onChange(value)" [disabled]="!!usiDisabled" type="checkbox" role="switch" />
        <fa-icon *ngIf="value" [icon]="['far', 'check']"></fa-icon>
      </div>

      <label [for]="uid" class="usi-switch__label" [ngClass]="{ 'usi-switch__label--disabled': usiDisabled }"><ng-content></ng-content></label>
      <span class="usi-switch__status" [ngClass]="{ 'usi-switch__label--disabled': usiDisabled }" aria-hidden="true">{{ value ? 'On' : 'Off' }}</span>
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
export class UsiSwitchComponent implements ControlValueAccessor, OnChanges, OnInit {
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
      this.onChange(this.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { usiChecked } = changes;

    this.value = usiChecked.currentValue;
    this.onChange(usiChecked.currentValue);
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { any } value | the value to write
   * @return
   */
  public writeValue(value: boolean): void {
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
