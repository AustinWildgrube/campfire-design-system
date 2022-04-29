import { Component, Input } from '@angular/core';

import { UsiToastConfig, UsiToastService } from './toast.service';

@Component({
  selector: 'usi-toast',
  template: `
    <div *ngIf="toast" class="usi-toast">
      <fa-icon
        *ngIf="toast.usiShowClose"
        class="usi-toast__close"
        (click)="closeToast(toast)"
        [icon]="['fal', 'times']"
        aria-label="Close notification"
        role="button"
      ></fa-icon>

      <ng-container [ngSwitch]="toast.usiType">
        <fa-icon *ngSwitchCase="'success'" class="usi-toast__icon usi-toast__icon--success" [icon]="['fal', toast.usiIcon || 'check-circle']"></fa-icon>
        <fa-icon *ngSwitchCase="'info'" class="usi-toast__icon usi-toast__icon--info" [icon]="['fal', toast.usiIcon || 'info-circle']"> </fa-icon>
        <fa-icon *ngSwitchCase="'error'" class="usi-toast__icon usi-toast__icon--error" [icon]="['fal', toast.usiIcon || 'exclamation-circle']"></fa-icon>
        <fa-icon *ngSwitchCase="'warning'" class="usi-toast__icon usi-toast__icon--warning" [icon]="['fal', toast.usiIcon || 'exclamation-triangle']"></fa-icon>
        <fa-icon *ngSwitchDefault class="usi-toast__icon" [icon]="['fal', toast.usiIcon || 'question-circle']"></fa-icon>
      </ng-container>

      <div class="usi-toast__text">
        <span class="usi-toast__title">
          {{ toast.usiTitle }}
        </span>

        <p class="usi-toast__message">
          {{ toast.usiMessage }}
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./styles/toast.component.scss'],
})
export class UsiToastComponent {
  @Input() toast: UsiToastConfig | undefined;

  constructor(private usiToastService: UsiToastService) {}

  /**
   * Use the toast service to close the toast.
   * @param { UsiToastConfig } toast | To get the ID of the toast message to close.
   * @return
   */
  public closeToast(toast: UsiToastConfig): void {
    this.usiToastService.clear(toast.usiId!);
  }
}
