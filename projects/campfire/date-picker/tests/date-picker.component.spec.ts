import { DebugElement } from '@angular/core';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiDatePickerComponent } from '../date-picker.component';
import { UsiSharedModule } from 'usi-campfire/shared';

describe('UsiDatePickerComponent', () => {
  let component: UsiDatePickerComponent;
  let fixture: ComponentFixture<UsiDatePickerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, UsiSharedModule],
      declarations: [UsiDatePickerComponent],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiDatePickerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    spyOn(console, 'warn');

    debugElement.nativeElement.querySelector('.usi-input-group__input').click();
    fixture.detectChanges();
  });

  afterEach(() => {
    debugElement.nativeElement.querySelector('.usi-date-picker').remove();
    fixture.destroy();
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

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--disabled').length).toBeGreaterThan(4);
  });

  it('should disable certain dates', () => {
    component.usiDisabledDates = [new Date()];
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--disabled').length).toBe(1);
  });

  it('should have a minimum and maximum date', () => {
    component.usiMinDate = new Date(new Date().setDate(new Date().getDate() - 1));
    component.usiMaxDate = new Date(new Date().setDate(new Date().getDate() + 1));
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

  it('should show 3 month panels', async () => {
    component.usiNumberOfMonths = 3;
    await component.ngOnInit();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__wrapper').length).toBe(3);
  });

  it('should start the week on wednesday', async () => {
    component.usiFirstDayOfWeek = 3;
    await component.ngOnInit();
    fixture.detectChanges();

    debugElement.nativeElement.querySelector('.usi-input-group__input').click();
    fixture.detectChanges();

    debugElement.nativeElement.querySelector('.usi-input-group__input').click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('th')[0].textContent).toBe('We');
  });

  it('should be multiple selection', () => {
    component.usiSelectionMode = 'multiple';
    fixture.detectChanges();

    debugElement.nativeElement.querySelectorAll('td')[0].click();
    debugElement.nativeElement.querySelectorAll('td')[1].click();
    debugElement.nativeElement.querySelectorAll('td')[2].click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--selected').length).toBe(3);
  });

  it('should be range selection', () => {
    component.usiSelectionMode = 'range';
    fixture.detectChanges();

    debugElement.nativeElement.querySelectorAll('td')[0].click();
    fixture.detectChanges();

    debugElement.nativeElement.querySelectorAll('td')[5].click();
    fixture.detectChanges();

    debugElement.nativeElement.querySelector('.usi-input-group__input').click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-date-picker__day--selected').length).toBe(2);
  });

  it('should fail to load the localization and default to english', async () => {
    const shortEnglishMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    component.usiLocalization = 'test';
    await component.ngOnInit();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-date-picker__selected-month-year').textContent).toContain(shortEnglishMonths[currentMonth]);
    expect(component.monthName).toEqual(shortEnglishMonths);
    expect(console.warn).toHaveBeenCalledWith('Campfire Date Picker: No test localization was not found; defaulting to English.');
  });

  it('should load a different localization', async () => {
    const shortGermanMonths = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'];

    component.usiLocalization = 'de';
    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.monthName).toEqual(shortGermanMonths);
  });
});
