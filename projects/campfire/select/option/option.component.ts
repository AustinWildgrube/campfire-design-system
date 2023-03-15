import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { UsiSelectService } from '../select.service';
import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-option',
  template: `
    <li
      *ngIf="usiMultiselect ? !usiSelectService.showSelectedOnly || usiSelectService.isValueIncluded(usiValue) : true"
      class="usi-select__option"
      [ngClass]="{
        'usi-select__option--active': !usiMultiselect && usiSelectService.isValueIncluded(usiValue),
        'usi-select__option--disabled': usiDisabled == true
      }"
      (click)="writeValue(usiValue)"
      (keyup.enter)="writeValue(usiValue)"
      (keyup.arrowUp)="usiSelectService.moveFocus($any($event))"
      (keyup.arrowDown)="usiSelectService.moveFocus($any($event))"
      [attr.aria-selected]="usiSelectService.isValueIncluded(usiValue)"
      tabindex="0"
      role="option"
      #contentWrapper
    >
      <!-- TODO: Change this to the usi-checkbox component -->
      <span *ngIf="usiMultiselect" class="usi-checkbox">
        <input
          class="usi-checkbox__input"
          [ngClass]="{ 'usi-checkbox__input--checked': usiSelectService.isValueIncluded(usiValue) }"
          [disabled]="usiDisabled == true"
          type="checkbox"
        />
        <span class="usi-checkbox__label" [ngClass]="{ 'usi-checkbox--disabled': usiDisabled }">
          <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </span>
      </span>

      <ng-container *ngIf="!usiMultiselect">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </ng-container>

      <ng-template #contentTemplate><ng-content></ng-content></ng-template>
    </li>
  `,
  styleUrls: ['../styles/select.component.scss', '../../input/styles/input.component.scss', '../../checkbox/styles/checkbox.component.scss'],
})
export class UsiOptionComponent implements OnInit {
  @ViewChild('contentWrapper') content: ElementRef | undefined;

  @Input()
  usiValue?: any = undefined;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiMultiselect?: BooleanInput = false;

  constructor(public usiSelectService: UsiSelectService) {}

  ngOnInit(): void {
    if (this.usiValue === undefined) {
      throw new Error('UsiOptionComponent: A select option must have a value!');
    }
  }

  /**
   * The value of the select option needs to be written to our service so the
   * select component and the multiselect component can access it.
   * @param { string } value | the value to be added or removed
   */
  public writeValue(value: string): void {
    if (this.usiMultiselect) {
      if (this.usiSelectService.isValueIncluded(value)) {
        // remove value
        const updatedValue = this.usiSelectService.formControlValueCopy.value.filter((val: any) => val !== value);
        this.usiSelectService.formControlValueCopy.setValue(updatedValue);
      } else {
        // add value
        this.usiSelectService.formControlValueCopy.setValue([...this.usiSelectService.formControlValueCopy.value, value]);
      }
    } else {
      this.usiSelectService.formControlValueCopy.setValue(value);
    }

    if (!this.usiMultiselect) {
      this.usiSelectService.showOptions = false;
    }
  }
}
