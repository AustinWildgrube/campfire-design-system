import { Component, Input } from '@angular/core';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-tab',
  template: `<div class="usi-tabs__content" [hidden]="!usiActive"><ng-content></ng-content></div>`,
  styleUrls: ['../styles/tab.component.scss'],
})
export class UsiTabComponent {
  @Input()
  usiLabel: string = '';

  @Input()
  @InputBoolean()
  usiActive?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  constructor() {}
}
