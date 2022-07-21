import { Component, OnInit } from '@angular/core';

import { UsiModalInterface } from 'usi-campfire/utils';
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
  override notifications: Array<UsiModalInterface> = [];
  override centerCenterNotifications: Array<UsiModalInterface> = [];

  constructor(private usiModalsService: UsiModalsService) {
    super();
  }

  ngOnInit(): void {
    // Start listening to events from our service
    this.usiModalsService.events.subscribe((event: NotificationEvent) => {
      console.log('event', event);
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
