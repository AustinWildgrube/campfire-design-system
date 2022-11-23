import { Component, HostBinding, Input } from '@angular/core';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: '[usi-text]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./styles/text.component.scss'],
})
export class UsiTextComponent {
  @Input()
  usiAlign?: 'left' | 'center' | 'right' | 'justify';

  @Input()
  usiColor?: 'primary' | 'gray' | 'white' | 'success' | 'warning' | 'error' | 'info' | string;

  @HostBinding('style.color')
  public get color(): string {
    if (
      this.usiColor &&
      this.usiColor !== 'primary' &&
      this.usiColor !== 'gray' &&
      this.usiColor !== 'white' &&
      this.usiColor !== 'success' &&
      this.usiColor !== 'warning' &&
      this.usiColor !== 'error' &&
      this.usiColor !== 'info'
    ) {
      return this.usiColor;
    }

    return '';
  }

  @Input()
  usiSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

  @HostBinding('style.font-size.px')
  public get size(): string {
    if (this.usiSize && this.usiSize !== 'xs' && this.usiSize !== 'sm' && this.usiSize !== 'md' && this.usiSize !== 'lg' && this.usiSize !== 'xl') {
      return this.usiSize.toString();
    }

    return '';
  }

  @Input()
  usiTransform?: 'lowercase' | 'uppercase' | 'capitalize' | 'none';

  @Input()
  usiWeight?: 'lighter' | 'light' | 'semibold' | 'bold' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

  @Input()
  @InputBoolean()
  usiInherit?: BooleanInput;

  @Input()
  @InputBoolean()
  usiInline?: BooleanInput;

  @Input()
  usiLineClamp?: number;

  @HostBinding('style.-webkit-line-clamp')
  public get lineClamp(): string {
    return this.usiLineClamp ? this.usiLineClamp.toString() : '';
  }

  @Input()
  @InputBoolean()
  usiUnderline?: BooleanInput;

  @HostBinding('class')
  get getClasses(): any {
    return {
      ['usi-text']: true,
      [`usi-text--${this.usiAlign}`]: this.usiAlign,
      [`usi-text--${this.usiColor}`]: this.usiColor,
      [`usi-text--${this.usiSize}`]: this.usiSize,
      [`usi-text--${this.usiTransform}`]: this.usiTransform,
      [`usi-text--${this.usiWeight}`]: this.usiWeight,
      ['usi-text--inherit']: this.usiInherit,
      ['usi-text--inline']: this.usiInline,
      ['usi-text--line-clamp']: this.usiLineClamp,
      ['usi-text--underline']: this.usiUnderline,
    };
  }

  constructor() {}
}
