import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiChipGroupComponent } from '../chip-group.component';
import { UsiChipButtonComponent } from '../../chip-button/chip-button.component';
import { UsiChipsService } from '../../chips.service';

@Component({
  template: `
    <usi-chip-group [usiSelected]="'Chip 1'" usiMultiple>
      <usi-chip usiValue="Chip 1">Chip 1 content</usi-chip>
      <usi-chip usiValue="Chip 2">Chip 2 content</usi-chip>
      <usi-chip usiValue="Chip 3" usiDisabled>Chip 3 content</usi-chip>
    </usi-chip-group>
  `,
})
class TestComponent extends UsiChipGroupComponent {}

describe('UsiChipGroupComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let usiChipsService: UsiChipsService<any>;

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

  it('should create a chip group', () => {
    expect(component).toBeTruthy();
    expect(By.css('.usi-chip-group')).toBeTruthy();
  });

  it('should select a chip when usiSelected is set', () => {
    const chipOne = debugElement.nativeElement.querySelector('.usi-chip--selected');
    expect(chipOne.textContent).toContain('Chip 1 content');
  });

  it('should emit usiSelectedChange when a chip is clicked', () => {
    spyOn(component.usiSelectedChange, 'emit').and.callThrough();

    const chipTwo = debugElement.nativeElement.querySelectorAll('.usi-chip')[1];
    chipTwo.click();
    fixture.detectChanges();

    expect(component.usiSelectedChange.emit).toHaveBeenCalledWith(['Chip 1', 'Chip 2']);
  });

  it('should select multiple chips when usiMultiple is set', () => {
    const chipTwo = debugElement.nativeElement.querySelectorAll('.usi-chip')[1];
    chipTwo.click();
    fixture.detectChanges();

    expect(usiChipsService.selected.value).toEqual(['Chip 1', 'Chip 2']);
  });

  it('should unselect a chip when usiUnselectable is set', () => {
    usiChipsService.isUnselectable.next(true);
    fixture.detectChanges();

    const chipOne = debugElement.nativeElement.querySelector('.usi-chip--selected');
    chipOne.click();
    fixture.detectChanges();

    expect(usiChipsService.selected.value).toEqual([]);

    usiChipsService.isUnselectable.next(false);
    fixture.detectChanges();

    chipOne.click();
    fixture.detectChanges();

    expect(usiChipsService.selected.value).toEqual(['Chip 1']);

    chipOne.click();
    fixture.detectChanges();

    expect(usiChipsService.selected.value).toEqual(['Chip 1']);
  });
});
