import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { isFunction, UsiModal, UsiSnackbar, UsiToast } from 'usi-campfire/utils';

export enum NotificationEventType {
  ADD,
  CLEAR,
  CLEAR_ALL,
}

/**
 * Constructor for our notification event.
 */
export class NotificationEvent<T = any> {
  constructor(public type: NotificationEventType, public value?: T) {}
}

/**
 * Factory function for singleton use.
 * @return { UsiNotificationService } UsiNotificationService.
 */
export function notificationServiceFactory(): UsiNotificationService {
  return new UsiNotificationService();
}

/**
 * Main toast service that will be injected.
 */
@Injectable()
export class UsiNotificationService {
  protected eventSource: Subject<NotificationEvent> = new Subject<NotificationEvent>();
  events: Observable<NotificationEvent> = this.eventSource.asObservable();

  constructor() {}

  /**
   * Clear all notifications.
   * @protected
   */
  protected clearAll(): void {
    this.emitEvent(new NotificationEvent(NotificationEventType.CLEAR_ALL));
  }

  /**
   * Clear the specific notification.
   * @param { number } id | ID of the notification to be cleared.
   * @protected
   */
  protected clear(id: number): void {
    this.emitEvent(new NotificationEvent(NotificationEventType.CLEAR, id));
  }

  /**
   * Emit a new notification.
   * @param { NotificationEvent } event | Which notification event will be emitted.
   * @protected
   */
  protected emitEvent(event: NotificationEvent): void {
    if (this.eventSource) {
      this.eventSource.next(event);
    }
  }

  /**
   * Checks whether the local option is set, if not it checks the global config.
   * @param { UsiModal | UsiSnackbar | UsiToast | string } options | Custom config to check local properties.
   * @param { Partial<UsiModal | UsiSnackbar | UsiToast> | undefined } optionalOptions | Optional config to check local properties.
   * @param { UsiModal | UsiSnackbar | UsiToast } globalConfig | Global config to return if local is not set.
   * @param { keyof UsiModal | UsiSnackbar | UsiToast & string } property | Specify which property to check.
   * @protected
   */
  protected checkConfigItem<T extends UsiModal | UsiSnackbar | UsiToast>(
    options: T | string,
    optionalOptions: Partial<T> | undefined,
    globalConfig: T,
    property: keyof T & string
  ): T[keyof T & string] | undefined {
    if (typeof options === 'string') return;

    if (property in options) {
      switch (property) {
        case 'usiOnAdd':
        case 'usiOnRemove':
        case 'usiOnAction':
          if (isFunction(options[property])) {
            return options[property];
          } else {
            return undefined;
          }
        default:
          return options[property];
      }
    } else if (optionalOptions && property in optionalOptions) {
      switch (property) {
        case 'usiOnAdd':
        case 'usiOnRemove':
        case 'usiOnAction':
          if (isFunction(optionalOptions[property])) {
            return optionalOptions[property];
          } else {
            return undefined;
          }
        default:
          return optionalOptions[property];
      }
    } else {
      switch (property) {
        case 'usiIcon':
        case 'usiOnAdd':
        case 'usiOnRemove':
        case 'usiOnAction':
          return undefined;
        default:
          return globalConfig[property];
      }
    }
  }
}
