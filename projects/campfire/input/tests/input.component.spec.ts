import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsiInputComponent } from '../input.component';

import { UsiSharedModule } from 'usi-campfire/shared';

describe('UsiInputComponent', () => {
  let component: UsiInputComponent;
  let fixture: ComponentFixture<UsiInputComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, UsiSharedModule],
      declarations: [UsiInputComponent],
      providers: [FormGroupDirective],
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

  it('should change the type of the input', () => {
    expect(debugElement.nativeElement.querySelector('.usi-input-group input').type).toBe('text');

    component.usiType = 'number';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').type).toBe('number');

    component.usiType = 'password';
    component.usiPassword = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').type).toBe('password');
    expect(debugElement.nativeElement.querySelector('.usi-input-group__suffix--password')).toBeTruthy();

    component.usiType = 'email';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').type).toBe('email');
  });

  it('should have a min length and max length for text inputs', async () => {
    component.usiMin = 2;
    component.usiMax = 10;

    await fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').minLength).toBe(2);
    expect(debugElement.nativeElement.querySelector('.usi-input-group input').maxLength).toBe(10);
  });

  it('should have a min length and max length for number inputs', async () => {
    component.usiType = 'number';
    component.usiMin = 2;
    component.usiMax = 10;

    await fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').min).toBe('2');
    expect(debugElement.nativeElement.querySelector('.usi-input-group input').max).toBe('10');
  });

  it('should have a patten', () => {
    component.usiPattern = '^[0-9]{1,9}$';
    component.usiType = 'number';

    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-input-group input').pattern).toBe('^[0-9]{1,9}$');
  });
});
