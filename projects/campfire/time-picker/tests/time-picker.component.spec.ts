import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { UsiTimePickerComponent } from '../time-picker.component';
import { UsiSharedModule } from 'usi-campfire/shared';

@Component({
  template: `
    <form [formGroup]="form">
      <usi-time-selector usiLabel="Label" formControlName="time"></usi-time-selector>
    </form>
  `,
})
class TestComponent extends UsiTimePickerComponent {
  form = new FormGroup({
    time: new FormControl('04:00'),
  });

  patchTime(): void {
    this.form.patchValue({
      time: { hours: 21, minutes: 32 },
    });
  }
}

describe('UsiTimePickerComponent', () => {
  let component: UsiTimePickerComponent;
  let fixture: ComponentFixture<UsiTimePickerComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [UsiTimePickerComponent],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiTimePickerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a time picker', () => {
    expect(component).toBeTruthy();
    expect(By.css('.usi-time')).toBeTruthy();
  });

  it('should have a start time', () => {
    component.usiShowDropdown = true;
    component.usiStart = '15:32';
    component.usiInterval = 32;
    component.ngOnInit();
    fixture.detectChanges();

    const timeInput = debugElement.query(By.css('.usi-input-group__input'));
    timeInput.nativeElement.click();
    fixture.detectChanges();

    const timeOption = debugElement.queryAll(By.css('.usi-select__option'));
    expect(timeOption[0].nativeElement.textContent.trim()).toContain('3:32 PM');
  });

  it('should have an end time and be an interval', () => {
    component.usiShowDropdown = true;
    component.usiStart = '07:00';
    component.usiEnd = '08:01';
    component.usiInterval = 30;
    component.ngOnInit();
    fixture.detectChanges();

    const timeInput = debugElement.query(By.css('.usi-input-group__input'));
    timeInput.nativeElement.click();
    fixture.detectChanges();

    const timeOption = debugElement.queryAll(By.css('.usi-select__option'));
    expect(timeOption[0].nativeElement.textContent.trim()).toContain('7:00 AM');
    expect(timeOption[1].nativeElement.textContent.trim()).toContain('7:30 AM');
    expect(timeOption[2].nativeElement.textContent.trim()).toContain('8:00 AM');
  });

  it('be in 24 hour time format', () => {
    component.usiTwentyFourHour = true;
    component.usiShowDropdown = true;
    component.usiStart = '13:00';
    component.usiEnd = '18:01';
    component.usiInterval = 60;
    component.ngOnInit();
    fixture.detectChanges();

    const timeInput = debugElement.query(By.css('.usi-input-group__input'));
    timeInput.nativeElement.click();
    fixture.detectChanges();

    const timeOption = debugElement.queryAll(By.css('.usi-select__option'));
    expect(timeOption[0].nativeElement.textContent.trim()).toContain('13:00');
    expect(timeOption[1].nativeElement.textContent.trim()).toContain('14:00');
    expect(document.querySelector('.usi-time__meridiem')).toBeFalsy();
  });

  it('should not allow manual entry', () => {
    component.usiManualEntry = false;
    component.ngOnInit();
    fixture.detectChanges();

    const timeInput = debugElement.query(By.css('.usi-time-group__input--minutes'));
    expect(timeInput.nativeElement.getAttribute('readonly')).toBe('');
  });
});

describe('Time Picker in a Form', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, UsiSharedModule],
      declarations: [UsiTimePickerComponent, TestComponent],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create a timepicker', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-time')).toBeTruthy();
  });

  it('should have a default form value and then patch to a new value', () => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-time-group__input')[0].value).toBe('04');
    expect(debugElement.nativeElement.querySelector('.usi-time-group__input--minutes').value).toBe('00');
    expect(debugElement.nativeElement.querySelector('.usi-time__meridiem').value).toBe('AM');

    component.patchTime();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-time-group__input')[0].value).toBe('09');
    expect(debugElement.nativeElement.querySelector('.usi-time-group__input--minutes').value).toBe('32');
    expect(debugElement.nativeElement.querySelector('.usi-time__meridiem').value).toBe('PM');
  });
});
