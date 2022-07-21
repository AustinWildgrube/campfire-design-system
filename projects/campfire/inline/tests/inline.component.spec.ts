import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiInlineComponent } from '../inline.component';

import { UsiSharedModule } from 'usi-campfire/shared';

describe('UsiInlineComponent', () => {
  let component: UsiInlineComponent;
  let fixture: ComponentFixture<UsiInlineComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiInlineComponent],
      imports: [UsiSharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiInlineComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create an inline notification', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-inline')).toBeTruthy();
  });

  it('should have a title', () => {
    expect(debugElement.nativeElement.querySelector('.usi-inline__title')).toBeTruthy();
  });

  it('should have a message', () => {
    expect(debugElement.nativeElement.querySelector('.usi-inline__message')).toBeTruthy();
  });

  it('should have an icon', () => {
    component.usiIcon = 'coffee';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-inline__icon')).toBeTruthy();
  });

  it('should have a type', () => {
    component.usiType = 'success';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-inline--success')).toBeTruthy();
  });
});
