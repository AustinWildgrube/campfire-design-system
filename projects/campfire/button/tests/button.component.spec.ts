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
    expect(debugElement.nativeElement.className).toBe('usi-clickable');
  });

  it('should show a loading spinner', () => {
    component.usiLoading = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-clickable--loading');
  });

  it('should be a block element', () => {
    component.usiBlock = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-clickable--block');
  });

  it('should disable button', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    expect(component.usiDisabled).toBeTruthy();
  });

  it('should have the correct type styles', () => {
    component.usiType = 'secondary';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-clickable--secondary');

    component.usiType = 'transparent';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-clickable--transparent');
  });

  it('should have the correct size styles', () => {
    component.usiSize = 'small';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-clickable--small');

    component.usiSize = 'large';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-clickable--large');
  });

  it('should have the correct color styles', () => {
    component.usiColor = 'white';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-clickable--white');
  });

  it('should show text in the button', () => {
    expect(debugElement.nativeElement.textContent).toBe('Button');
  });
});
