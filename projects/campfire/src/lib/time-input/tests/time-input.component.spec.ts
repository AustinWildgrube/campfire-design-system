import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiTimeInputComponent } from '../time-input.component';

describe('UsiTimeInput', () => {
  let component: UsiTimeInputComponent;
  let fixture: ComponentFixture<UsiTimeInputComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTimeInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiTimeInputComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a time input', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group__input--filled')).toBeTruthy();
  });

  it('should set the time to the given value', () => {
    component.usiValue = '13:00';
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.value).toBe('13:00');
  });

  it('should disable input', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.disabled).toBeTruthy();
  });

  it('should add required state', () => {
    component.usiRequired = true;
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__label'));
    expect(input.children[0].nativeElement.innerHTML).toBe('*');
  });

  it('should have a label', () => {
    component.usiLabel = 'test';
    fixture.detectChanges();

    const label = debugElement.query(By.css('.usi-input-group__label'));
    expect(label).toBeDefined();
    expect(label).not.toBeNull();
  });

  it('should display a hint', () => {
    component.usiHint = 'test';
    fixture.detectChanges();

    const hint = debugElement.query(By.css('.usi-input-group__hint'));
    expect(hint).toBeDefined();
    expect(hint).not.toBeNull();
    expect(hint.nativeElement.innerText).toBe('test');
  });
});
