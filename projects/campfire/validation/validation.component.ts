import { Component, ElementRef, Input } from '@angular/core';

import { UsiModalsService } from 'usi-campfire/modals';
import { UsiModal, UsiSpacing } from 'usi-campfire/utils';
import { isFunction } from 'usi-campfire/utils';

@Component({
  selector: 'usi-validation-modal',
  template: `
    <div *ngIf="validation" class="usi-modal" (usiClickOutside)="closeModal(validation)" role="document">
      <fa-icon class="usi-modal__close-button" (click)="closeModal(validation)" [icon]="['fal', 'times']" aria-label="Close modal" role="button"></fa-icon>

      <div class="usi-modal__content">
        <div class="usi-modal__header">
          <ng-container [ngSwitch]="validation.usiValidationType">
            <fa-icon *ngSwitchCase="'success'" class="usi-modal__icon" [icon]="['fal', 'check-circle']"></fa-icon>
            <h5 *ngSwitchCase="'success'" class="usi-modal__title">Success</h5>

            <fa-icon *ngSwitchCase="'error'" class="usi-modal__icon usi-modal__icon--red" [icon]="['fal', 'frown']"></fa-icon>
            <h5 *ngSwitchCase="'error'" class="usi-modal__title">Error</h5>

            <fa-icon *ngSwitchCase="'warning'" class="usi-modal__icon usi-modal__icon--yellow" [icon]="['fal', 'exclamation-triangle']"></fa-icon>
            <h5 *ngSwitchCase="'warning'" class="usi-modal__title">Warning</h5>
          </ng-container>
        </div>

        <div class="usi-modal__body">
          <p class="usi-modal__text">{{ validation.usiMessage }}</p>
        </div>

        <div class="usi-modal__footer">
          <button (click)="validation.usiOnAction ? onAction() : closeModal(validation)" usi-button>
            {{ validation.usiButtonText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./styles/validation.component.scss', '../modals/styles/modals.scss'],
})
export class UsiValidationModalComponent extends UsiSpacing {
  @Input() validation: UsiModal | undefined;

  constructor(private elementRef: ElementRef, private usiModalService: UsiModalsService) {
    super(elementRef);
  }

  /**
   * Run our custom action if it is specified
   * @return
   */
  public onAction(): void {
    if (this.validation?.usiOnAction && isFunction(this.validation.usiOnAction)) {
      this.validation.usiOnAction.call(this, this.validation);
    }
  }

  /**
   * Use the modal service to close the dialog.
   * @param { UsiModal } validation | To get the ID of the dialog message to close.
   * @return
   */
  public closeModal(validation: UsiModal): void {
    this.usiModalService.clear(validation.usiId!);
  }
}
