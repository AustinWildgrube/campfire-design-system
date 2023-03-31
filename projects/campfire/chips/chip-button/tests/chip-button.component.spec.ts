import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiChipButtonComponent } from '../chip-button.component';
import { UsiChipGroupComponent } from '../../chip-group/chip-group.component';

@Component({
  template: `
    <usi-chip-group [usiSelected]="'Chip 1'" usiMultiple>
      <usi-chip usiValue="Chip 1" usiDisabled>Chip 1 content</usi-chip>
    </usi-chip-group>
  `,
})
class TestComponent extends UsiChipGroupComponent {}

describe('UsiChipComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiChipGroupComponent, UsiChipButtonComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a chip', () => {
    expect(component).toBeTruthy();
    expect(By.css('.usi-chip')).toBeTruthy();
  });

  it('should be disabled when usiDisabled is set', () => {
    expect(debugElement.nativeElement.querySelector('.usi-chip--disabled')).toBeTruthy();
  });
});
