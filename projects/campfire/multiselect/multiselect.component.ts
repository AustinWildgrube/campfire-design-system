import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UsiSelectComponent, UsiSelectService } from 'usi-campfire/select';
import { SelectData } from 'usi-campfire/utils';

@Component({
  selector: 'usi-multiselect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="usi-select"
      (usiClickOutside)="selectService.showOptions = false"
      [attr.aria-expanded]="selectService.showOptions"
      [attr.aria-labelledby]="uid"
      role="listbox"
    >
      <div class="usi-input-group">
        <input
          class="usi-input-group__input--hidden"
          (keyup)="searchOptions($any($event).target.value)"
          [placeholder]="usiPlaceholder"
          [disabled]="usiDisabled == true"
          [value]=""
          [readonly]="!usiSearchable"
        />

        <div
          class="usi-input-group__input usi-input-group__input--multiselect"
          [ngClass]="{
            'usi-input-group__input--filled': selectService.value.length || hasValue,
            'usi-input-group__input--error': hasError || usiForceError
          }"
          (click)="selectService.showOptions = !selectService.showOptions"
          (keyup)="searchOptions($any($event).target.value)"
          (keyup.enter)="showOption()"
          [attr.aria-labelledby]="uid"
        >
          <div class="badges" #badges>
            <span *ngFor="let item of selectService.multiSelectBadges" class="badge">
              {{ item.label }}
              <fa-icon (click)="writeValue(item, $event)" [icon]="['fal', 'times']"></fa-icon>
            </span>

            <span *ngIf="selectService.showMore" class="badge badge--overflow">...</span>

            <div *ngIf="selectService.showMore" class="badges__modal">
              <div class="badges__overflow">
                <ng-container *ngFor="let item of selectService.valueObject; let i = index">
                  <div *ngIf="!selectService.multiSelectBadges.includes(item)">
                    <span>{{ item.label }}</span>
                    <fa-icon (click)="writeValue(item, $event)" [icon]="['fal', 'times']"></fa-icon>
                  </div>
                </ng-container>
              </div>
            </div>
          </div>
        </div>

        <span class="usi-input-group__suffix usi-input-group__suffix--multiselect">{{ selectService.value.length }} Selected</span>

        <fa-icon
          *ngIf="selectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="selectService.showOptions = false"
          [icon]="['fal', 'angle-up']"
        ></fa-icon>

        <fa-icon
          *ngIf="!selectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="selectService.showOptions = true"
          [icon]="['fal', 'angle-down']"
        ></fa-icon>

        <label [id]="uid" class="usi-input-group__label">{{ usiLabel }} <span *ngIf="usiRequired">*</span></label>

        <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
          {{ usiHint }}
        </span>

        <div *ngIf="(usiError && touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
          <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
        </div>
      </div>

      <ul *ngIf="selectService.showOptions && usiData" class="usi-select__options" role="group">
        <li *ngIf="manipulatedData.size === 0" class="usi-select__no-result">{{ usiNoResultMessage }}</li>

        <ng-container *ngFor="let options of manipulatedData | keyvalue: asIsOrder">
          <li *ngIf="options.key !== undefined" class="usi-select__group-label">{{ options.key }}</li>

          <li *ngIf="manipulatedData.size > 1 && options.key === undefined" class="usi-select__group-divider"></li>

          <ng-container *ngFor="let option of options.value; let i = index">
            <li
              class="usi-select__option"
              [ngClass]="{
                'usi-select__option--disabled': option.disabled == true
              }"
              (click)="writeValue(option, $event)"
              (keyup.arrowUp)="selectService.moveFocus($any($event))"
              (keyup.arrowDown)="selectService.moveFocus($any($event))"
              [attr.aria-selected]="selectService.value.includes(option.value)"
              tabindex="0"
              role="option"
            >
              <label [usiChecked]="selectService.value.includes(option.value)" usi-checkbox> {{ option.label }}</label>
            </li>
          </ng-container>
        </ng-container>
      </ul>

      <ul *ngIf="selectService.showOptions && !usiData" class="usi-select__options" role="group" #contentWrapper>
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
export class UsiMultiselectComponent extends UsiSelectComponent implements AfterViewInit {
  @ViewChild('badges', { static: true }) badges: any;
  @ViewChild('contentWrapper') content: ElementRef | undefined;

  ngAfterViewInit() {
    if (this.badges) {
      this.selectService.inputWidth = this.badges.nativeElement.scrollWidth - 36;
    }
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { SelectData | string } value | the value to write
   * @param event
   * @return
   */
  public override writeValue(value: SelectData | SelectData[] | string, event?: Event): void {
    event?.preventDefault();

    if (value && Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        this.writeToService(value[i]);
      }
    } else if (value && typeof value === 'object') {
      this.writeToService(value);
    }

    this.manipulatedData = this.groupedData;
    this.selectService.updateChanges();
  }

  private writeToService(value: SelectData): void {
    if (!value.disabled) {
      if (this.selectService.valueObject.includes(value)) {
        this.selectService.value = [...this.selectService.value.filter((item: string) => item !== value.value)];
        this.selectService.valueObject = [...this.selectService.valueObject.filter((item: SelectData) => item.value !== value.value)];
        this.selectService.multiSelectBadges.splice(this.selectService.multiSelectBadges.indexOf(value), 1);

        this.selectService.checkOverflow(value, true);
      } else {
        this.selectService.value = [...this.selectService.value, value.value];
        this.selectService.valueObject = [...this.selectService.valueObject, value];
        this.selectService.multiSelectBadges.push(value);

        this.selectService.checkOverflow(value, false);
      }
    }
  }
}
