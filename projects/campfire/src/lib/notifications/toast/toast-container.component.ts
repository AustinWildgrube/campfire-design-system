import { Component, OnInit } from '@angular/core';

import { NotificationEvent, NotificationEventType } from '../notifications.service';
import { UsiNotificationComponentContainer } from '../notification-container';
import { UsiToastService, UsiToastConfig } from './toast.service';

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
  styleUrls: ['./styles/toast.component.scss', '../notifications.scss'],
})
export class UsiToastComponentContainer extends UsiNotificationComponentContainer implements OnInit {
  override notifications: Array<UsiToastConfig> = [];
  override topLeftNotifications: Array<UsiToastConfig> = [];
  override topCenterNotifications: Array<UsiToastConfig> = [];
  override topRightNotifications: Array<UsiToastConfig> = [];
  override centerCenterNotifications: Array<UsiToastConfig> = [];
  override bottomLeftNotifications: Array<UsiToastConfig> = [];
  override bottomCenterNotifications: Array<UsiToastConfig> = [];
  override bottomRightNotifications: Array<UsiToastConfig> = [];

  constructor(private usiToastService: UsiToastService) {
    super();
  }

  ngOnInit(): void {
    // Start listening to events from our service
    this.usiToastService.events.subscribe((event: NotificationEvent) => {
      if (event.type === NotificationEventType.ADD) {
        let toast: UsiToastConfig = event.value;
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
