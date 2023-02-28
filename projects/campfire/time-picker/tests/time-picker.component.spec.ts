import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { UsiTimePickerComponent } from '../time-picker.component';

describe('UsiTimePickerComponent', () => {
  let component: UsiTimePickerComponent;
  let fixture: ComponentFixture<UsiTimePickerComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show hour input', () => {
    const hourInput = fixture.debugElement.query(By.css('input[type=number][min=0]')).nativeElement;
    expect(hourInput).toBeTruthy();
  });

  it('should show minute input', () => {
    const minuteInput = fixture.debugElement.query(By.css('input[type=number][min=0][max=60]')).nativeElement;
    expect(minuteInput).toBeTruthy();
  });

  it('should show meridiem input if usiTwentyFourHour is false', () => {
    component.usiTwentyFourHour = false;
    fixture.detectChanges();

    const meridiemInput = fixture.debugElement.query(By.css('input.usi-time__meridiem')).nativeElement;
    expect(meridiemInput).toBeTruthy();
  });

  it('should not show meridiem input if usiTwentyFourHour is true', () => {
    component.usiTwentyFourHour = true;
    fixture.detectChanges();

    const meridiemInput = fixture.debugElement.query(By.css('input.usi-time__meridiem'));
    expect(meridiemInput).toBeFalsy();
  });

  it('should format time on blur', () => {
    const hourInput = fixture.debugElement.query(By.css('input[type=number][min=0]')).nativeElement;
    hourInput.value = '2';
    hourInput.dispatchEvent(new Event('input'));
    hourInput.dispatchEvent(new Event('blur'));

    const minuteInput = fixture.debugElement.query(By.css('input[type=number][min=0][max=60]')).nativeElement;
    minuteInput.value = '3';
    minuteInput.dispatchEvent(new Event('input'));
    minuteInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const formattedTime = fixture.debugElement.query(By.css('.usi-input-group__input--filled')).nativeElement.textContent.trim();
    expect(formattedTime).toEqual('02:03');
  });
});

// import { DebugElement } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
//
// import { UsiTimePickerComponent } from '../time-picker.component';
//
// describe('UsiTimePicker', () => {
//   let component: UsiTimePickerComponent;
//   let fixture: ComponentFixture<UsiTimePickerComponent>;
//   let debugElement: DebugElement;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [UsiTimePickerComponent],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(UsiTimePickerComponent);
//     component = fixture.componentInstance;
//     debugElement = fixture.debugElement;
//     fixture.detectChanges();
//   });
//
//   it('should create a time picker', () => {
//     expect(component).toBeTruthy();
//     expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
//     expect(debugElement.nativeElement.querySelector('.usi-input-group__input--filled')).toBeTruthy();
//   });
//
//   it('should set the time to the given value', () => {
//     component.usiValue = '13:00';
//     fixture.detectChanges();
//
//     const input = debugElement.query(By.css('.usi-input-group__input'));
//     expect(input.nativeElement.value).toBe('13:00');
//   });
//
//   it('should disable input', () => {
//     component.usiDisabled = true;
//     fixture.detectChanges();
//
//     const input = debugElement.query(By.css('.usi-input-group__input'));
//     expect(input.nativeElement.disabled).toBeTruthy();
//   });
//
//   it('should add required state', () => {
//     component.usiRequired = true;
//     fixture.detectChanges();
//
//     const input = debugElement.query(By.css('.usi-input-group__label'));
//     expect(input.children[0].nativeElement.innerHTML).toBe('*');
//   });
//
//   it('should have a label', () => {
//     component.usiLabel = 'test';
//     fixture.detectChanges();
//
//     const label = debugElement.query(By.css('.usi-input-group__label'));
//     expect(label).toBeDefined();
//     expect(label).not.toBeNull();
//   });
//
//   it('should display a hint', () => {
//     component.usiHint = 'test';
//     fixture.detectChanges();
//
//     const hint = debugElement.query(By.css('.usi-input-group__hint'));
//     expect(hint).toBeDefined();
//     expect(hint).not.toBeNull();
//     expect(hint.nativeElement.innerText).toBe('test');
//   });
// });
