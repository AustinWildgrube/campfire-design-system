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

    component.usiTitle = 'Title';
    component.usiMessage = 'Message';
    fixture.detectChanges();
  });

  it('should create an inline notification', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-inline')).toBeTruthy();
  });

  it('should have a title and message', () => {
    expect(debugElement.nativeElement.querySelector('.usi-inline__title')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-inline__title').textContent).toContain('Title');

    expect(debugElement.nativeElement.querySelector('.usi-inline__message')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-inline__message').textContent).toContain('Message');
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

  it('should throw an error if no title is provided', () => {
    expect(() => {
    component.usiTitle = '';
    component.ngOnInit();
    fixture.detectChanges();
    }).toThrowError('UsiInline: A title and message are required.');
  });

  it('should throw an error if no message is provided', () => {
    expect(() => {
      component.usiMessage = '';
      component.ngOnInit();
      fixture.detectChanges();
    }).toThrowError('UsiInline: A title and message are required.');
  });
});
