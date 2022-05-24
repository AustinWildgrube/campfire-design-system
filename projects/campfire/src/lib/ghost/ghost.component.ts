import { Component, Input } from '@angular/core';

import { BooleanInput, InputBoolean } from '../utils/convert';

@Component({
  selector: 'usi-ghost',
  template: `
    <div
      class="usi-ghost"
      [ngClass]="{
        'usi-ghost': true,
        'usi-ghost--inline': usiInline,
        'usi-ghost--rectangle': usiType === 'rectangle',
        'usi-ghost--circle': usiType === 'circle',
        'usi-ghost--text': usiType === 'text',
        'usi-ghost--h1': usiType === 'h1',
        'usi-ghost--h2': usiType === 'h2',
        'usi-ghost--h3': usiType === 'h3',
        'usi-ghost--h4': usiType === 'h4',
        'usi-ghost--h5': usiType === 'h5',
        'usi-ghost--h6': usiType === 'h6',
        class: class || ''
      }"
      [style.height.px]="usiHeight"
      [style.width.px]="usiWidth"
    ></div>
  `,
  styleUrls: ['./styles/ghost.component.scss'],
})
export class UsiGhostComponent {
  @Input()
  class?: string;

  @Input()
  @InputBoolean()
  usiInline?: BooleanInput;

  @Input()
  usiHeight?: number;

  @Input()
  usiType?: 'square' | 'rectangle' | 'circle' | 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  @Input()
  usiWidth?: number;

  constructor() {}
}
