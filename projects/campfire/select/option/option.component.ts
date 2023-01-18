import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { UsiSelectService } from '../select.service';
import { BooleanInput, InputBoolean, SelectData } from 'usi-campfire/utils';

@Component({
  selector: 'usi-option',
  template: `
    <li
      *ngIf="
        (usiSelectService.showOptions && usiMultiSelect && !usiSelectService.showSelectedOnly) ||
        (usiSelectService.showOptions && usiMultiSelect && usiSelectService.showSelectedOnly && this.usiSelectService.value.includes(usiValue))
      "
      class="usi-select__option"
      [ngClass]="{
        'usi-select__option--active': !usiMultiSelect && usiSelectService.value.includes(usiValue),
        'usi-select__option--disabled': usiDisabled == true
      }"
      (click)="writeValue(usiValue)"
      (keyup.enter)="writeValue(usiValue)"
      (keyup.arrowUp)="usiSelectService.moveFocus($any($event))"
      (keyup.arrowDown)="usiSelectService.moveFocus($any($event))"
      [attr.aria-selected]="usiSelectService.value.includes(usiValue)"
      tabindex="0"
      role="option"
      #contentWrapper
    >
      <!-- TODO: Change this to the usi-checkbox component -->
      <span *ngIf="usiMultiSelect" class="usi-checkbox">
        <input
          class="usi-checkbox__input"
          [ngClass]="{ 'usi-checkbox__input--checked': usiSelectService.value.includes(usiValue) }"
          [disabled]="usiDisabled == true"
          type="checkbox"
        />
        <span class="usi-checkbox__label" [ngClass]="{ 'usi-checkbox--disabled': usiDisabled }">
          <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </span>
      </span>

      <ng-container *ngIf="!usiMultiSelect">
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
  usiMultiSelect?: BooleanInput = false;

  constructor(public usiSelectService: UsiSelectService) {}

  ngOnInit(): void {
    if (this.usiValue === undefined) {
      throw new Error('UsiSelectOption: A select option must have a value!');
    }
  }

  /**
   * Write the value to the select service and update form
   * @param { any } value | The value to write to the select service
   */
  public writeValue(value: any): void {
    if (this.usiDisabled !== null && this.usiDisabled !== true) {
      if (!this.usiMultiSelect) {
        this.usiSelectService.valueObject[0] = { label: this.content?.nativeElement.textContent, value: value };
        this.usiSelectService.value = [value];
        this.usiSelectService.showOptions = false;
      } else {
        if (this.usiSelectService.value.includes(value)) {
          this.usiSelectService.value = [...this.usiSelectService.value.filter((item: string) => item !== value)];
          this.usiSelectService.valueObject = [...this.usiSelectService.valueObject.filter((item: SelectData) => item.value !== value)];

          // this.usiSelectService.multiSelectBadges.splice(this.usiSelectService.multiSelectBadges.indexOf(value), 1);
          // this.usiSelectService.checkOverflow(value, true);
        } else {
          this.usiSelectService.value = [...this.usiSelectService.value, value];
          this.usiSelectService.valueObject = [...this.usiSelectService.valueObject, { label: this.content?.nativeElement.textContent, value: value }];

          // this.usiSelectService.multiSelectBadges.push({ label: this.content?.nativeElement.textContent, value: value });
          // this.usiSelectService.checkOverflow(value, false);
        }
      }
    }

    this.usiSelectService.updateChanges();
  }
}
