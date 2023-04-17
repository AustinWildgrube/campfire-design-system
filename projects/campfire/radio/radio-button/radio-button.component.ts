import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UsiRadioService } from '../radio.service';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'label[usi-radio]',
  template: `
    <li
      class="usi-radio-button"
      (click)="markValueAsChecked(usiValue)"
      (keyup)="usiRadioService.onKeyUp($event, usiValue)"
      [attr.aria-checked]="usiRadioService.selected.value === usiValue"
      [tabindex]="usiDisabled ? -1 : 0"
      role="radio"
    >
      <input
        class="usi-radio-button__input"
        [ngClass]="{ 'usi-radio-button__input--checked': usiRadioService.selected.value === usiValue }"
        [formControl]="formControlValue"
        [checked]="usiRadioService.selected.value === usiValue"
        [attr.aria-labelledby]="uid"
        type="radio"
        tabindex="-1"
      />

      <span [id]="uid" class="usi-radio-button__label" [ngClass]="{ 'usi-radio-button--disabled': usiDisabled }">
        <ng-content></ng-content>
      </span>
    </li>
  `,
  styleUrls: ['./styles/radio-button.component.scss'],
})
export class UsiRadioButtonComponent<T = unknown> implements OnChanges {
  @Input()
  usiValue: T = null as unknown as T;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  @Input()
  @InputBoolean()
  usiChecked?: BooleanInput;

  uid: string = '';
  formControlValue: FormControl = new FormControl();

  constructor(public usiRadioService: UsiRadioService) {
    this.uid = UniqueId();
  }

  ngOnInit(): void {
    if (!this.usiValue) {
      throw new Error('UsiRadioButtonComponent: A radio button must have a value.');
    }

    if (this.usiDisabled) {
      this.usiDisabled = true;
      this.formControlValue.disable();
    }

    this.usiRadioService.disabled.pipe(takeUntil(this.usiRadioService.unsubscribe)).subscribe((disabled: boolean) => {
      this.usiDisabled = disabled;
      disabled ? this.formControlValue.disable() : this.formControlValue.enable();
    });

    this.usiRadioService.radioButtonArray.push({
      id: this.uid,
      value: this.usiValue,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { usiDisabled, usiChecked } = changes;

    if (usiDisabled) {
      this.usiRadioService.disabled.next(usiDisabled.currentValue);
      usiDisabled.currentValue ? this.formControlValue.disable() : this.formControlValue.enable();
    }

    if (usiChecked) {
      this.markValueAsChecked(this.usiValue);
    }
  }

  /**
   * Mark our radio button as checked and emit the value to the radio service
   * @return
   */
  public markValueAsChecked(value: T | null): void {
    if (this.usiDisabled) return;
    this.usiRadioService.selected.next(value);
  }
}
