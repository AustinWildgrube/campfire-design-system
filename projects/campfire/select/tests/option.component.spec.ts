import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiSelectComponent } from '../select.component';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiOptionComponent } from 'usi-campfire/select/option/option.component';

@Component({
  template: `
    <usi-select [usiLabel]="usiLabel" [usiPlaceholder]="usiPlaceholder" [usiNoResultMessage]="usiNoResultMessage" [usiSearchable]="usiSearchable">
      <usi-option usiValue="1">Option 1</usi-option>
      <usi-option usiValue="2">Option 2</usi-option>
      <usi-option usiValue="3" usiDisabled>Option 3</usi-option>
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
      declarations: [UsiSelectComponent, UsiOptionComponent, TestComponent],
      imports: [UsiSharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a select option', () => {
    expect(component).toBeTruthy();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-select__option')).toBeTruthy();
  });

  it('should select an option', () => {
    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const option = debugElement.queryAll(By.css('.usi-select__option'));
    option[0].nativeElement.click();
    fixture.detectChanges();

    select.nativeElement.click();
    fixture.detectChanges();

    const newOptions = debugElement.queryAll(By.css('.usi-select__option'));
    expect(newOptions[0].nativeElement.classList).toContain('usi-select__option--active');
  });

  it('should have a disabled option', () => {
    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const option = debugElement.queryAll(By.css('.usi-select__option'));
    expect(option[2].nativeElement.classList).toContain('usi-select__option--disabled');
  });
});
