import { Component, Input } from '@angular/core';

import { IconName } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'usi-inline',
  template: `
    <div class="usi-inline" [ngClass]="'usi-inline--' + usiType">
      <ng-container [ngSwitch]="usiType">
        <fa-icon *ngSwitchCase="'success'" class="usi-inline__icon" [icon]="['fal', usiIcon || 'check-circle']"></fa-icon>
        <fa-icon *ngSwitchCase="'info'" class="usi-inline__icon" [icon]="['fal', usiIcon || 'info-circle']"> </fa-icon>
        <fa-icon *ngSwitchCase="'error'" class="usi-inline__icon" [icon]="['fal', usiIcon || 'exclamation-circle']"></fa-icon>
        <fa-icon *ngSwitchCase="'warning'" class="usi-inline__icon" [icon]="['fal', usiIcon || 'exclamation-triangle']"></fa-icon>
        <fa-icon *ngSwitchDefault class="usi-inline__icon" [icon]="['fal', usiIcon || 'question-circle']"></fa-icon>
      </ng-container>

      <div class="usi-inline__text">
        <span class="usi-inline__title">
          {{ usiTitle }}
        </span>

        <span class="usi-inline__message">
          {{ usiMessage }}
        </span>
      </div>
    </div>
  `,
  styleUrls: ['./styles/inline.component.scss'],
})
export class UsiInlineComponent {
  @Input()
  usiTitle = '';

  @Input()
  usiMessage = '';

  @Input()
  usiIcon?: IconName | null;

  @Input()
  usiType?: 'success' | 'info' | 'warning' | 'error' | 'default' = 'default';

  constructor() {}
}
