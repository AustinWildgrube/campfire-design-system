import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiInputComponent } from '../input.component';
import { UsiSharedModule } from '../../shared/shared.module';

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
    component.value = 'test';
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.value).toBe('test');
  });

  it('should disable input', () => {
    component.disabled = true;
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.disabled).toBeTruthy();
  });

  it('should add required state', () => {
    component.required = true;
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.required).toBeTruthy();
  });

  it('should add the correct type', () => {
    const input = debugElement.query(By.css('.usi-input-group__input'));

    component.type = 'text';
    fixture.detectChanges();

    expect(input.nativeElement.type).toBe('text');

    component.type = 'email';
    fixture.detectChanges();

    expect(input.nativeElement.type).toBe('email');

    component.type = 'password';
    fixture.detectChanges();

    expect(input.nativeElement.type).toBe('password');

    component.type = 'number';
    fixture.detectChanges();

    expect(input.nativeElement.type).toBe('number');
  });

  it('should add the correct placeholder', () => {
    component.placeholder = 'test';
    fixture.detectChanges();

    expect(debugElement.query(By.css('.usi-input-group__input')).nativeElement.placeholder).toBe('test');
  });

  it('should show password when icon is clicked', () => {
    component.type = 'password';
    component.usiPassword = true;
    fixture.detectChanges();

    expect(component.type).toBe('password');

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.classList).toContain('usi-input-group__input--suffix');

    const suffix = debugElement.query(By.css('.usi-input-group__suffix'));
    expect(suffix).toBeDefined();
    expect(suffix).not.toBeNull();
    expect(suffix.nativeElement.classList).toContain('usi-input-group__suffix--password');

    suffix.nativeElement.click();
    fixture.detectChanges();

    expect(component.type).toBe('text');
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

  it('should add ghosting state to input', () => {
    component.usiGhost = true;
    fixture.detectChanges();

    const input = debugElement.query(By.css('.usi-input-group__input'));
    expect(input.nativeElement.classList).toContain('usi-input-group__input--ghost');
    expect(input.nativeElement.disabled).toBeTruthy();
  });
});
