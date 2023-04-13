import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroupDirective } from '@angular/forms';

import { UsiSelectComponent } from '../select.component';
import { UsiOptionComponent } from '../option/option.component';
import { UsiGroupComponent } from '../group/group.component';
import { UsiSharedModule } from 'usi-campfire/shared';

@Component({
  template: `
    <usi-select [usiLabel]="usiLabel" [usiPlaceholder]="usiPlaceholder" [usiNoResultMessage]="usiNoResultMessage" [usiSearchable]="usiSearchable">
      <usi-optgroup usiLabel="Group 1">
        <usi-option [usiValue]="1">Option 1</usi-option>
        <usi-option [usiValue]="2">Option 2</usi-option>
        <usi-option [usiValue]="3" usiDisabled>Option 3</usi-option>
      </usi-optgroup>

      <usi-optgroup usiLabel="Group 2">
        <usi-option [usiValue]="4">Option 4</usi-option>
        <usi-option [usiValue]="5">Option 5</usi-option>
        <usi-option [usiValue]="6" usiDisabled>Option 6</usi-option>
      </usi-optgroup>
    </usi-select>
  `,
})
class TestComponent extends UsiSelectComponent {}

describe('UsiSelectOptionComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiSelectComponent, UsiOptionComponent, UsiGroupComponent, TestComponent],
      imports: [UsiSharedModule],
      providers: [FormGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a select group', () => {
    expect(component).toBeTruthy();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-select__group-label')).toBeTruthy();
  });

  it('should create a select group with options', () => {
    expect(component).toBeTruthy();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-select__group-label')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-select__option')).toBeTruthy();
  });

  it('should have a label', () => {
    expect(component).toBeTruthy();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-select__group-label').textContent).toBe('Group 1');
  });
});
