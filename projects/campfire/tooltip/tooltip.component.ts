import { Component, Input, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

@Component({
  selector: 'usi-tooltip',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./styles/tooltip.component.scss'],
})
export class UsiTooltipComponent {
  @HostBinding('class.usi-tooltip') true = true;

  @HostListener('mouseenter') onMouseEnter(): void {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.tooltip) {
      this.hide();
    }
  }

  @HostListener('window:keyup', ['$event']) onPressEscape(event: KeyboardEvent): void {
    if (this.tooltip && event.code === 'Escape') {
      this.renderer.removeClass(this.tooltip, 'usi-tooltip__text--show');
      this.renderer.removeChild(this.elementRef.nativeElement, this.tooltip);
      this.tooltip = null;
    }
  }

  @Input()
  usiLabel: string | number = '';

  @Input()
  usiPlacement?: 'top' | 'right' | 'bottom' | 'left' = 'top';

  @Input()
  usiOpenDelay?: number = 0;

  @Input()
  usiCloseDelay?: number = 0;

  @Input()
  usiOffset?: number = 10;

  @Input()
  @InputBoolean()
  usiMultiline?: BooleanInput = false;

  @HostBinding('class.usi-tooltip__text--multiline')
  public get isMultiline(): boolean {
    return this.usiMultiline == true;
  }

  tooltip: HTMLLabelElement | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  /**
   * Initialize our tooltip and control the opening delay.
   * @private
   */
  private show(): void {
    this.create();
    this.setPosition();

    window.setTimeout(() => {
      this.renderer.addClass(this.tooltip, 'usi-tooltip__text--show');
    }, this.usiOpenDelay);
  }

  /**
   * Hide our tooltip after the specified close delay.
   * @private
   */
  private hide(): void {
    window.setTimeout(() => {
      this.renderer.removeClass(this.tooltip, 'usi-tooltip__text--show');
      this.renderer.removeChild(this.elementRef.nativeElement, this.tooltip);
      this.tooltip = null;
    }, this.usiCloseDelay);
  }

  /**
   * We need to render the tooltip to the DOM, add the text, and the set some
   * accessibility attributes.
   * @private
   */
  private create(): void {
    this.tooltip = this.renderer.createElement('label');

    this.renderer.appendChild(this.tooltip, this.renderer.createText(this.usiLabel.toString()));
    this.renderer.appendChild(this.elementRef.nativeElement, this.tooltip);

    this.renderer.addClass(this.tooltip, 'usi-tooltip__text');
    this.renderer.addClass(this.tooltip, `usi-tooltip__text--${this.usiPlacement}`);

    this.renderer.setAttribute(this.tooltip, 'id', UniqueId());
    this.renderer.setAttribute(this.tooltip, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltip, 'tabindex', '-1');
  }

  /**
   * For the tooltip to always be centered on the wrapped element we need to do
   * some calculations. We can set the position based off the placement that
   * was specified.
   * @private
   */
  private setPosition(): void {
    let top, left;

    const hostPos = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip?.getBoundingClientRect();

    // I'm getting the warning "Deprecated symbol used, consult docs for better alternative",
    // but according to MDN, window.pageYOffset is not being deprecated.
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (!tooltipPos) {
      return;
    }

    switch (this.usiPlacement) {
      case 'top': {
        top = hostPos.top - tooltipPos.height - this.usiOffset!;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      }

      case 'right': {
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.right + this.usiOffset;
        break;
      }

      case 'bottom': {
        top = hostPos.bottom + this.usiOffset;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      }

      case 'left': {
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.left - tooltipPos.width - this.usiOffset!;
        break;
      }
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
