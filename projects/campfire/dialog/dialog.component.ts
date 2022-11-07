import { Component, ElementRef, Input } from '@angular/core';

import { UsiModalsService } from 'usi-campfire/modals';
import { isFunction, UsiModal, UsiSpacing } from 'usi-campfire/utils';

@Component({
  selector: 'usi-dialog-modal',
  template: `
    <div *ngIf="dialog" class="usi-modal" (usiClickOutside)="closeModal(dialog)" role="document">
      <div class="usi-modal__content">
        <div class="usi-modal__header">
          <h5 class="usi-modal__title">{{ dialog.usiTitle }}</h5>

          <fa-icon class="usi-modal__close-button" (click)="closeModal(dialog)" [icon]="['fal', 'times']" aria-label="Close modal" role="button"></fa-icon>
        </div>

        <div class="usi-modal__body">
          <p class="usi-modal__text">{{ dialog.usiMessage }}</p>
        </div>

        <div class="usi-modal__footer">
          <button (click)="closeModal(dialog)" aria-label="Close modal" role="button" usiType="secondary" usi-button>
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
export class UsiDialogModalComponent extends UsiSpacing {
  @Input() dialog: UsiModal | undefined;

  constructor(private elementRef: ElementRef, private usiModalService: UsiModalsService) {
    super(elementRef);
  }

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
