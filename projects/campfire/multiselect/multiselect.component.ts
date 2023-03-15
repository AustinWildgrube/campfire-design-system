import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UsiSelectComponent, UsiSelectService } from 'usi-campfire/select';

@Component({
  selector: 'usi-multiselect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="usi-select"
      (usiClickOutside)="usiSelectService.showOptions = false"
      [attr.aria-expanded]="usiSelectService.showOptions"
      [attr.aria-labelledby]="uid"
      role="listbox"
    >
      <div class="usi-input-group">
        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--filled': (formControlValue.value && formControlValue.value.length > 0) || !isEmpty,
            'usi-input-group__input--error': hasError || usiForceError
          }"
          (click)="usiSelectService.showOptions = !usiSelectService.showOptions"
          (keyup)="searchOptions($any($event).target.value)"
          (keyup.enter)="showOptionList()"
          [value]="!isEmpty && formControlValue.value ? formControlValue.value.length + ' Selected' : ''"
          [placeholder]="usiPlaceholder"
          [disabled]="usiDisabled == true"
          [attr.aria-labelledby]="uid"
          readonly
        />

        <fa-icon
          *ngIf="usiSelectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="usiSelectService.showOptions = false"
          [icon]="['fal', 'angle-up']"
        ></fa-icon>

        <fa-icon
          *ngIf="!usiSelectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="usiSelectService.showOptions = true"
          [icon]="['fal', 'angle-down']"
        ></fa-icon>

        <label [id]="uid" class="usi-input-group__label">{{ usiLabel }} <span *ngIf="usiRequired">*</span></label>

        <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
          {{ usiHint }}
        </span>

        <div *ngIf="(usiError && formControlValue.touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
          <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
        </div>
      </div>

      <ul *ngIf="usiSelectService.showOptions && usiData" class="usi-select__options" role="group">
        <li *ngIf="usiSearchable" class="usi-select__option--search usi-select__option--controls">
          <fa-icon class="usi-input-group__prefix usi-input-group__prefix--multiselect" [icon]="['fal', 'magnifying-glass']"></fa-icon>
          <input class="usi-select__search" (keyup)="searchOptions($any($event).target.value)" placeholder="Search" type="text" />
        </li>

        <li class="usi-select__option usi-select__option--controls">
          <label (usiChange)="showSelectedOnly($event)" usi-checkbox>Show Selected Only</label>
          <span class="usi-select__clear-all" (click)="clearAll()">Clear All</span>
        </li>

        <li *ngIf="manipulatedData.size === 0" class="usi-select__no-result">{{ usiNoResultMessage }}</li>

        <ng-container *ngFor="let options of manipulatedData | keyvalue: asIsOrder">
          <li *ngIf="options.key !== undefined" class="usi-select__group-label">{{ options.key }}</li>
          <li *ngIf="manipulatedData.size > 1 && options.key === undefined" class="usi-select__group-divider"></li>

          <ng-container *ngFor="let option of options.value; let i = index">
            <usi-option [usiValue]="option.value" [usiDisabled]="option.disabled" usiMultiselect>
              {{ option.label }}
            </usi-option>
          </ng-container>
        </ng-container>
      </ul>

      <ul *ngIf="usiSelectService.showOptions && !usiData" class="usi-select__options" role="group">
        <li *ngIf="usiSearchable" class="usi-select__option--search usi-select__option--controls">
          <fa-icon class="usi-input-group__prefix usi-input-group__prefix--multiselect" [icon]="['fal', 'magnifying-glass']"></fa-icon>
          <input class="usi-select__search" (keyup)="searchOptions($any($event).target.value)" placeholder="Search" type="text" />
        </li>

        <li class="usi-select__option usi-select__option--controls">
          <label (usiChange)="showSelectedOnly($event)" usi-checkbox>Show Selected Only</label>
          <span class="usi-select__clear-all" (click)="clearAll()">Clear All</span>
        </li>

        <ng-content></ng-content>
      </ul>
    </div>
  `,
  styleUrls: ['./styles/multiselect.component.scss', '../select/styles/select.component.scss', '../input/styles/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiMultiselectComponent),
      multi: true,
    },
    UsiSelectService,
  ],
})
export class UsiMultiselectComponent extends UsiSelectComponent {
  /**
   * Only show the selected values when event is true
   * @param { boolean } event | whether to show selected only or not
   * @return
   */
  public showSelectedOnly(event: boolean): void {
    this.usiSelectService.showSelectedOnly = event;

    if (event) {
      this.manipulatedData.clear();
      // this.manipulatedData.set(undefined, this.usiSelectService.chosenValues.value);
    } else {
      if (this.usiData) {
        this.groupedData = this.groupBy(this.usiData, (data) => data.group);
      }

      this.manipulatedData = this.groupedData;
    }
  }

  /**
   * Clear all the selected values by emptying the value array
   * @return
   */
  public clearAll(): void {
    this.writeValue([]);
    this.showSelectedOnly(false);
  }
}
