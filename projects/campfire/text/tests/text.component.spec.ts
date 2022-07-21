import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiTextComponent } from '../text.component';

@Component({
  template: `
    <p
      [usiAlign]="usiAlign"
      [usiColor]="usiColor"
      [usiInherit]="usiInherit"
      [usiInline]="usiInline"
      [usiLineClamp]="usiLineClamp"
      [usiSize]="usiSize"
      [usiWeight]="usiWeight"
      [usiTransform]="usiTransform"
      [usiUnderline]="usiUnderline"
      usi-text
    >
      Test Text
    </p>
  `,
})
class TestComponent extends UsiTextComponent {}

describe('UsiTextComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTextComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create text', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.innerHTML).toContain('Test Text');
    expect(debugElement.nativeElement.className).toBe('usi-text');
  });

  it('should align text', () => {
    component.usiAlign = 'center';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--center');
  });

  it('should set text color', () => {
    component.usiColor = 'red';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--red');
  });

  it('should set text size', () => {
    component.usiSize = 'lg';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--lg');

    component.usiSize = 24;
    fixture.detectChanges();

    expect(debugElement.nativeElement.style.fontSize).toBe('24px');
  });

  it('should transform the text', () => {
    component.usiTransform = 'uppercase';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--uppercase');
  });

  it('should set text weight', () => {
    component.usiWeight = 'bold';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--bold');

    component.usiWeight = 900;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--900');
  });

  it('should inherit parent styles', () => {
    component.usiInherit = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--inherit');
  });

  it('should set line height to 1', () => {
    component.usiInline = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--inline');
  });

  it('should clamp text', () => {
    component.usiLineClamp = 2;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--line-clamp');
    expect(debugElement.nativeElement.style.WebkitLineClamp).toBe('2');
  });

  it('should underline text', () => {
    component.usiUnderline = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-text--underline');
  });
});
