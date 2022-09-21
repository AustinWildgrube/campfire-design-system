import { Component, ElementRef } from '@angular/core';

import { UsiSpacing } from 'usi-campfire/utils';

@Component({
  selector: 'usi-card',
  template: `
    <div class="usi-card">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./styles/card.component.scss'],
})
export class UsiCardComponent extends UsiSpacing {
  constructor(private elementRef: ElementRef) {
    super(elementRef);
  }
}
