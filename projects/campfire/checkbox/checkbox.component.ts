import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

@Component({
  selector: 'usi-checkbox',
  template: `
    <div class="usi-checkbox">
      <input
        [id]="uid"
        class="usi-checkbox__input"
        [ngClass]="{ 'usi-checkbox__input--checked': value }"
        (click)="this.writeValue($any($event.target).checked)"
        [disabled]="usiDisabled"
        [required]="usiRequired"
        [attr.aria-checked]="value"
        type="checkbox"
        tabindex="0"
      />

      <label class="usi-checkbox__label" [ngClass]="{ 'usi-checkbox--disabled': usiDisabled }" [for]="uid">
        <ng-content></ng-content> <span *ngIf="usiRequired"> *</span>
      </label>
    </div>
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
export class UsiCheckboxComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Output()
  usiChange: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  ngOnChanges(changes: SimpleChanges): void {
    const { usiChecked } = changes;

    if (usiChecked && usiChecked.currentValue !== usiChecked.previousValue) {
      this.value = usiChecked.currentValue;
      this.updateChanges();
    }
  }

  /**
   * Method that is invoked on an update of a model
   * @return
   */
  updateChanges() {
    this.onChange(this.value);
    this.usiChange.emit(this.value);
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
