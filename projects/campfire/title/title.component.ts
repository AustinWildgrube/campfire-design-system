import { Component, HostBinding, Input } from '@angular/core';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'h1[usi-title], h2[usi-title], h3[usi-title], h4[usi-title], h5[usi-title], h6[usi-title]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./styles/title.component.scss'],
})
export class UsiTitleComponent {
  @Input()
  usiAlign?: 'left' | 'center' | 'right' | 'justify';

  @Input()
  @InputBoolean()
  usiDisplay?: BooleanInput;

  @HostBinding('class')
  get getClasses(): any {
    return {
      ['usi-title']: true,
      [`usi-title--${this.usiAlign}`]: this.usiAlign,
      ['usi-title--display']: this.usiDisplay,
    };
  }

  constructor() {}
}
