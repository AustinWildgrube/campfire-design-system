import { Component, Input } from '@angular/core';

import { IconName } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'usi-badge',
  template: `
    <span
      class="usi-badge"
      [ngClass]="{
        'usi-badge--success': usiType === 'success',
        'usi-badge--info': usiType === 'info',
        'usi-badge--error': usiType === 'error',
        'usi-badge--warning': usiType === 'warning'
      }"
    >
      <ng-container [ngSwitch]="usiType">
        <fa-icon *ngSwitchCase="'success'" [icon]="['fal', 'check-circle']"></fa-icon>
        <fa-icon *ngSwitchCase="'info'" [icon]="['fal', 'spinner']"></fa-icon>
        <fa-icon *ngSwitchCase="'error'" [icon]="['fal', 'ban']"></fa-icon>
        <fa-icon *ngSwitchCase="'warning'" [icon]="['fal', 'circle-notch']"></fa-icon>
        <fa-icon *ngSwitchDefault [icon]="['fal', 'spinner']"></fa-icon>
      </ng-container>

      <fa-icon *ngIf="usiIcon && usiType === 'default'" [icon]="['fal', usiIcon]"></fa-icon>

      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./styles/badge.component.scss'],
})
export class UsiBadgeComponent {
  @Input()
  usiType?: 'success' | 'info' | 'error' | 'warning' | 'default' = 'default';

  @Input()
  usiIcon?: IconName;

  constructor() {}
}
