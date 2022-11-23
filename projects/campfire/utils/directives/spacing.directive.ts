import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[usiM], [usiMt], [usiMr], [usiMb], [usiMl], [usiMx], [usiMy], [usiP], [usiPt], [usiPr], [usiPb], [usiPl], [usiPx], [usiPy]',
})
export class UsiSpacingDirective {
  // Margins
  @Input() public set usiM(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.marginTop = `${spacing}px`;
    this.callingComponent.style.marginRight = `${spacing}px`;
    this.callingComponent.style.marginBottom = `${spacing}px`;
    this.callingComponent.style.marginLeft = `${spacing}px`;
  }

  @Input() public set usiMt(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.marginTop = `${spacing}px`;
  }

  @Input() public set usiMr(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.marginRight = `${spacing}px`;
  }

  @Input() public set usiMb(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.marginBottom = `${spacing}px`;
  }

  @Input() public set usiMl(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.marginLeft = `${spacing}px`;
  }

  @Input() public set usiMx(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.marginLeft = `${spacing}px`;
    this.callingComponent.style.marginRight = `${spacing}px`;
  }

  @Input() public set usiMy(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);
    this.callingComponent.style.marginTop = `${spacing}px`;
    this.callingComponent.style.marginBottom = `${spacing}px`;
  }

  // Paddings
  @Input() public set usiP(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.paddingTop = `${spacing}px`;
    this.callingComponent.style.paddingRight = `${spacing}px`;
    this.callingComponent.style.paddingBottom = `${spacing}px`;
    this.callingComponent.style.paddingLeft = `${spacing}px`;
  }

  @Input() public set usiPt(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.paddingTop = `${spacing}px`;
  }

  @Input() public set usiPr(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.paddingRight = `${spacing}px`;
  }

  @Input() public set usiPb(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.paddingBottom = `${spacing}px`;
  }

  @Input() public set usiPl(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.paddingLeft = `${spacing}px`;
  }

  @Input() public set usiPx(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.paddingLeft = `${spacing}px`;
    this.callingComponent.style.paddingRight = `${spacing}px`;
  }

  @Input() public set usiPy(value: string | number) {
    const spacing = UsiSpacingDirective.getThemeSpacing(value);

    this.callingComponent.style.paddingTop = `${spacing}px`;
    this.callingComponent.style.paddingBottom = `${spacing}px`;
  }

  callingComponent: ElementCSSInlineStyle;

  constructor(elementRef: ElementRef) {
    this.callingComponent = elementRef.nativeElement;
  }

  /**
   * If our value is a string we know it is a part of our theme spacing,
   * so we can match that value and return the number equivalent.
   * @param { string | number } value | the value that was passed through the spacing attribute
   * @returns the pixel value that will be included in our spacing
   */
  private static getThemeSpacing(value: string | number): number {
    if (typeof value === 'string') {
      switch (value) {
        case 'xxs':
          return 4;

        case 'xs':
          return 8;

        case 'sm':
          return 12;

        case 'md':
          return 16;

        case 'lg':
          return 20;

        case 'xl':
          return 32;

        case 'xxl':
          return 44;

        case 'xxxl':
          return 64;

        default:
          throw new Error('UsiSpacingDirective: Numbers require the square bracket syntax!');
      }
    }

    return value;
  }
}
