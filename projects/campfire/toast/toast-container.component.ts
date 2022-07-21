import { Component, OnInit } from '@angular/core';

import { UsiToastService } from './toast.service';

import { UsiToastInterface } from 'usi-campfire/utils';
import { NotificationEvent, NotificationEventType, UsiNotificationComponentContainer } from 'usi-campfire/notifications';

@Component({
  selector: 'usi-toast-container',
  template: `
    <div class="usi-notification usi-notification--top-left">
      <usi-toast *ngFor="let toast of topLeftNotifications" [toast]="toast"></usi-toast>
    </div>

    <div class="usi-notification usi-notification--top-center">
      <usi-toast *ngFor="let toast of topCenterNotifications" [toast]="toast"></usi-toast>
    </div>

    <div class="usi-notification usi-notification--top-right">
      <usi-toast *ngFor="let toast of topRightNotifications" [toast]="toast"></usi-toast>
    </div>

    <div class="usi-notification usi-notification--center-center">
      <usi-toast *ngFor="let toast of centerCenterNotifications" [toast]="toast"></usi-toast>
    </div>

    <div class="usi-notification usi-notification--bottom-left">
      <usi-toast *ngFor="let toast of bottomLeftNotifications" [toast]="toast"></usi-toast>
    </div>

    <div class="usi-notification usi-notification--bottom-center">
      <usi-toast *ngFor="let toast of bottomCenterNotifications" [toast]="toast"></usi-toast>
    </div>

    <div class="usi-notification usi-notification--bottom-right">
      <usi-toast *ngFor="let toast of bottomRightNotifications" [toast]="toast"></usi-toast>
    </div>
  `,
  styleUrls: ['./styles/toast.component.scss', '../notifications/styles/notifications.scss'],
})
export class UsiToastComponentContainer extends UsiNotificationComponentContainer implements OnInit {
  override notifications: Array<UsiToastInterface> = [];
  override topLeftNotifications: Array<UsiToastInterface> = [];
  override topCenterNotifications: Array<UsiToastInterface> = [];
  override topRightNotifications: Array<UsiToastInterface> = [];
  override centerCenterNotifications: Array<UsiToastInterface> = [];
  override bottomLeftNotifications: Array<UsiToastInterface> = [];
  override bottomCenterNotifications: Array<UsiToastInterface> = [];
  override bottomRightNotifications: Array<UsiToastInterface> = [];

  constructor(private usiToastService: UsiToastService) {
    super();
  }

  ngOnInit(): void {
    // Start listening to events from our service
    this.usiToastService.events.subscribe((event: NotificationEvent) => {
      if (event.type === NotificationEventType.ADD) {
        let toast: UsiToastInterface = event.value;
        super.add(toast);
      } else if (event.type === NotificationEventType.CLEAR) {
        let id: number = event.value;
        super.clear(id);
      } else if (event.type === NotificationEventType.CLEAR_ALL) {
        super.clearAll();
      }
    });
  }
}
