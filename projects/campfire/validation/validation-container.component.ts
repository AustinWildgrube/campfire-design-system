import { Component, ElementRef, OnInit } from '@angular/core';

import { UsiModalsService } from 'usi-campfire/modals';
import { UsiModalInterface } from 'usi-campfire/utils';
import { UsiNotificationComponentContainer } from 'usi-campfire/notifications';
import { NotificationEvent, NotificationEventType } from 'usi-campfire/notifications';

@Component({
  selector: 'usi-dialog-container',
  template: `
    <div [ngClass]="{ 'usi-underlay': centerCenterNotifications.length > 0 }">
      <div class="usi-notification usi-notification--center-center">
        <ng-container *ngFor="let validation of centerCenterNotifications">
          <usi-validation-modal *ngIf="validation.usiModalType === 'validation'" [validation]="validation"></usi-validation-modal>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./styles/validation.component.scss', '../notifications/styles/notifications.scss'],
})
export class UsiValidationComponentContainer extends UsiNotificationComponentContainer implements OnInit {
  override notifications: Array<UsiModalInterface> = [];
  override centerCenterNotifications: Array<UsiModalInterface> = [];

  constructor(private elementRef: ElementRef, private usiModalsService: UsiModalsService) {
    super();
  }

  ngOnInit(): void {
    // Start listening to events from our service
    this.usiModalsService.events.subscribe((event: NotificationEvent) => {
      // Add dialog to array
      if (event.type === NotificationEventType.ADD) {
        let dialog: UsiModalInterface = event.value;
        super.add(dialog);
      } else if (event.type === NotificationEventType.CLEAR) {
        let id: number = event.value;
        super.clear(id);
      } else if (event.type === NotificationEventType.CLEAR_ALL) {
        super.clearAll();
      }
    });
  }
}
