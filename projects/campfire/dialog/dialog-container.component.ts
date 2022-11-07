import { Component, OnInit } from '@angular/core';

import { UsiModal } from 'usi-campfire/utils';
import { UsiModalsService } from 'usi-campfire/modals';
import { NotificationEvent, NotificationEventType, UsiNotificationComponentContainer } from 'usi-campfire/notifications';

@Component({
  selector: 'usi-dialog-container',
  template: `
    <div [ngClass]="{ 'usi-underlay': centerCenterNotifications.length > 0 }">
      <div class="usi-notification usi-notification--center-center">
        <ng-container *ngFor="let dialog of centerCenterNotifications">
          <usi-dialog-modal *ngIf="dialog.usiModalType === 'dialog'" [dialog]="dialog"></usi-dialog-modal>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./styles/dialog.component.scss', '../notifications/styles/notifications.scss'],
})
export class UsiDialogComponentContainer extends UsiNotificationComponentContainer implements OnInit {
  override notifications: Array<UsiModal> = [];
  override centerCenterNotifications: Array<UsiModal> = [];

  constructor(private usiModalsService: UsiModalsService) {
    super();
  }

  ngOnInit(): void {
    // Start listening to events from our service
    this.usiModalsService.events.subscribe((event: NotificationEvent) => {
      // Add dialog to array
      if (event.type === NotificationEventType.ADD) {
        let dialog: UsiModal = event.value;
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
