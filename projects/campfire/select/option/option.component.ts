import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

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
      (click)="writeOptionValue(usiValue)"
      (keyup.enter)="writeOptionValue(usiValue)"
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
export class UsiOptionComponent implements AfterViewInit, OnInit {
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

  ngAfterViewInit(): void {
    this.usiSelectService.initialChosenValues.subscribe((newValue: any) => {
      if (newValue === this.usiValue) {
        this.writeOptionValue(newValue);
      }
    });
  }

  /**
   * This handles writing our value to the service for both our normal select
   * and our multiselect. We add the value by default and remove it if it is
   * already included.
   * @param { any } value | our value we need to write to our service
   */
  public writeOptionValue(value: any): void {
    if (this.usiDisabled !== null && this.usiDisabled !== true) {
      if (!this.usiMultiselect) {
        this.usiSelectService.chosenValues.next([{ label: this.content?.nativeElement.textContent, value: value }]);
      } else {
        // remove value if it is already chosen
        if (this.usiSelectService.chosenValues.value.some((e: any) => e.value === value)) {
          this.usiSelectService.chosenValues.next(
            this.usiSelectService.chosenValues.getValue().filter((item: any) => {
              return item.value !== value;
            })
          );
        } else {
          // add the value
          this.usiSelectService.chosenValues.next(
            this.usiSelectService.chosenValues.getValue().concat([
              {
                label: this.content?.nativeElement.textContent,
                value: value,
              },
            ])
          );
        }
      }
    }
  }
}
