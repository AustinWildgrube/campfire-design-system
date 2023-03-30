import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiChipGroupComponent } from '../../chip-group/chip-group.component';
import { UsiChipButtonComponent } from '../chip-button.component';
import { UsiChipsService } from '../../chips.service';

@Component({
  template: `
    <usi-chip-group usiMultiple>
      <usi-chip usiValue="Chip 1">Chip 1 content</usi-chip>
      <usi-chip usiValue="Chip 2">Chip 2 content</usi-chip>
      <usi-chip usiValue="Chip 3" usiDisabled>Chip 3 content</usi-chip>
    </usi-chip-group>
  `,
})
class TestComponent extends UsiChipGroupComponent {}

describe('UsiChipComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let usiChipsService: UsiChipsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiChipGroupComponent, UsiChipButtonComponent, TestComponent],
      providers: [UsiChipsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    usiChipsService = TestBed.inject(UsiChipsService);
    fixture.detectChanges();
  });

  it('should create a single chip', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-chip')).toBeTruthy();
  });

  it('should update selected property when chip is clicked', () => {
    spyOn(usiChipsService.selected, 'next').and.callThrough();

    const chipElement = debugElement.queryAll(By.css('.usi-chip'))[1];
    chipElement.triggerEventHandler('click', null);

    expect(usiChipsService.selected.next).toHaveBeenCalledWith('Chip 2');
  });

  it('should be disabled and non-selectable', () => {
    spyOn(usiChipsService.selected, 'next').and.callThrough();

    const chipElement = debugElement.queryAll(By.css('.usi-chip'))[2];
    expect(chipElement.nativeElement.classList.contains('usi-chip--disabled')).toBeTruthy();

    chipElement.triggerEventHandler('click', null);
    expect(usiChipsService.selected.next).not.toHaveBeenCalled();
  });

  it('should add multiple values to selected when isMultiple is true', () => {
    usiChipsService.isMultiple.next(true);

    usiChipsService.select('value 1');
    usiChipsService.select('value 2');

    usiChipsService.selected.subscribe((selected) => {
      expect(selected).toEqual(['value 1', 'value 2']);
    });
  });

  it('should replace the selected value when isMultiple is false', () => {
    usiChipsService.isMultiple.next(false);

    usiChipsService.select('value 1');
    usiChipsService.select('value 2');

    usiChipsService.selected.subscribe((selected) => {
      expect(selected).toEqual(['value 2']);
    });
  });

  it('should unselect a chip when unselectable is active', () => {
    const chipElement = debugElement.queryAll(By.css('.usi-chip'))[1];
    chipElement.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(chipElement.nativeElement.classList.contains('usi-chip--selected')).toBeTruthy();

    chipElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(chipElement.nativeElement.classList.contains('usi-chip--selected')).toBeFalsy();
  });

  // todo: add usiSelected test
});
