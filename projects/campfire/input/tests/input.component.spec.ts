import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiInputComponent } from '../input.component';

import { UsiSharedModule } from 'usi-campfire/shared';

describe('UsiInputComponent', () => {
  let component: UsiInputComponent;
  let fixture: ComponentFixture<UsiInputComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsiSharedModule],
      declarations: [UsiInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiInputComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create an input', () => {
    expect(component).toBeTruthy();

    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-input-group')).toBeTruthy();
  });

  it('input should have value', () => {
    component.usiValue = 'test';
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.value).toBe('test');
  });

  it('should disable input', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.disabled).toBeTruthy();
  });

  it('should add usiRequired state', () => {
    component.usiRequired = true;
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.required).toBeTruthy();
  });

  it('should add the correct type', () => {
    const input = debugElement.query(By.css('.usi-input-group__input'));

    component.usiType = 'text';
    fixture.detectChanges();

    expect(input.nativeElement.type).toBe('text');

    component.usiType = 'email';
    fixture.detectChanges();

    expect(input.nativeElement.type).toBe('email');

    component.usiType = 'password';
    fixture.detectChanges();

    expect(input.nativeElement.type).toBe('password');

    component.usiType = 'number';
    fixture.detectChanges();

    expect(input.nativeElement.type).toBe('number');
  });

  it('should add the correct placeholder', () => {
    component.usiPlaceholder = 'test';
    fixture.detectChanges();

    expect(debugElement.query(By.css('.usi-input-group__input')).nativeElement.placeholder).toBe('test');
  });

  it('should show password when icon is clicked', () => {
    component.usiType = 'password';
    component.usiPassword = true;
    fixture.detectChanges();

    expect(component.usiType).toBe('password');

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.classList).toContain('usi-input-group__input--suffix');

    const suffix = debugElement.query(By.css('.usi-input-group__suffix'));
    expect(suffix).toBeDefined();
    expect(suffix).not.toBeNull();
    expect(suffix.nativeElement.classList).toContain('usi-input-group__suffix--password');

    suffix.nativeElement.click();
    fixture.detectChanges();

    expect(component.usiType).toBe('text');
  });

  it('should have a prefix and suffix icon', () => {
    component.usiPrefix = 'alien';
    component.usiSuffix = 'alien';
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    const inputLabel = debugElement.query(By.css('.usi-input-group__label'));

    const prefix = debugElement.query(By.css('.usi-input-group__prefix'));
    expect(prefix).toBeDefined();
    expect(prefix).not.toBeNull();
    expect(input.nativeElement.classList).toContain('usi-input-group__input--prefix');
    expect(inputLabel.nativeElement.classList).toContain('usi-input-group__label--prefix');

    const suffix = debugElement.query(By.css('.usi-input-group__suffix'));
    expect(suffix).toBeDefined();
    expect(suffix).not.toBeNull();
    expect(input.nativeElement.classList).toContain('usi-input-group__input--suffix');
  });

  it('should display a hint', () => {
    component.usiHint = 'test';
    fixture.detectChanges();

    const hint = debugElement.query(By.css('.usi-input-group__hint'));
    expect(hint).toBeDefined();
    expect(hint).not.toBeNull();
    expect(hint.nativeElement.innerText).toBe('test');
  });

  it('should have a label', () => {
    component.usiLabel = 'test';
    fixture.detectChanges();

    const label = debugElement.query(By.css('.usi-input-group__label'));
    expect(label).toBeDefined();
    expect(label).not.toBeNull();
  });
});
