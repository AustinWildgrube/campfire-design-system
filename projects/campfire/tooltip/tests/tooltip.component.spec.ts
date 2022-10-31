import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UsiTooltipComponent } from '../tooltip.component';

@Component({
  template: `
    <usi-tooltip usiLabel="Test" [usiPlacement]="usiPlacement">
      <button id="test">Button</button>
    </usi-tooltip>
  `,
})
class TestComponent extends UsiTooltipComponent {}

describe('TooltipComponent', () => {
  let component: UsiTooltipComponent;
  let fixture: ComponentFixture<UsiTooltipComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTooltipComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    hoverForTooltip();
  }));

  function hoverForTooltip(): void {
    const hoverButton = fixture.nativeElement.querySelector('#test');
    const hoverEvent = new Event('mouseenter', { bubbles: true, cancelable: false });
    (hoverButton instanceof DebugElement ? hoverButton.nativeElement : hoverButton).dispatchEvent(hoverEvent);

    fixture.detectChanges();
    tick();
  }

  it('should create a tooltip', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.className).toBe('usi-tooltip');

    const tooltipLabel = fixture.nativeElement.querySelector('label');
    expect(tooltipLabel.className).toContain('usi-tooltip__text--show');
  });

  it('should have a label', fakeAsync(() => {
    const tooltipLabel = fixture.nativeElement.querySelector('label');

    expect(tooltipLabel.textContent).toBe('Test');
    expect(tooltipLabel.getAttribute('role')).toBe('tooltip');
    expect(tooltipLabel.getAttribute('tabindex')).toBe('-1');
  }));

  it('should hide on mouseleave', fakeAsync(() => {
    const tooltipLabel = fixture.nativeElement.querySelector('label');
    expect(tooltipLabel.className).toContain('usi-tooltip__text--show');

    const hoverButton = fixture.nativeElement.querySelector('#test');
    const leaveEvent = new Event('mouseleave', { bubbles: true, cancelable: false });
    (hoverButton instanceof DebugElement ? hoverButton.nativeElement : hoverButton).dispatchEvent(leaveEvent);

    fixture.detectChanges();
    tick();

    expect(tooltipLabel.className).not.toContain('usi-tooltip__text--show');
  }));

  it('should close when escape is pressed', fakeAsync(() => {
    const tooltipLabel = fixture.nativeElement.querySelector('label');
    expect(tooltipLabel.className).toContain('usi-tooltip__text--show');

    const escapeEvent = new KeyboardEvent('keyup', { code: 'Escape' });
    window.dispatchEvent(escapeEvent);

    fixture.detectChanges();
    tick();

    expect(tooltipLabel.className).not.toContain('usi-tooltip__text--show');
  }));

  it('should display at the top', fakeAsync(() => {
    const tooltipLabel = fixture.nativeElement.querySelector('label');
    expect(tooltipLabel.className).toContain('usi-tooltip__text--top');
  }));

  it('should display at the right', fakeAsync(() => {
    component.usiPlacement = 'right';
    fixture.detectChanges();
    tick();

    const escapeEvent = new KeyboardEvent('keyup', { code: 'Escape' });
    window.dispatchEvent(escapeEvent);

    fixture.detectChanges();
    tick();

    hoverForTooltip();

    const tooltipLabel = fixture.nativeElement.querySelector('label');
    expect(tooltipLabel.className).toContain('usi-tooltip__text--right');
  }));

  it('should display at the bottom', fakeAsync(() => {
    component.usiPlacement = 'bottom';
    fixture.detectChanges();
    tick();

    const escapeEvent = new KeyboardEvent('keyup', { code: 'Escape' });
    window.dispatchEvent(escapeEvent);

    fixture.detectChanges();
    tick();

    hoverForTooltip();

    const tooltipLabel = fixture.nativeElement.querySelector('label');
    expect(tooltipLabel.className).toContain('usi-tooltip__text--bottom');
  }));

  it('should display at the left', fakeAsync(() => {
    component.usiPlacement = 'left';
    fixture.detectChanges();
    tick();

    const escapeEvent = new KeyboardEvent('keyup', { code: 'Escape' });
    window.dispatchEvent(escapeEvent);

    fixture.detectChanges();
    tick();

    hoverForTooltip();

    const tooltipLabel = fixture.nativeElement.querySelector('label');
    expect(tooltipLabel.className).toContain('usi-tooltip__text--left');
  }));

  it('should be a multiline label', fakeAsync(() => {
    component.usiMultiline = true;
    component.usiLabel = 'This is a very long tooltip that should wrap to multiple lines.';

    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('usi-tooltip__text--multiline');
  }));

  it('should be offset', fakeAsync(() => {
    component.usiOffset = 10;
    fixture.detectChanges();
    tick();

    const tooltipLabel = fixture.nativeElement.querySelector('label');
    const hostPosition = debugElement.nativeElement.getBoundingClientRect();
    const tooltipPosition = tooltipLabel.getBoundingClientRect();
    const topPosition = hostPosition.top - tooltipPosition.height - component.usiOffset;

    expect(tooltipLabel.style.top).toBe(topPosition + 'px');
  }));
});
