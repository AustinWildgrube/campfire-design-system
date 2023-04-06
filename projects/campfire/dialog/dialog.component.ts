import { Component, Input } from '@angular/core';

import { UsiModalsService } from 'usi-campfire/modals';
import { isFunction, UsiModal } from 'usi-campfire/utils';

@Component({
  selector: 'usi-dialog-modal',
  template: `
    <div
      *ngIf="dialog"
      class="usi-modal"
      (usiClickOutside)="closeModal(dialog)"
      (keydown.escape)="closeModal(dialog)"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      aria-modal="true"
      role="alertdialog"
      cdkTrapFocus
      cdkTrapFocusAutoCapture
    >
      <div class="usi-modal__content">
        <div class="usi-modal__header">
          <h5 id="dialog-title" class="usi-modal__title">{{ dialog.usiTitle }}</h5>

          <fa-icon
            class="usi-modal__close-button"
            (click)="closeModal(dialog)"
            (keydown.enter)="closeModal(dialog)"
            (keydown.space)="closeModal(dialog)"
            [icon]="['fal', 'times']"
            aria-label="Close modal"
            role="button"
            tabindex="0"
          ></fa-icon>
        </div>

        <div class="usi-modal__body">
          <p id="dialog-description" class="usi-modal__text">{{ dialog.usiMessage }}</p>
        </div>

        <div class="usi-modal__footer">
          <button (click)="closeModal(dialog)" usiType="secondary" aria-label="Close modal" usi-button cdkFocusInitial>
            {{ dialog.usiCancelText }}
          </button>

          <button (click)="dialog.usiOnAction ? onAction() : closeModal(dialog)" usi-button>
            {{ dialog.usiButtonText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./styles/dialog.component.scss', '../modals/styles/modals.scss'],
})
export class UsiDialogModalComponent {
  @Input() dialog: UsiModal | undefined;

  constructor(private usiModalService: UsiModalsService) {}

  /**
   * Run our custom action if it is specified
   * @return
   */
  public onAction(): void {
    if (this.dialog?.usiOnAction && isFunction(this.dialog.usiOnAction)) {
      this.dialog.usiOnAction.call(this, this.dialog);
    }
  }

  /**
   * Use the modal service to close the dialog.
   * @param { UsiModal } dialog | To get the ID of the dialog message to close.
   * @return
   */
  public closeModal(dialog: UsiModal): void {
    this.usiModalService.clear(dialog.usiId!);
  }
}
