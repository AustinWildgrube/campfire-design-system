import { Component, forwardRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as localeData from 'dayjs/plugin/localeData';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

import { BooleanInput, InputBoolean, UsiCalendar, UsiDate, UsiMonth } from 'usi-campfire/utils';

@Component({
  selector: 'usi-date-picker',
  template: `
    <div class="usi-date-picker" role="listbox" [attr.aria-expanded]="showOptions" [attr.aria-labelledby]="uid">
      <div class="usi-input-group">
        <fa-icon
          class="usi-input-group__suffix"
          [icon]="['fal', 'calendar-day']"
          [ngClass]="{ 'usi-input-group__suffix--error': usiError || usiForceError }"
        ></fa-icon>

        <input
          class="usi-input-group__input usi-input-group__input--suffix"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': value !== undefined
          }"
          (click)="showOptions = !showOptions"
          (input)="onChange($any($event).target.value)"
          [placeholder]="usiPlaceholder"
          [disabled]="usiDisabled == true"
          [required]="usiRequired"
          [attr.aria-labelledby]="uid"
          #dateInput
        />

        <label
          [id]="uid"
          class="usi-input-group__label"
          [ngClass]="{
            'usi-input-group__label--error': hasError || usiForceError
          }"
        >
          {{ usiLabel }} <span *ngIf="usiRequired">*</span>
        </label>

        <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
          {{ usiHint }}
        </span>

        <div *ngIf="(usiError && touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
          <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
        </div>
      </div>

      <div
        *ngIf="showOptions && view === 'day'"
        class="usi-date-picker__calendar usi-date-picker__calendar--flex"
        (usiClickOutside)="showOptions = false"
        [style.width.px]="316 * numberOfMonths"
      >
        <div class="usi-date-picker__wrapper" *ngFor="let month of months; let i = index">
          <div class="usi-date-picker__header">
            <button class="usi-date-picker__selected-month-year" (click)="changeCalendarView('month')">
              {{ monthName[months[i].month] }} {{ months[i]['year'] }}
              <fa-icon class="usi-date-picker__icons usi-date-picker__icons--down" [icon]="['far', 'angle-down']"></fa-icon>
            </button>

            <div>
              <fa-icon
                *ngIf="i === months.length - 1"
                class="usi-date-picker__icons usi-date-picker__icons--left"
                [icon]="['fal', 'chevron-left']"
                (click)="decreaseMonth()"
              ></fa-icon>

              <fa-icon
                *ngIf="i === months.length - 1"
                class="usi-date-picker__icons usi-date-picker__icons--right"
                [icon]="['fal', 'chevron-right']"
                (click)="increaseMonth()"
              ></fa-icon>
            </div>
          </div>

          <div class="usi-date-picker__body">
            <table class="usi-date-picker__days">
              <thead>
                <tr>
                  <th *ngFor="let weekDay of narrowDaysOfWeek" scope="col">{{ weekDay }}</th>
                </tr>
              </thead>

              <tbody>
                <tr *ngFor="let week of month.dates">
                  <td
                    *ngFor="let date of week; let j = index"
                    [ngClass]="{
                      'usi-date-picker__day--other-month': date.otherMonth || date.beforeToday,

                      'usi-date-picker__day--range':
                        isInMultiRange(getFormattedDate(date)) &&
                        date.day !== 1 &&
                        isEndOfMonth(getFormattedDate(date)) !== date.day &&
                        usiSelectionMode === 'range',

                      'usi-date-picker__day--range-first':
                        value.length == 2 && isInMultiRange(getFormattedDate(date)) && date.day === 1 && usiSelectionMode === 'range',
                      'usi-date-picker__day--range-last':
                        value.length == 2 &&
                        isInMultiRange(getFormattedDate(date)) &&
                        isEndOfMonth(getFormattedDate(date)) === date.day &&
                        usiSelectionMode === 'range',

                      'usi-date-picker__day--range-selected-before':
                        usiSelectionMode === 'range' &&
                        date.day !== 1 &&
                        value.length == 2 &&
                        value.includes(getFormattedDate(date)) &&
                        ((!isBeforeDate() && value.indexOf(getFormattedDate(date)) === 0) || (isBeforeDate() && value.indexOf(getFormattedDate(date)) === 1)),

                      'usi-date-picker__day--range-selected-after':
                        usiSelectionMode === 'range' &&
                        value.length == 2 &&
                        value.includes(getFormattedDate(date)) &&
                        ((!isBeforeDate() && value.indexOf(getFormattedDate(date)) === 1) || (isBeforeDate() && value.indexOf(getFormattedDate(date)) === 0)),

                      'usi-date-picker__day--hover-between':
                        usiSelectionMode === 'range' &&
                        hoveredDate !== value[0] &&
                        value.length !== 2 &&
                        (isHoverForMulti(getFormattedDate(date)) ||
                          (value.length > 0 && hoveredDate === getFormattedDate(date)) ||
                          value[0] === getFormattedDate(date)),

                      'usi-date-picker__day--hover-dash-before':
                        usiSelectionMode === 'range' &&
                        hoveredDate !== value[0] &&
                        value.length !== 2 &&
                        ((hoveredDate === getFormattedDate(date) && isHoverBeforeSelectedDate()) ||
                          (this.value[0] === getFormattedDate(date) && !isHoverBeforeSelectedDate())),

                      'usi-date-picker__day--hover-dash-after':
                        usiSelectionMode === 'range' &&
                        hoveredDate !== value[0] &&
                        value.length !== 2 &&
                        ((hoveredDate === getFormattedDate(date) && !isHoverBeforeSelectedDate()) ||
                          (this.value[0] === getFormattedDate(date) && isHoverBeforeSelectedDate()))
                    }"
                    (click)="selectDate(date)"
                    (mouseenter)="hoveredDate = getFormattedDate(date)"
                  >
                    <span
                      [ngClass]="{
                        'usi-date-picker__day--today': date.today,
                        'usi-date-picker__day--selected': value.includes(getFormattedDate(date)),
                        'usi-date-picker__day--disabled': isDateDisabled(date.day, date.month, date.year)
                      }"
                    >
                      {{ date.day }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div *ngIf="showOptions && view === 'month'" class="usi-date-picker__calendar" (usiClickOutside)="showOptions = false">
        <div class="usi-date-picker__header usi-date-picker__header--months">
          <button class="usi-date-picker__selected-month-year" (click)="changeCalendarView('year')">
            {{ months[0]['year'] }}
            <fa-icon class="usi-date-picker__icons usi-date-picker__icons--down" [icon]="['far', 'angle-down']"></fa-icon>
          </button>

          <div>
            <fa-icon class="usi-date-picker__icons usi-date-picker__icons--left" [icon]="['fal', 'chevron-left']" (click)="decreaseYear()"></fa-icon>
            <fa-icon class="usi-date-picker__icons usi-date-picker__icons--right" [icon]="['fal', 'chevron-right']" (click)="increaseYear()"></fa-icon>
          </div>
        </div>

        <div class="usi-date-picker__body usi-date-picker__body--months">
          <div class="usi-date-picker__months-years">
            <span
              *ngFor="let month of monthName; let i = index"
              class="usi-date-picker__months-years-text"
              [ngClass]="{ 'usi-date-picker__months-years--selected': selectedMonth === i }"
              (click)="selectMonth(i); createMonths(i, months[0].year); changeCalendarView('day')"
            >
              {{ month }}
            </span>
          </div>
        </div>
      </div>

      <div *ngIf="showOptions && view === 'year'" class="usi-date-picker__calendar" (usiClickOutside)="showOptions = false">
        <div class="usi-date-picker__header usi-date-picker__header--months">
          <button class="usi-date-picker__selected-month-year">
            {{ months[0]['year'] - 6 }} - {{ months[0]['year'] + 5 }}
            <fa-icon class="usi-date-picker__icons usi-date-picker__icons--down" [icon]="['far', 'angle-down']"></fa-icon>
          </button>

          <div>
            <fa-icon class="usi-date-picker__icons usi-date-picker__icons--left" [icon]="['fal', 'chevron-left']" (click)="decreaseYear()"></fa-icon>
            <fa-icon class="usi-date-picker__icons usi-date-picker__icons--right" [icon]="['fal', 'chevron-right']" (click)="increaseYear()"></fa-icon>
          </div>
        </div>

        <div class="usi-date-picker__body usi-date-picker__body--months">
          <div class="usi-date-picker__months-years">
            <span
              *ngFor="let year of createYears(months[0].year)"
              class="usi-date-picker__months-years-text"
              [ngClass]="{ 'usi-date-picker__months-years--selected': selectedYear === year }"
              (click)="selectYear(year); createMonths(0, year); changeCalendarView('month')"
            >
              {{ year }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./styles/date-picker.component.scss', '../input/styles/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiDatePickerComponent),
      multi: true,
    },
  ],
})
export class UsiDatePickerComponent implements OnInit {
  @ViewChild('dateInput') dateInput: { nativeElement: { value: string | string[] } } | undefined;

  @Input()
  usiError: TemplateRef<any> | null = null;

  @Input()
  usiLabel?: string;

  @Input()
  usiPlaceholder?: string = '';

  @Input()
  usiHint?: string;

  @Input()
  usiDisabledDays?: number[];

  @Input()
  usiDisabledDates?: Date[];

  @Input()
  usiMinDate?: Date;

  @Input()
  usiMaxDate?: Date;

  @Input()
  usiNumberOfMonths?: number;

  @Input()
  usiFirstDayOfWeek?: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | number;

  @Input()
  usiView?: 'day' | 'month' | 'year' = 'day';

  @Input()
  usiDateFormat?: string = 'L';

  @Input()
  usiDateOutputFormat?: string;

  @Input()
  usiSelectionMode?: 'single' | 'multiple' | 'range' = 'single';

  @Input()
  usiLocalization?: string;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiRequired?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiForceError?: BooleanInput;

  showOptions: boolean = false;
  hasError: boolean | null = false;
  touched: boolean | null = false;

  months: UsiMonth[] = [];
  numberOfMonths: number = 1;
  selectedMonth: number = dayjs().month();
  selectedYear: number = dayjs().year();

  view: 'day' | 'month' | 'year' = 'day';
  narrowDaysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  daysOfWeek: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  monthName: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  uid: string = (Math.random() + 1).toString(36).substring(7);
  hoveredDate: string = '';
  value: string[] | string = [];

  constructor() {
    dayjs.extend(isBetween);
    dayjs.extend(localeData);
    dayjs.extend(localizedFormat);
  }

  async ngOnInit(): Promise<void> {
    if (this.usiLocalization) {
      await this.dynamicLocalizationImport();
    }

    if (this.usiNumberOfMonths) {
      this.numberOfMonths = this.usiNumberOfMonths;
    }

    if (this.usiView) {
      this.view = this.usiView;
    }

    // Get the initial month to show
    const date = new Date();
    this.createMonths(date.getMonth(), date.getFullYear());
    this.createWeekDays();
  }

  /**
   * Determines the months we need shown and adds them to an array
   * @param { number } month | The month we are starting with
   * @param { number } year | The year we are starting with
   * @return
   */
  public createMonths(month: number, year: number): void {
    this.months = this.months = [];

    for (let i = 0; i < this.numberOfMonths; i++) {
      let m = month + i;
      let y = year;

      // Rollover to next year
      if (m > 11) {
        m = (m % 11) - 1;
        y = year + 1;

        // Roll backward to previous year
      } else if (m < 0) {
        m = 11;
        y = year - 1;
      }

      this.months.push(this.createMonth(m, y));
    }
  }

  /**
   * Creates a month object to use for the calendar interface.
   * @param { number } month | The month to create the calendar for
   * @param { number } year | The year to create the calendar for
   * @private { CalendarInterface } | All the data we need to create the calendar
   */
  private createMonth(month: number, year: number): UsiCalendar {
    let dates = [];
    let dayNo = 1;
    let today = new Date();
    let firstDay = this.getFirstDayOfMonthIndex(month, year);
    let daysLength = this.getDaysCountInMonth(month, year);
    let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
    let monthRows = Math.ceil((daysLength + firstDay) / 7);

    for (let i = 0; i < monthRows; i++) {
      let week: UsiDate[] = [];

      if (i == 0) {
        if (this.numberOfMonths === 1) {
          for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
            let prev = this.getPreviousMonthAndYear(month, year);

            week.push({
              day: j,
              month: prev.month,
              year: prev.year,
              otherMonth: true,
              today: this.isToday(today, j, prev.month, prev.year),
            });
          }
        }

        let remainingDaysLength = 7 - week.length;
        for (let j = 0; j < remainingDaysLength; j++) {
          week.push({
            day: dayNo,
            month: month,
            year: year,
            beforeToday: dayNo < today.getDate(),
            today: this.isToday(today, dayNo, month, year),
          });

          dayNo++;
        }
      } else {
        for (let j = 0; j < 7; j++) {
          if (dayNo > daysLength) {
            if (this.numberOfMonths === 1) {
              let next = this.getNextMonthAndYear(month, year);

              week.push({
                day: dayNo - daysLength,
                month: next.month,
                year: next.year,
                otherMonth: true,
                today: this.isToday(today, dayNo - daysLength, next.month, next.year),
              });
            }
          } else {
            week.push({
              day: dayNo,
              month: month,
              year: year,
              beforeToday: dayNo < today.getDate(),
              today: this.isToday(today, dayNo, month, year),
            });
          }

          dayNo++;
        }
      }

      dates.push(week);
    }

    return {
      dates: dates,
      month: month,
      year: year,
    };
  }

  /**
   * Since we show 11 years in the year view we need to
   * determine the start and end.
   * @param { number } startingYear | Which year we need to count from
   * @return { number[] } An array of years to show in the view
   */
  public createYears(startingYear: number): number[] {
    let yearPickerValues = [];
    let base = startingYear - (startingYear % 12);

    for (let i = 0; i < 12; i++) {
      yearPickerValues.push(base + i);
    }

    return yearPickerValues;
  }

  /**
   * Since some countries use a date system that starts with
   * Monday we need to be able to dynamically create our weekdays
   * @return
   */
  public createWeekDays(): void {
    let weekDays = [];
    let dayIndex = this.getFirstDateOfWeek();
    const weekDaysMin = dayjs.weekdaysMin();

    for (let i = 0; i < 7; i++) {
      weekDays.push(weekDaysMin[dayIndex]);
      dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
    }

    this.narrowDaysOfWeek = weekDays;
  }

  /**
   * Since we have three different calendar views we need to
   * set a variable, so we know what to render.
   * @param { day | month | year } view | The view to display
   * @return
   */
  public changeCalendarView(view: 'day' | 'month' | 'year'): void {
    this.view = view;
  }

  /**
   * When the left calendar arrow is clicked on the year view
   * we need to decrease the year
   * @return
   */
  public decreaseYear(): void {
    this.createMonths(this.months[0].month, this.months[0].year - 12);
  }

  /**
   * When the right calendar arrow is clicked on the year view
   * we need to increase the year
   * @return
   */
  public increaseYear(): void {
    this.createMonths(this.months[0].month, this.months[0].year + 12);
  }

  /**
   * When the left calendar arrow is clicked on the month view
   * we need to decrease the month
   * @return
   */
  public decreaseMonth(): void {
    this.createMonths(this.months[0].month - 1, this.months[0].year);
  }

  /**
   * When the right calendar arrow is clicked on the month view
   * we need to increase the month
   * @return
   */
  public increaseMonth(): void {
    this.createMonths(this.months[this.months.length - 1].month + 1, this.months[this.months.length - 1].year);
  }

  /**
   * We need to check which days of our calendar are disabled, so we can strike
   * through them and keep them from being selected. This function accounts for
   * all methods of disabling days.
   * @param { number } day | The day of the month to check
   * @param { number } month | The month of the year to check
   * @param { number } year | The year to check
   * @return { boolean } | Whether the day is disabled or not
   */
  public isDateDisabled(day: number, month: number, year: number): boolean {
    if (this.usiDisabledDays) {
      let weekday = new Date(year, month, day);
      let weekdayNumber = weekday.getDay();

      return this.usiDisabledDays.indexOf(weekdayNumber) !== -1;
    }

    if (this.usiDisabledDates) {
      for (let disabledDate of this.usiDisabledDates) {
        if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
          return true;
        }
      }
    }

    if (this.usiMinDate) {
      if (this.usiMinDate.getFullYear() > year) {
        return true;
      } else if (this.usiMinDate.getFullYear() === year) {
        if (this.usiMinDate.getMonth() > month) {
          return true;
        } else if (this.usiMinDate.getMonth() === month) {
          if (this.usiMinDate.getDate() > day) {
            return true;
          }
        }
      }
    }

    if (this.usiMaxDate) {
      if (this.usiMaxDate.getFullYear() < year) {
        return true;
      } else if (this.usiMaxDate.getFullYear() === year) {
        if (this.usiMaxDate.getMonth() < month) {
          return true;
        } else if (this.usiMaxDate.getMonth() === month) {
          if (this.usiMaxDate.getDate() < day) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Here we need to check if the second selected day is before the first selected day.
   * This is because when we are styling them we need to swap the before and after
   * pseudo selector to match the styles.
   * @return
   */
  public isBeforeDate(): boolean {
    return dayjs(this.value[1]).isBefore(this.value[0]);
  }

  /**
   * We need to check if the hover date is before or after the first
   * selected date we can style the range correctly.
   * @return { boolean } | Whether the hover date is before or after the first selected date
   */
  public isHoverBeforeSelectedDate(): boolean {
    return dayjs(this.hoveredDate).isBefore(this.value[0]);
  }

  /**
   * To make the fade happen on the range selection mode we need to determine
   * if the date is the last day of the month
   * @param { string } date | The date to check
   * @return { number } The number of days in the month
   */
  public isEndOfMonth(date: string): number {
    return dayjs(date).daysInMonth();
  }

  /**
   * Format our date, so we can check it in various places.
   * @param { UsiDate } date | The date object for the specific day we need formatted
   * @return { string } The formatted date
   */
  public getFormattedDate(date: UsiDate): string {
    const preFormattedDate = `${date.year}-${date.month + 1}-${date.day}`;
    return dayjs(preFormattedDate).format(this.usiDateFormat);
  }

  /**
   * We need to know if the date falls between first selection
   * and the hovered date, so we can style them appropriately
   * @param { string } date | The date object for the specific day we need styled
   * @return { boolean } Whether the date is between the first selection and the hovered date
   */
  public isHoverForMulti(date: string): boolean {
    if (this.value.length === 0 || this.value.length === 2) {
      return false;
    }

    return dayjs(date).isBetween(this.value[0], this.hoveredDate);
  }

  /**
   * We need to know if the date falls between selected dates,
   * so we can style them appropriately
   * @param { UsiDate } date | The date object for the specific day we need styled
   * @return { boolean } Whether the date is between the selected dates
   */
  public isInMultiRange(date: string): boolean {
    if (this.value.length !== 2) {
      return false;
    }

    return dayjs(date).isBetween(this.value[0], this.value[1]);
  }

  /**
   * Selects the date we need, changes the form value, and closes the date picker
   * @param { UsiDate } date | The date object for the specific day we have chosen
   * @return
   */
  public selectDate(date: UsiDate): void {
    if (this.isDateDisabled(date.day, date.month, date.year)) {
      return;
    }

    switch (this.usiSelectionMode) {
      case 'single':
        this.value = this.getFormattedDate(date);
        this.onChange(dayjs(this.value).format(this.usiDateOutputFormat));
        this.showOptions = false;

        if (this.dateInput) {
          this.dateInput.nativeElement.value = this.value;
        }

        break;

      case 'multiple':
        if (typeof this.value !== 'string') {
          // if the date is already selected, remove it
          this.value.indexOf(this.getFormattedDate(date)) === -1
            ? this.value.push(this.getFormattedDate(date))
            : this.value.splice(this.value.indexOf(this.getFormattedDate(date)), 1);

          const outputDates: string[] = [];
          this.value.forEach((date: string) => {
            outputDates.push(dayjs(date).format(this.usiDateOutputFormat));
          })

          this.onChange(outputDates);

          if (this.dateInput) {
            this.dateInput.nativeElement.value = this.value;
          }
        }

        break;

      case 'range':
        if (this.value.length === 2) {
          this.value = [];
        }

        if (typeof this.value !== 'string') {
          this.value.push(this.getFormattedDate(date));

          const outputDatesRange: string[] = [];
          this.value.forEach((date: string) => {
            outputDatesRange.push(dayjs(date).format(this.usiDateOutputFormat));
          });

          this.onChange(outputDatesRange);

          if (this.value.length === 2) {
            this.showOptions = false;
          }

          if (this.dateInput) {
            this.dateInput.nativeElement.value = this.value.join(' - ').toString();
          }
        }

        break;
    }
  }

  /**
   * We need to be able to keep track of what month is
   * selected while there is no date value
   * @param { number } month | The numeric month that was selected
   * @return
   */
  public selectMonth(month: number): void {
    this.selectedMonth = month;
  }

  /**
   * We need to be able to keep track of what year is
   * selected while there is no date value
   * @param { number } year | The numeric year that was selected
   * @return
   */
  public selectYear(year: number): void {
    this.selectedYear = year;
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { string } value | the chosen calendar date
   * @return
   */
  public writeValue(value: string): void {}

  /**
   * We need to register an onChange function since we need to overwrite the Angular onChange function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * As with the registerOnChange function we also need to register an onTouched function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @param { any } _ | Unused
   * @return
   */
  public onChange(_: any): void {}

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @return
   */
  public onTouched: () => void = () => {};

  /**
   * Daylight savings can mess with what day the 1st will fall on, so
   * we account for and adjust it here.
   * @param { number } month | The month to get the day count for
   * @param { number } year | The year to get the day count for
   * @private { number } Return the number of days in the month
   */
  private getDaysCountInMonth(month: number, year: number): number {
    const daylightSavingAdjust = this.daylightSavingAdjust(new Date(year, month, 32));

    if (daylightSavingAdjust) {
      return 32 - daylightSavingAdjust.getDate();
    }

    return 0;
  }

  /**
   * We need to get the previous month's day count to know what day the
   * 1st will start.
   * @param { number } month | The month to get the days count for
   * @param { number } year | The year to get the days count for
   * @private { number } The number of days in the month
   */
  private getDaysCountInPrevMonth(month: number, year: number): number {
    let prev = this.getPreviousMonthAndYear(month, year);
    return this.getDaysCountInMonth(prev.month, prev.year);
  }

  /**
   * When arrowing through the calendar we need to be able to switch
   * between previous months and years.
   * @param { number } month | The index of the previous month (0-11)
   * @param { number } year | The year of the previous year
   * @protected { month: number; year: number } Returns the correct month index and year
   */
  protected getPreviousMonthAndYear(month: number, year: number): { month: number; year: number } {
    let m, y;

    if (month === 0) {
      m = 11;
      y = year - 1;
    } else {
      m = month - 1;
      y = year;
    }

    return { month: m, year: y };
  }

  /**
   * When arrowing through the calendar we need to be able to switch
   * between future months and years.
   * @param { number } month | The index of the next month (0-11)
   * @param { number } year | The year of the next year
   * @protected { month: number; year: number } Returns the correct month index and year
   */
  protected getNextMonthAndYear(month: number, year: number): { month: number; year: number } {
    let m, y;

    if (month === 11) {
      m = 0;
      y = year + 1;
    } else {
      m = month + 1;
      y = year;
    }

    return { month: m, year: y };
  }

  /**
   * For locales that use daylight savings we need to be able to account
   * for the time difference. We can adjust the hours of the day to
   * achieve this effect.
   * @param { Date } date | The date to adjust
   * @protected { Date | null } Returns the date adjusted for daylight savings
   */
  protected daylightSavingAdjust(date: Date): Date | null {
    if (!date) {
      return null;
    }

    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
    return date;
  }

  /**
   * Checks if the date provided is today's date
   * @param { Date} today | The date this is going to be checked
   * @param { number } day | The day of the date to be checked
   * @param { number } month | The month of the date to be checked
   * @param { number } year | The year of the date to be checked
   * @protected { boolean } Returns if the date is today's date
   */
  protected isToday(today: Date, day: number, month: number, year: number): boolean {
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  }

  /**
   * Gets the first day of the week depending on the current DayJS locale.
   * @protected { number } Returns the index of the first day of the week
   */
  public getFirstDateOfWeek(): number {
    let customFirstDay;
    if (typeof this.usiFirstDayOfWeek === 'string') {
      customFirstDay = this.daysOfWeek.findIndex((day: string) => day.includes(this.usiFirstDayOfWeek as string));
    } else {
      customFirstDay = this.usiFirstDayOfWeek;
    }

    return customFirstDay ?? dayjs().localeData().firstDayOfWeek();
  }

  /**
   * Figures out the day of the week index (0-6) for the first day of the month.
   * It can change depending on the current locale.
   * @protected { number } Returns the index of Sunday
   */
  protected getSundayIndex(): number {
    let firstDayOfWeek = this.getFirstDateOfWeek();
    return firstDayOfWeek > 0 ? 7 - firstDayOfWeek : 0;
  }

  /**
   * Since we have to load an extra configuration for localization, it would be too much of a burden to
   * load every possible configuration we may use. This way, we can dynamically load the configuration
   * if it is necessary and only load one at a time.
   * @private
   */
  private async dynamicLocalizationImport(): Promise<void> {
    await import(`dayjs/locale/${this.usiLocalization}`).then(() => {
      dayjs.locale(this.usiLocalization);
      this.monthName = dayjs.monthsShort();
    });
  }

  /**
   * Figures out the first day of the month based on the current locale.
   * @param { number } month | The month to get the days for
   * @param { number } year | The year to get the days for
   * @private { number } Returns the index of the first day of the month
   */
  private getFirstDayOfMonthIndex(month: number, year: number): number {
    let day = new Date();
    day.setDate(1);
    day.setMonth(month);
    day.setFullYear(year);

    let dayIndex = day.getDay() + this.getSundayIndex();
    return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
  }
}
