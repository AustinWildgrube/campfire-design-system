import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UsiSelectComponent, UsiSelectService } from 'usi-campfire/select';

@Component({
  selector: 'usi-multiselect',
  template: `
    <div
      class="usi-select"
      (usiClickOutside)="usiSelectService.showOptions = false; usiSelectService.activeFocus = null"
      (keyup)="onKeyUp($event)"
      [attr.aria-activedescendant]="usiSelectService.activeFocus"
      [attr.aria-expanded]="usiSelectService.showOptions"
      [attr.aria-labelledby]="uid"
      aria-haspopup="listbox"
      aria-controls="listbox"
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
          [value]="!isEmpty && formControlValue.value ? formControlValue.value.length + ' Selected' : ''"
          [placeholder]="usiPlaceholder"
          [disabled]="usiDisabled"
          [attr.aria-labelledby]="uid"
          readonly
        />

        <fa-icon
          *ngIf="usiSelectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="usiSelectService.showOptions = false"
          [icon]="['fal', 'angle-up']"
          aria-label="Close options"
        ></fa-icon>

        <fa-icon
          *ngIf="!usiSelectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="usiSelectService.showOptions = true"
          [icon]="['fal', 'angle-down']"
          aria-label="Open options"
        ></fa-icon>

        <label [id]="uid" class="usi-input-group__label">{{ usiLabel }} <span *ngIf="usiRequired">*</span></label>

        <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
          {{ usiHint }}
        </span>

        <div *ngIf="(hasError && formControlValue.touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
          <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
        </div>
      </div>

      <ul *ngIf="usiSelectService.showOptions" id="listbox" class="usi-select__options" role="listbox">
        <li *ngIf="usiSearchable" class="usi-select__option--search usi-select__option--controls">
          <fa-icon class="usi-input-group__prefix usi-input-group__prefix--multiselect" [icon]="['fal', 'magnifying-glass']" aria-hidden="true"></fa-icon>
          <input class="usi-select__search" (keyup)="searchOptions($any($event).target.value)" placeholder="Search" type="text" />
        </li>

        <li class="usi-select__option usi-select__option--controls">
          <usi-checkbox (usiChange)="showSelectedOnly($event)">Show Selected Only</usi-checkbox>
          <button class="usi-select__clear-all" (click)="clearAll()">Clear All</button>
        </li>

        <li *ngIf="hiddenOptions === options?.length" class="usi-select__no-result">{{ usiNoResultMessage }}</li>
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
  override ngOnInit() {
    super.ngOnInit();
    this.usiSelectService.isMultiselect = true;
  }

  /**
   * Only show the selected values when event is true
   * @param { boolean } event | whether to show selected only or not
   * @return
   */
  public showSelectedOnly(event: boolean): void {
    this.usiSelectService.showSelectedOnly = event;
    this.searchOptions('');
  }

  /**
   * Clear all the selected values by emptying the value array
   * @return
   */
  public clearAll(): void {
    this.formControlValue.setValue([]);
    this.showSelectedOnly(false);
    this.searchOptions('');
  }
}
