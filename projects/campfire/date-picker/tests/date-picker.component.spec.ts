import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiDatePickerComponent } from '../date-picker.component';
import { UsiDatePickerModule } from 'usi-campfire/date-picker';
import { UsiSharedModule } from 'usi-campfire/shared';

@Component({
  template: `
    <usi-date-picker
      [usiLocalization]="usiLocalization"
      [usiError]="usiError"
      [usiLabel]="usiLabel"
      [usiPlaceholder]="usiPlaceholder"
      [usiHint]="usiHint"
      [usiDisabledDays]="usiDisabledDays"
      [usiDisabledDates]="usiDisabledDates"
      [usiMinDate]="usiMinDate"
      [usiMaxDate]="usiMaxDate"
      [usiNumberOfMonths]="usiNumberOfMonths"
      [usiFirstDayOfWeek]="usiFirstDayOfWeek"
      [usiView]="usiView"
      [usiDateFormat]="usiDateFormat"
      [usiDateOutputFormat]="usiDateOutputFormat"
      [usiSelectionMode]="usiSelectionMode"
      [usiDisabled]="usiDisabled"
      [usiRequired]="usiRequired"
      [usiForceError]="usiForceError"
    ></usi-date-picker>
  `,
})
class TestComponent extends UsiDatePickerComponent {}

describe('UsiDatePickerComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiDatePickerComponent, TestComponent],
      imports: [UsiDatePickerModule, UsiSharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(console, 'warn');

    debugElement.nativeElement.querySelector('.usi-input-group__input').click();
    fixture.detectChanges();
  });

  it('should create a datepicker', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-date-picker')).toBeTruthy();
  });

  it('should select a date', () => {
    const date = debugElement.query(By.css('.usi-date-picker__day--today'));
    date.nativeElement.click();
    fixture.detectChanges();

    expect(component.value).toBeTruthy();
  });

  it('should disable certain days', () => {
    component.usiDisabledDays = [0];
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--disabled').length).toBe(5);
  });

  it('should disable certain dates', () => {
    component.usiDisabledDates = [new Date()];
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--disabled').length).toBe(1);
  });

  it('should have a minimum and maximum date', () => {
    component.usiMinDate = new Date(new Date().setDate(new Date().getDate() - 1));
    component.usiMinDate = new Date(new Date().setDate(new Date().getDate() + 1));
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--disabled').length).toBeGreaterThan(3);
  });

  it('should output the date in a different format', () => {
    component.usiDateFormat = 'YYYY-MM-DD';
    fixture.detectChanges();

    debugElement.nativeElement.querySelector('.usi-date-picker__day--today').click();
    fixture.detectChanges();

    let today = new Date().toISOString().slice(0, 10);
    expect(debugElement.nativeElement.querySelector('.usi-input-group__input').value).toContain(today);
  });

  it('should be multiple selection', () => {
    component.usiSelectionMode = 'multiple';
    fixture.detectChanges();

    debugElement.nativeElement.querySelector('.usi-date-picker__day--today').click();
    debugElement.nativeElement.querySelectorAll('td')[0].click();
    debugElement.nativeElement.querySelectorAll('td')[1].click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--selected').length).toBe(3);
  });

  it('should be range selection', () => {
    component.usiSelectionMode = 'range';
    fixture.detectChanges();

    debugElement.nativeElement.querySelector('.usi-date-picker__day--today').click();
    fixture.detectChanges();

    debugElement.nativeElement.querySelectorAll('td')[0].click();
    fixture.detectChanges();

    debugElement.nativeElement.querySelector('.usi-input-group__input').click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--selected').length).toBe(2);
  });

  it('should load a different localization', async () => {
    const shortGermanMonths = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];

    component.usiLocalization = 'de';
    fixture.detectChanges();

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.monthName).toEqual(shortGermanMonths);
  });

  it('should fail to load the localization and default to english', async () => {
    const shortEnglishMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    component.usiLocalization = 'test';
    await component.ngOnInit();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-date-picker__selected-month-year').textContent).toContain(shortEnglishMonths[currentMonth]);
    expect(component.monthName).toEqual(shortEnglishMonths);
    expect(console.warn).toHaveBeenCalled();
  });
});
