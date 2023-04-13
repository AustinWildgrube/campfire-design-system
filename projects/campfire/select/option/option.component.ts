import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { UsiSelectService } from '../select.service';
import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-option',
  template: `
    <li
      *ngIf="usiMultiselect ? !usiSelectService.showSelectedOnly || usiSelectService.isValueIncluded(usiValue) : true"
      [id]="usiValue"
      class="usi-select__option"
      [ngClass]="{
        'usi-select__option--active': !usiMultiselect && usiSelectService.isValueIncluded(usiValue),
        'usi-select__option--disabled': usiDisabled == true
      }"
      (click)="writeValue(usiValue)"
      (keyup.enter)="writeValue(usiValue); $event?.stopPropagation()"
      (focus)="usiSelectService.activeFocus = usiValue"
      [attr.aria-selected]="usiSelectService.isValueIncluded(usiValue)"
      tabindex="0"
      role="option"
      #contentWrapper
    >
      <usi-checkbox *ngIf="usiMultiselect" [usiChecked]="usiSelectService.isValueIncluded(usiValue)" [usiDisabled]="usiDisabled">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </usi-checkbox>

      <ng-container *ngIf="!usiMultiselect">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </ng-container>

      <ng-template #contentTemplate><ng-content></ng-content></ng-template>
    </li>
  `,
  styleUrls: ['../styles/select.component.scss', '../../input/styles/input.component.scss', '../../checkbox/styles/checkbox.component.scss'],
})
export class UsiOptionComponent<T = unknown> implements OnInit {
  @ViewChild('contentWrapper') content: ElementRef | undefined;

  @Input()
  usiValue: T = null as unknown as T;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiMultiselect?: BooleanInput = false;

  // Emits when the state of the option changes and any parents have to be notified
  readonly stateChanges = new Subject<void>();

  constructor(public usiSelectService: UsiSelectService) {}

  ngOnInit(): void {
    if (!this.usiValue) {
      throw new Error('UsiOptionComponent: A select option must have a value.');
    }
  }

  /**
   * The value of the select option needs to be written to our service so the
   * select component and the multiselect component can access it.
   * @param { string } value | the value to be added or removed
   */
  public writeValue(value: T): void {
    if (this.usiDisabled) return;

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

    // close our options list if it is not a multiselect
    if (!this.usiMultiselect) {
      this.usiSelectService.showOptions = false;
      this.usiSelectService.activeFocus = null;
    }

    // change the state so our parent component can pick it up
    this.stateChanges.next();
  }
}
