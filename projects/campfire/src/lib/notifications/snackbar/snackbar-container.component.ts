import { Component, OnInit } from '@angular/core';

import { NotificationEvent, NotificationEventType } from '../notifications.service';
import { UsiNotificationComponentContainer } from '../notification-container';
import { UsiSnackbarConfig, UsiSnackbarService } from './snackbar.service';

@Component({
  selector: 'usi-snackbar-container',
  template: `
    <div class="usi-notification usi-notification--top-left">
      <usi-snackbar *ngFor="let snackbar of topLeftNotifications" [snackbar]="snackbar"></usi-snackbar>
    </div>

    <div class="usi-notification usi-notification--top-center">
      <usi-snackbar *ngFor="let snackbar of topCenterNotifications" [snackbar]="snackbar"></usi-snackbar>
    </div>

    <div class="usi-notification usi-notification--top-right">
      <usi-snackbar *ngFor="let snackbar of topRightNotifications" [snackbar]="snackbar"></usi-snackbar>
    </div>

    <div class="usi-notification usi-notification--center-center">
      <usi-snackbar *ngFor="let snackbar of centerCenterNotifications" [snackbar]="snackbar"></usi-snackbar>
    </div>

    <div class="usi-notification usi-notification--bottom-left">
      <usi-snackbar *ngFor="let snackbar of bottomLeftNotifications" [snackbar]="snackbar"></usi-snackbar>
    </div>

    <div class="usi-notification usi-notification--bottom-center">
      <usi-snackbar *ngFor="let snackbar of bottomCenterNotifications" [snackbar]="snackbar"></usi-snackbar>
    </div>

    <div class="usi-notification usi-notification--bottom-right">
      <usi-snackbar *ngFor="let snackbar of bottomRightNotifications" [snackbar]="snackbar"></usi-snackbar>
    </div>
  `,
  styleUrls: ['./styles/snackbar.component.scss', '../notifications.scss'],
})
export class UsiSnackbarComponentContainer extends UsiNotificationComponentContainer implements OnInit {
  override topLeftNotifications: Array<UsiSnackbarConfig> = [];
  override topCenterNotifications: Array<UsiSnackbarConfig> = [];
  override topRightNotifications: Array<UsiSnackbarConfig> = [];
  override centerCenterNotifications: Array<UsiSnackbarConfig> = [];
  override bottomLeftNotifications: Array<UsiSnackbarConfig> = [];
  override bottomCenterNotifications: Array<UsiSnackbarConfig> = [];
  override bottomRightNotifications: Array<UsiSnackbarConfig> = [];

  constructor(private usiSnackbarService: UsiSnackbarService) {
    super();
  }

  ngOnInit(): void {
    // Start listening to events from our service
    this.usiSnackbarService.events.subscribe((event: NotificationEvent) => {
      if (event.type === NotificationEventType.ADD) {
        let snackbar: UsiSnackbarConfig = event.value;
        super.add(snackbar);
      } else if (event.type === NotificationEventType.CLEAR) {
        let id: number = event.value;
        super.clear(id);
      } else if (event.type === NotificationEventType.CLEAR_ALL) {
        super.clearAll();
      }
    });
  }
}
