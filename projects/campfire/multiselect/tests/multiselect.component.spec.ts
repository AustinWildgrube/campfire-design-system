import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { UsiMultiselectComponent } from '../multiselect.component';
import { UsiMultiselectModule } from '../multiselect.module';
import { UsiSharedModule } from 'usi-campfire/shared';

@Component({
  template: `
    <div style="width: 250px">
      <usi-multiselect
        [usiLabel]="usiLabel"
        [usiPlaceholder]="usiPlaceholder"
        [usiData]="usiData"
        [usiNoResultMessage]="usiNoResultMessage"
        [usiSearchable]="usiSearchable"
      ></usi-multiselect>
    </div>
  `,
})
class TestComponent extends UsiMultiselectComponent {}

describe('MultiselectComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsiSharedModule, UsiMultiselectModule],
      declarations: [UsiMultiselectComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

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
  });

  it('should create a multiselect', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-select')).toBeTruthy();
  });

  it('should should have checkboxes in the dropdown', () => {
    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-select__options')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-checkbox')).toBeTruthy();
  });

  it('should allow multiple options to be selected', () => {
    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const options = debugElement.queryAll(By.css('.usi-select__option'));
    options[0].nativeElement.click();
    options[1].nativeElement.click();
    fixture.detectChanges();

    const badges = debugElement.nativeElement.querySelectorAll('.badge');
    expect(badges.length).toBe(2);
  });

  it('should have a checked checkbox when selected', () => {
    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const options = debugElement.queryAll(By.css('.usi-select__option'));
    options[0].nativeElement.click();
    fixture.detectChanges();

    const checkbox = debugElement.nativeElement.querySelector('.usi-checkbox__input');
    expect(checkbox.classList).toContain('usi-checkbox__input--checked');
  });

  // it('should show the overflow badge', () => {
  //   const select = debugElement.query(By.css('.usi-input-group__input'));
  //   select.nativeElement.click();
  //   fixture.detectChanges();
  //
  //   const options = debugElement.queryAll(By.css('.usi-select__option'));
  //   options[0].nativeElement.click();
  //   options[1].nativeElement.click();
  //   options[2].nativeElement.click();
  //   fixture.detectChanges();
  //
  //   const overflowBadge = debugElement.nativeElement.querySelector('.badge--overflow');
  //   expect(overflowBadge).toBeTruthy();
  // });

  // it('should remove an option when the icon is clicked', () => {
  //   const select = debugElement.query(By.css('.usi-input-group__input'));
  //   select.nativeElement.click();
  //   fixture.detectChanges();
  //
  //   const options = debugElement.queryAll(By.css('.usi-select__option'));
  //   options[0].nativeElement.click();
  //   fixture.detectChanges();
  //
  //   const badges = debugElement.nativeElement.querySelectorAll('.badge');
  //   expect(badges.length).toBe(1);
  //
  //   badges[0].querySelector('.badge fa-icon').click();
  //   fixture.detectChanges();
  //
  //   expect(debugElement.nativeElement.querySelectorAll('.badge').length).toBe(0);
  // });

  // it('should show the overflow modal on hover', () => {
  //   const select = debugElement.query(By.css('.usi-input-group__input'));
  //   select.nativeElement.click();
  //   fixture.detectChanges();
  //
  //   const options = debugElement.queryAll(By.css('.usi-select__option'));
  //   options[0].nativeElement.click();
  //   options[1].nativeElement.click();
  //   options[2].nativeElement.click();
  //   fixture.detectChanges();
  //
  //   const overflowBadge = debugElement.nativeElement.querySelector('.badge--overflow');
  //   overflowBadge.dispatchEvent(new Event('mouseenter'));
  //   fixture.detectChanges();
  //
  //   expect(debugElement.nativeElement.querySelector('.badges__modal')).toBeTruthy();
  // });
});
