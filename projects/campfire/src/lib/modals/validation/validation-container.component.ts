import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

import { UsiNotificationComponentContainer } from '../../notifications/notification-container';
import { UsiModalConfig, UsiModalsService } from '../modals.service';
import { NotificationEvent, NotificationEventType } from '../../notifications/notifications.service';

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
  styleUrls: ['./styles/validation.component.scss', '../../notifications/notifications.scss'],
})
export class UsiValidationComponentContainer extends UsiNotificationComponentContainer implements OnInit {
  override notifications: Array<UsiModalConfig> = [];
  override centerCenterNotifications: Array<UsiModalConfig> = [];

  constructor(private elementRef: ElementRef, private usiModalsService: UsiModalsService) {
    super();
  }

  ngOnInit(): void {
    // Start listening to events from our service
    this.usiModalsService.events.subscribe((event: NotificationEvent) => {
      // Add dialog to array
      if (event.type === NotificationEventType.ADD) {
        let dialog: UsiModalConfig = event.value;
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
