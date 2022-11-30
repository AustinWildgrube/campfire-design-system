import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiSelectComponent } from '../select.component';
import { UsiSharedModule } from 'usi-campfire/shared';

@Component({
  template: `<usi-select
    [usiLabel]="usiLabel"
    [usiPlaceholder]="usiPlaceholder"
    [usiData]="usiData"
    [usiNoResultMessage]="usiNoResultMessage"
    [usiSearchable]="usiSearchable"
  ></usi-select>`,
})
class TestComponent extends UsiSelectComponent {}

describe('UsiSelectComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiSelectComponent, TestComponent],
      imports: [UsiSharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a select', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-select')).toBeTruthy();
  });

  it('should be searchable', () => {
    component.usiSearchable = true;
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.readOnly).toBeFalsy();
  });

  it('should show no results', () => {
    component.usiData = [];

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const options = debugElement.query(By.css('.usi-select__no-result'));
    expect(options).toBeTruthy();
  });

  it('should have a custom no result message', () => {
    component.usiData = [];

    component.usiNoResultMessage = 'Test Message';
    fixture.detectChanges();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const message = debugElement.query(By.css('.usi-select__no-result'));
    expect(message.nativeElement.innerHTML).toBe('Test Message');
  });

  it('should have a list of options', () => {
    component.usiData = [
      {
        label: 'Warsaw',
        value: 'wa',
        group: 'Europe',
      },
      {
        label: 'New York',
        value: 'ny',
        disabled: true,
      },
      {
        label: 'San Francisco',
        value: 'sf',
        group: 'America',
      },
    ];

    fixture.detectChanges();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-select__options')).toBeTruthy();
  });

  it('should have a list of options with groups', () => {
    component.usiData = [
      {
        label: 'Warsaw',
        value: 'wa',
        group: 'Europe',
      },
      {
        label: 'New York',
        value: 'ny',
        group: 'America',
      },
      {
        label: 'San Francisco',
        value: 'sf',
      },
    ];

    fixture.detectChanges();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-select__group-label')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-select__group-divider')).toBeTruthy();
  });

  it('should have a list of options with a disabled option', () => {
    component.usiData = [
      {
        label: 'Warsaw',
        value: 'wa',
        disabled: true,
      },
    ];

    fixture.detectChanges();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const disabledOption = debugElement.query(By.css('.usi-select__option--disabled'));
    expect(disabledOption).toBeTruthy();
  });

  it('should have a list of options with a selected option', () => {
    component.usiData = [
      {
        label: 'New York',
        value: 'ny',
      },
    ];

    fixture.detectChanges();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const selectedOption = debugElement.query(By.css('.usi-select__option'));
    selectedOption.nativeElement.click();
    fixture.detectChanges();

    select.nativeElement.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-select__option--active')).toBeTruthy();
  });
});
