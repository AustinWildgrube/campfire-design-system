import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { UsiMultiselectComponent } from '../multiselect.component';
import { UsiMultiselectModule } from '../multiselect.module';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiOptionComponent } from 'usi-campfire/select';
import { FormGroupDirective } from '@angular/forms';

@Component({
  template: `
    <div style="width: 250px">
      <usi-multiselect [usiLabel]="usiLabel" [usiPlaceholder]="usiPlaceholder" [usiNoResultMessage]="usiNoResultMessage" [usiSearchable]="usiSearchable">
        <usi-option [usiValue]="1">Option 1</usi-option>
        <usi-option [usiValue]="2">Option 2</usi-option>
        <usi-option [usiValue]="3" usiDisabled>Option 3</usi-option>
      </usi-multiselect>
    </div>
  `,
})
class TestComponent extends UsiMultiselectComponent {}

describe('MultiselectComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let select: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiMultiselectComponent, UsiOptionComponent, TestComponent],
      imports: [UsiSharedModule, UsiMultiselectModule],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    fixture.detectChanges();
  });

  it('should create a multiselect', () => {
    expect(component).toBeTruthy();
    expect(debugElement.query(By.css('.usi-select'))).toBeTruthy();
  });

  it('should should have checkboxes in the dropdown', () => {
    expect(debugElement.nativeElement.querySelector('.usi-select__options')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-checkbox')).toBeTruthy();
  });

  it('should allow multiple options to be selected', () => {
    // option 1 is the controls
    const options = debugElement.queryAll(By.css('.usi-select__option'));
    options[1].nativeElement.click();
    options[2].nativeElement.click();
    fixture.detectChanges();

    expect(select.nativeElement.value).toBe('2 Selected');
  });

  it('should only show selected options when the option is checked', () => {
    // option 1 is the controls
    const options = debugElement.queryAll(By.css('.usi-select__option'));
    options[1].nativeElement.click();
    fixture.detectChanges();

    const showSelected = debugElement.query(By.css('.usi-checkbox__input'));
    showSelected.nativeElement.click();
    fixture.detectChanges();

    const optionsCount = debugElement.queryAll(By.css('.usi-select__option')).length;
    expect(optionsCount).toBe(2);
  });

  it('should clear the selected options when the clear button is clicked', () => {
    // option 1 is the controls
    const options = debugElement.queryAll(By.css('.usi-select__option'));
    options[1].nativeElement.click();
    options[2].nativeElement.click();
    fixture.detectChanges();

    expect(select.nativeElement.value).toBe('2 Selected');

    const clear = debugElement.query(By.css('.usi-select__clear-all'));
    clear.nativeElement.click();
    fixture.detectChanges();

    expect(select.nativeElement.value).toBe('');
  });
});
