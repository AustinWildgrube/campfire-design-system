import { Component, ElementRef, Input } from '@angular/core';

import { UsiSnackbarService } from './snackbar.service';
import { isFunction, UsiSnackbar } from 'usi-campfire/utils';

@Component({
  selector: 'usi-snackbar',
  template: `
    <div *ngIf="snackbar" class="usi-snackbar" [ngClass]="'usi-snackbar--' + snackbar.usiType">
      <div class="usi-snackbar__text">
        <ng-container [ngSwitch]="snackbar.usiType">
          <fa-icon *ngSwitchCase="'success'" class="usi-snackbar__icon" [icon]="['fal', snackbar.usiIcon || 'check-circle']"></fa-icon>
          <fa-icon *ngSwitchCase="'info'" class="usi-snackbar__icon" [icon]="['fal', snackbar.usiIcon || 'info-circle']"> </fa-icon>
          <fa-icon *ngSwitchCase="'error'" class="usi-snackbar__icon" [icon]="['fal', snackbar.usiIcon || 'exclamation-circle']"></fa-icon>
          <fa-icon *ngSwitchCase="'warning'" class="usi-snackbar__icon" [icon]="['fal', snackbar.usiIcon || 'exclamation-triangle']"></fa-icon>
          <fa-icon *ngSwitchDefault class="usi-snackbar__icon" [icon]="['fal', snackbar.usiIcon || 'question-circle']"></fa-icon>
        </ng-container>

        <span class="usi-snackbar__title">
          {{ snackbar.usiTitle }}
        </span>
      </div>

      <button class="usi-snackbar__action" (click)="snackbar.usiOnAction ? onAction() : closeToast(snackbar.usiId!)">
        {{ snackbar.usiButtonText }}
      </button>
    </div>
  `,
  styleUrls: ['./styles/snackbar.component.scss'],
})
export class UsiSnackbarComponent {
  @Input() snackbar: UsiSnackbar | undefined;

  constructor(private elementRef: ElementRef, private usiSnackbarService: UsiSnackbarService) {}

  /**
   * Run our custom action if it is specified
   * @return
   */
  public onAction(): void {
    if (this.snackbar?.usiOnAction && isFunction(this.snackbar.usiOnAction)) {
      this.snackbar.usiOnAction.call(this, this.snackbar);
    }
  }

  /**
   * Use the snackbar service to close the notification.
   * @param { number } id | ID of snackbar message to close.
   * @return
   */
  public closeToast(id: number): void {
    this.usiSnackbarService.clear(id!);
  }
}
