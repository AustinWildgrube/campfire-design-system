import { Component, DebugElement, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroupDirective } from '@angular/forms';

import { UsiSelectComponent } from '../select.component';
import { UsiOptionComponent } from '../option/option.component';

@Component({
  template: `
    <usi-select [usiNoResultMessage]="usiNoResultMessage" [usiSearchable]="usiSearchable" (usiSelectionChange)="onSelectionChange($event)">
      <usi-option [usiValue]="1">Option 1</usi-option>
      <usi-option [usiValue]="2">Option 2</usi-option>
      <usi-option [usiValue]="3" usiDisabled>Option 3</usi-option>
    </usi-select>
  `,
})
class TestComponent extends UsiSelectComponent {
  @Output() selectionChange = new EventEmitter<any>();

  onSelectionChange(event: any) {
    this.selectionChange.emit(event);
  }
}

describe('UsiSelectComponent', () => {
  let component: UsiSelectComponent<any>;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<UsiSelectComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiSelectComponent, UsiOptionComponent, TestComponent],
      providers: [FormGroupDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiSelectComponent);
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
    component.usiSearchable = true;
    fixture.detectChanges();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    component.searchOptions('test');
    fixture.detectChanges();

    const options = debugElement.query(By.css('.usi-select__no-result'));
    expect(options).toBeTruthy();
  });

  it('should have a custom no result message', fakeAsync(() => {
    component.usiSearchable = true;
    component.usiNoResultMessage = 'Test Message';
    fixture.detectChanges();

    component.searchOptions('test');
    fixture.detectChanges();

    const select = debugElement.query(By.css('.usi-input-group__input'));
    select.nativeElement.click();
    fixture.detectChanges();

    const message = debugElement.query(By.css('.usi-select__no-result'));
    expect(message.nativeElement.textContent).toBe('Test Message');
  }));

  it('should output an event when an option is selected', fakeAsync(() => {
    let testFixture = TestBed.createComponent(TestComponent);
    let testComponent = testFixture.componentInstance;
    let testDebugElement = testFixture.debugElement;

    const spy = spyOn(testComponent.selectionChange, 'emit');

    const selectTrigger = testDebugElement.query(By.css('.usi-input-group__input'));
    selectTrigger.nativeElement.click();
    testFixture.detectChanges();

    const option = testDebugElement.query(By.css('.usi-select__option'));
    option.nativeElement.click();
    testFixture.detectChanges();
    tick();

    expect(spy).toHaveBeenCalled();
  }));
});
