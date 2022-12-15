import { Component, Input } from '@angular/core';

@Component({
  selector: 'usi-status',
  template: `
    <span class="usi-status">
      <span
        class="usi-status__circle"
        [ngStyle]="{
          'background-color': usiColor
        }"
      ></span>

      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./styles/status.component.scss'],
})
export class UsiStatusComponent {
  @Input()
  usiColor?: string;

  constructor() {}
}
