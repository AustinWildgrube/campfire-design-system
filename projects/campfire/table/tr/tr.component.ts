import { Component, ElementRef, HostBinding } from '@angular/core';

import { UsiSpacing } from 'usi-campfire/utils';

@Component({
  selector: 'usi-table tr',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['../styles/th.component.scss'],
})
export class UsiTrComponent extends UsiSpacing {
  @HostBinding('class.usi-table__row') true = true;

  constructor(private elementRef: ElementRef) {
    super(elementRef);
  }
}
