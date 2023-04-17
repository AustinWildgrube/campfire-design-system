import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';
import { UsiInputHarnessComponent } from 'usi-campfire/shared';

@Component({
  // TODO: re-introduce the usi-time-picker selector once usi-components is removed
  selector: 'usi-time-selector',
  template: `
    <div class="usi-select usi-time" (usiClickOutside)="showOptions = false" role="listbox" [attr.aria-expanded]="showOptions" [attr.aria-labelledby]="uid">
      <div class="usi-input-group">
        <div
          class="usi-input-group__input usi-input-group--time"
          [ngClass]="{
            'usi-input-group__input--filled': true,
            'usi-input-group__input--error': hasError || usiForceError
          }"
          (click)="showOptions = !showOptions"
        >
          <div>
            <input
              class="usi-time-group__input"
              [formControl]="formControlValueHours"
              [max]="hoursMax"
              [readonly]="!usiManualEntry"
              [attr.aria-labelledby]="uid"
              (input)="checkValue()"
              (blur)="formatTime('hours')"
              placeholder="--"
              type="number"
              min="0"
            />

            <span class="usi-time-group__dot">:</span>

            <input
              class="usi-time-group__input usi-time-group__input--minutes"
              [formControl]="formControlValueMinutes"
              [readonly]="!usiManualEntry"
              [attr.aria-labelledby]="uid"
              (input)="checkValue()"
              (blur)="formatTime('minutes')"
              placeholder="--"
              type="number"
              min="0"
              max="60"
            />
          </div>

          <input
            *ngIf="!usiTwentyFourHour"
            class="usi-time__meridiem"
            [formControl]="formControlValueMeridiem"
            [readonly]="!usiManualEntry"
            (keyup)="formatMeridiem($event)"
            placeholder="--"
            maxlength="2"
          />
        </div>

        <label [id]="uid" class="usi-input-group__label">{{ usiLabel }} <span *ngIf="usiRequired">*</span></label>

        <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
          {{ usiHint }}
        </span>

        <div *ngIf="(usiError && formControlValue.touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
          <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
        </div>
      </div>

      <div *ngIf="showOptions && usiShowDropdown" class="usi-select__options usi-time__options" role="group">
        <ul *ngIf="!usiInterval" class="usi-time__list">
          <li
            *ngFor="let hour of hours"
            class="usi-select__option"
            [ngClass]="{ 'usi-select__option--active': formControlValueHours.value === hour }"
            (click)="formControlValueHours.setValue(hour); sendFormattedTimeToOnChange()"
            tabindex="0"
            role="option"
          >
            {{ hour }}
          </li>
        </ul>

        <ul *ngIf="!usiInterval" class="usi-time__list">
          <li
            *ngFor="let minute of minutes"
            class="usi-select__option"
            [ngClass]="{ 'usi-select__option--active': formControlValueMinutes.value === minute }"
            (click)="formControlValueMinutes.setValue(minute); sendFormattedTimeToOnChange()"
            tabindex="0"
            role="option"
          >
            {{ minute }}
          </li>
        </ul>

        <ul *ngIf="!usiInterval && !usiTwentyFourHour" class="usi-time__list">
          <li
            *ngFor="let meridiemValue of meridiem"
            class="usi-select__option"
            [ngClass]="{ 'usi-select__option--active': formControlValueMeridiem.value === meridiemValue }"
            (click)="formControlValueMeridiem.setValue(meridiemValue); sendFormattedTimeToOnChange()"
            tabindex="0"
            role="option"
          >
            {{ meridiemValue }}
          </li>
        </ul>

        <ul *ngIf="usiInterval" class="usi-time__list">
          <li *ngFor="let intervalTime of intervalTimes" class="usi-select__option" (click)="selectInterval(intervalTime)" tabindex="0" role="option">
            {{ intervalTime }}
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./styles/time-picker.component.scss', '../input/styles/input.component.scss', '../select/styles/select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiTimePickerComponent),
      multi: true,
    },
  ],
})
export class UsiTimePickerComponent extends UsiInputHarnessComponent implements OnInit {
  @Input()
  usiStart?: string;

  @Input()
  usiEnd?: string;

  @Input()
  usiInterval?: number;

  @Input()
  @InputBoolean()
  usiShowDropdown?: BooleanInput;

  @Input()
  @InputBoolean()
  usiTwentyFourHour?: BooleanInput;

  @Input()
  @InputBoolean()
  usiManualEntry?: BooleanInput = true;

  hours: string[] = [];
  minutes: string[] = [];
  meridiem: string[] = ['AM', 'PM'];
  intervalTimes: string[] = [];
  hoursMax: number = this.usiTwentyFourHour ? 24 : 12;
  showOptions: boolean = false;

  formControlValueHours: FormControl = new FormControl();
  formControlValueMinutes: FormControl = new FormControl();
  formControlValueMeridiem: FormControl = new FormControl();

  override ngOnInit() {
    if (this.formControlName) {
      const defaultControl = this.parentFormGroup.form.controls[this.formControlName];
      if (typeof defaultControl.value !== 'string') return;

      this.selectInterval(defaultControl.value);
      defaultControl.setValue(this.formatTimeForOutput());
    }

    if (this.usiValue) {
      this.selectInterval(this.usiValue as string);
    }

    if (this.usiInterval) {
      this.createIntervalArray();
    } else {
      this.createTimeArrays();
    }
  }

  /**
   * Creates the necessary arrays for the dropdown, containing hours and minutes.
   * It takes care of zero-padding any numbers under 10 and accommodates 24-hour
   * time format.
   * @return
   */
  public createTimeArrays(): void {
    for (let i = 1; i < 60; i++) {
      if (i <= 9) {
        this.hours.push('0' + i.toString());
        this.minutes.push('0' + i.toString());
      } else {
        if ((this.hoursMax === 12 && i <= 12) || (this.hoursMax === 24 && i < 24)) {
          this.hours.push(i.toString());
        }

        this.minutes.push(i.toString());
      }
    }
  }

  /**
   * Creates the interval times we need based on the usiInterval attribute. Since the
   * times are strings we need to split hours and minutes to be able to use the JS
   * date object.
   * @return
   */
  public createIntervalArray(): void {
    const startTimeString = this.usiStart || '00:00';
    const endTimeString = this.usiEnd || '23:59';

    const [startHours, startMinutes] = startTimeString.split(':');
    const [endHours, endMinutes] = endTimeString.split(':');

    const startTime = new Date();
    startTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);

    const endTime = new Date();
    endTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

    let currentTime = startTime;
    while (currentTime < endTime) {
      const locale = this.usiTwentyFourHour ? 'en-GB' : 'en-US';
      const timeString = currentTime.toLocaleTimeString([locale], { hour: 'numeric', minute: '2-digit' });
      this.intervalTimes.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + this.usiInterval!);
    }
  }

  /**
   * When a user selects an interval we need to set the formControlValues, so the
   * selected time shows in the input. Then we can format the time for output.
   * @param { string } value | the chosen time
   * @return
   */
  public selectInterval(value: string): void {
    const [time, period] = value.split(/(?=[AP]M)/);
    const [hours, minutes] = time.split(':');

    let ampm = 'AM';
    if (period) {
      ampm = period.toUpperCase();
    } else {
      if (parseInt(hours) > 11) {
        ampm = 'PM';
      }
    }

    let formattedHours = parseInt(hours);
    if (!this.usiTwentyFourHour) {
      formattedHours = parseInt(hours) % 12 === 0 ? 12 : parseInt(hours) % 12;
    }

    this.formControlValueHours.setValue(formattedHours);
    this.formControlValueMinutes.setValue(minutes);
    this.formControlValueMeridiem.setValue(ampm);

    this.sendFormattedTimeToOnChange();
  }

  /**
   * This is more of an autocomplete for the meridiem input. If a user types the letter
   * A then AM is selected, but if the user presses the letter P it will switch over to PM
   * @param { Event } event | the keyboard event that occurred
   */
  public formatMeridiem(event: KeyboardEvent): void {
    if (this.formControlValueMeridiem.value?.length === 2 && event.code === 'KeyM') {
      return;
    }

    if (event.code === 'KeyA') {
      this.formControlValueMeridiem.setValue('AM');
    } else if (event.code === 'KeyP') {
      this.formControlValueMeridiem.setValue('PM');
    } else if (
      (this.formControlValueMeridiem.value?.length !== 2 && this.formControlValueMeridiem.value !== 'AM') ||
      this.formControlValueMeridiem.value !== 'PM'
    ) {
      this.formControlValueMeridiem.reset();
    }

    this.sendFormattedTimeToOnChange();
  }

  /**
   * To keep users from typing values that are not acceptable we format the input
   * and replace bad values.
   * @param { 'minutes' | 'hours' } control | which form control was just changed
   */
  public formatTime(control: 'minutes' | 'hours'): void {
    const stringMinutes = this.formControlValueMinutes.value?.toString();
    const stringHours = this.formControlValueHours.value?.toString();

    if (control === 'minutes') {
      this.formControlValueMinutes.setValue(stringMinutes.padStart(2, '0'));
    }

    if (control === 'hours') {
      this.formControlValueHours.setValue(stringHours.padStart(2, '0'));

      if (stringHours === '0') {
        this.formControlValueHours.setValue('12');
      }

      if (stringHours.length > 2) {
        this.formControlValueHours.setValue(stringHours.slice(0, 2));
      }
    }

    this.sendFormattedTimeToOnChange();
  }

  /**
   * If the user types in a value that isn't valid we reformat it to something
   * that is valid.
   * @return
   */
  public checkValue(): void {
    const minValue = 0;
    const maxValueMin = 59;
    const maxValueHour = this.usiTwentyFourHour ? 23 : 12;

    let hours = this.formControlValueHours.value;
    let minutes = this.formControlValueMinutes.value;

    if (minutes < minValue) {
      minutes = minValue;
    } else if (minutes > maxValueMin) {
      minutes = maxValueMin;
    }

    switch (true) {
      case hours < minValue:
        hours = minValue;
        break;
      case hours > maxValueHour:
        hours = maxValueHour;
        break;
      default:
        break;
    }

    this.formControlValueHours.setValue(hours);
    this.formControlValueMinutes.setValue(minutes);
  }

  /**
   * We set the hour and minutes value to output to the form.
   * @return
   */
  public formatTimeForOutput(): { hours: number; minutes: number } {
    let outputHours = this.formControlValueHours.value;
    if (this.formControlValueMeridiem.value === 'PM' && this.formControlValueHours.value !== '12') {
      outputHours = parseInt(this.formControlValueHours.value) + 12;
    }

    if (this.formControlValueMeridiem.value === 'AM' && this.formControlValueHours.value === '12') {
      outputHours = 0;
    }

    return {
      hours: parseInt(outputHours),
      minutes: parseInt(this.formControlValueMinutes.value),
    };
  }

  /**
   * We need to update our formControlValue with the formatted output.
   * @return
   */
  public sendFormattedTimeToOnChange(): void {
    this.onChange(this.formatTimeForOutput());
    this.onTouched();
  }

  /**
   * We need to register an onChange function since we need to overwrite the Angular onChange function
   * @param { (value: string) => void } fn | The function to overwrite with
   * @return
   */
  public override registerOnChange(fn: any): void {
    this.formControlValue.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe((newValue: string | Object) => {
      if (!newValue || typeof newValue !== 'string') return;

      // If the value is a string we know it was programmatically set since we
      // format our value as an object for output.
      this.selectInterval(newValue);
    });

    this.onChange = fn;
  }
}
