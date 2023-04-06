import { Component, Input } from '@angular/core';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-ghost',
  template: `
    <div
      class="usi-ghost"
      [ngClass]="{
        'usi-ghost--inline': usiInline,
        'usi-ghost--rectangle': usiType === 'rectangle',
        'usi-ghost--circle': usiType === 'circle',
        'usi-ghost--text': usiType === 'text',
        'usi-ghost--h1': usiType === 'h1',
        'usi-ghost--h2': usiType === 'h2',
        'usi-ghost--h3': usiType === 'h3',
        'usi-ghost--h4': usiType === 'h4',
        'usi-ghost--h5': usiType === 'h5',
        'usi-ghost--h6': usiType === 'h6'
      }"
      [style.height.px]="usiHeight"
      [style.width.px]="usiWidth"
      aria-label="Loading"
    ></div>
  `,
  styleUrls: ['./styles/ghost.component.scss'],
})
export class UsiGhostComponent {
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
