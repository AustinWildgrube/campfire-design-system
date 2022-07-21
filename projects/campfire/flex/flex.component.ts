import { Component, Input } from '@angular/core';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-flex',
  template: `
    <div
      class="usi-flex"
      [ngClass]="{
        'usi-flex--direction-row-reverse': usiDirection === 'row-reverse',
        'usi-flex--direction-column': usiDirection === 'column',
        'usi-flex--direction-column-reverse': usiDirection === 'column-reverse',

        'usi-flex--align-start': usiAlign === 'start' || (usiJustify === 'between' && !usiAlign),
        'usi-flex--align-center': usiAlign === 'center' || ((usiDirection === 'row' || usiDirection === 'row-reverse') && !usiAlign),
        'usi-flex--align-stretch': usiAlign === 'stretch' || (usiGrow && !usiAlign),
        'usi-flex--align-initial': usiAlign === 'initial',
        'usi-flex--align-inherit': usiAlign === 'inherit',
        'usi-flex--align-unset': usiAlign === 'unset',
        'usi-flex--align-end': usiAlign === 'end',
        'usi-flex--align-baseline': usiAlign === 'baseline',

        'usi-flex--justify-initial': usiJustify === 'initial' && (usiDirection === 'row' || usiDirection === 'row-reverse'),
        'usi-flex--justify-inherit': usiJustify === 'inherit' && (usiDirection === 'row' || usiDirection === 'row-reverse'),
        'usi-flex--justify-unset': usiJustify === 'unset' && (usiDirection === 'row' || usiDirection === 'row-reverse'),
        'usi-flex--justify-start': usiJustify === 'start' && (usiDirection === 'row' || usiDirection === 'row-reverse'),
        'usi-flex--justify-center': usiJustify === 'center' && (usiDirection === 'row' || usiDirection === 'row-reverse'),
        'usi-flex--justify-end': usiJustify === 'end' && (usiDirection === 'row' || usiDirection === 'row-reverse'),
        'usi-flex--justify-around': usiJustify === 'around' && (usiDirection === 'row' || usiDirection === 'row-reverse'),
        'usi-flex--justify-between': usiJustify === 'between' && (usiDirection === 'row' || usiDirection === 'row-reverse'),
        'usi-flex--justify-evenly': usiJustify === 'evenly' && (usiDirection === 'row' || usiDirection === 'row-reverse'),

        'usi-flex--grow': usiGrow,
        'usi-flex--no-wrap': usiNoWrap
      }"
      [style.gap.px]="usiSpacing"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./styles/flex.component.scss'],
})
export class UsiFlexComponent {
  @Input()
  usiAlign?: 'initial' | 'inherit' | 'unset' | 'start' | 'center' | 'end' | 'baseline' | 'stretch';

  @Input()
  usiDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';

  @Input()
  @InputBoolean()
  usiGrow?: BooleanInput;

  @Input()
  usiJustify?: 'initial' | 'inherit' | 'unset' | 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

  @Input()
  @InputBoolean()
  usiNoWrap?: BooleanInput;

  @Input()
  usiSpacing?: number;

  constructor() {}
}
