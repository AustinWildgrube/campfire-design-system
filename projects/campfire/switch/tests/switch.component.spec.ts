import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiSwitchComponent } from '../switch.component';

describe('UsiSwitchComponent', () => {
  let component: UsiSwitchComponent;
  let fixture: ComponentFixture<UsiSwitchComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiSwitchComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiSwitchComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the switch', () => {
    expect(component).toBeTruthy();

    expect(debugElement.nativeElement.querySelector('.usi-switch')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-switch__input')).toBeTruthy();
  });

  it('should emit event when checked', () => {
    expect(debugElement.nativeElement.querySelector('.usi-switch__input input').checked).toBeFalsy();

    debugElement.nativeElement.querySelector('.usi-switch__input input').click();
    expect(debugElement.nativeElement.querySelector('.usi-switch__input input').checked).toBeTruthy();

    debugElement.nativeElement.querySelector('.usi-switch__input input').click();
    expect(debugElement.nativeElement.querySelector('.usi-switch__input input').checked).toBeFalsy();
  });

  it('should disable the switch', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    expect(component.usiDisabled).toBeTruthy();

    fixture.detectChanges();
    expect(component.value).toBe(false);

    debugElement.nativeElement.click();

    fixture.detectChanges();
    expect(component.value).toBe(false);
  });
});
