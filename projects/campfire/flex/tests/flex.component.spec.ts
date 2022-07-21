import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiFlexComponent } from '../flex.component';

@Component({
  template: `
    <usi-flex
      [usiAlign]="usiAlign"
      [usiDirection]="usiDirection"
      [usiJustify]="usiJustify"
      [usiNoWrap]="usiNoWrap"
      [usiGrow]="usiGrow"
      [usiSpacing]="usiSpacing"
    >
      <p>one</p>
      <p>two</p>
      <p>three</p>
    </usi-flex>
  `,
})
class TestComponent extends UsiFlexComponent {}

describe('UsiFlexComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiFlexComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a flex container', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-flex')).toBeTruthy();
  });

  it('should set the align attribute', () => {
    component.usiAlign = 'center';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-flex--align-center')).toBeTruthy();
  });

  it('should set the direction attribute', () => {
    component.usiDirection = 'column';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-flex--direction-column')).toBeTruthy();
  });

  it('should set the justify attribute', () => {
    component.usiJustify = 'center';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-flex--justify-center')).toBeTruthy();
  });

  it('should set the no-wrap attribute', () => {
    component.usiNoWrap = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-flex--no-wrap')).toBeTruthy();
  });

  it('should set the grow attribute', () => {
    component.usiGrow = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-flex--grow')).toBeTruthy();
  });

  it('should set the spacing attribute', () => {
    component.usiSpacing = 50;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-flex').style.gap).toBe('50px');
  });
});
