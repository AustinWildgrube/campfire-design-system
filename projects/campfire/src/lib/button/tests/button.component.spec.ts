import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiButtonComponent } from '../button.component';

@Component({
  template: ` <button usi-button>Button</button> `,
})
class TestComponent extends UsiButtonComponent {}

describe('UsiButtonComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiButtonComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a button', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.className).toBe('usi-button');
  });

  it('should show a loading spinner', () => {
    component.usiLoading = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-button--loading');
  });

  it('should add the ghosting state', () => {
    component.usiGhost = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-button--ghost');
  });

  it('should be a block element', () => {
    component.usiBlock = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-button--block');
  });

  it('should disable button', () => {
    component.disabled = true;
    fixture.detectChanges();

    expect(component.disabled).toBeTruthy();
  });

  it('should have the correct type styles', () => {
    component.usiType = 'secondary';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-button--secondary');

    component.usiType = 'transparent';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-button--transparent');
  });

  it('should have the correct size styles', () => {
    component.usiSize = 'small';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-button--small');

    component.usiSize = 'large';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-button--large');
  });

  it('should have the correct color styles', () => {
    component.usiColor = 'white';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-button--white');
  });

  it('should show text in the button', () => {
    expect(debugElement.nativeElement.textContent).toBe('Button');
  });
});
