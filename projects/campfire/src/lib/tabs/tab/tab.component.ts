import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';

import { BooleanInput, InputBoolean } from '../../utils/convert';

@Component({
  selector: 'usi-tab',
  template: `<div class="usi-tabs__content" [hidden]="!usiActive"><ng-content></ng-content></div>`,
  styleUrls: ['../styles/tab.component.scss'],
})
export class UsiTabComponent implements AfterViewInit {
  @Input()
  usiLabel: string = '';

  @Input()
  @InputBoolean()
  usiActive?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Manually trigger change detection to fix NG0100 error
    this.cdr.detectChanges();
  }
}
