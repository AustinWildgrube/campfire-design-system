import { Component, OnInit } from '@angular/core';

import { UsiSnackbarService } from './snackbar.service';

import { UsiSnackbarInterface } from 'usi-campfire/utils';
import { NotificationEvent, NotificationEventType, UsiNotificationComponentContainer } from 'usi-campfire/notifications';

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
  styleUrls: ['./styles/snackbar.component.scss', '../notifications/styles/notifications.scss'],
})
export class UsiSnackbarComponentContainer extends UsiNotificationComponentContainer implements OnInit {
  override topLeftNotifications: Array<UsiSnackbarInterface> = [];
  override topCenterNotifications: Array<UsiSnackbarInterface> = [];
  override topRightNotifications: Array<UsiSnackbarInterface> = [];
  override centerCenterNotifications: Array<UsiSnackbarInterface> = [];
  override bottomLeftNotifications: Array<UsiSnackbarInterface> = [];
  override bottomCenterNotifications: Array<UsiSnackbarInterface> = [];
  override bottomRightNotifications: Array<UsiSnackbarInterface> = [];

  constructor(private usiSnackbarService: UsiSnackbarService) {
    super();
  }

  ngOnInit(): void {
    // Start listening to events from our service
    this.usiSnackbarService.events.subscribe((event: NotificationEvent) => {
      if (event.type === NotificationEventType.ADD) {
        let snackbar: UsiSnackbarInterface = event.value;
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
