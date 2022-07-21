import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { isFunction } from 'usi-campfire/utils';

export enum NotificationEventType {
  ADD,
  CLEAR,
  CLEAR_ALL,
}

/**
 * Constructor for our notification event.
 */
export class NotificationEvent {
  constructor(public type: NotificationEventType, public value?: any) {}
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
  public events: Observable<NotificationEvent> = this.eventSource.asObservable();

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
   * @param { any } options | Custom config to check local properties.
   * @param optionalOptions
   * @param { any } globalConfig | Global config to return if local is not set.
   * @param { string } property | Specify which property to check.
   * @protected
   */
  protected checkConfigItem(options: any, optionalOptions: any, globalConfig: any, property: string): any {
    if (options.hasOwnProperty(property)) {
      if (property === 'usiOnAdd' || property === 'usiOnRemove' || property === 'usiOnAction') {
        if (!isFunction(options[property])) {
          return null;
        }
      }

      return options[property];
    } else if (optionalOptions && optionalOptions.hasOwnProperty(property)) {
      if (property === 'usiOnAdd' || property === 'usiOnRemove' || property === 'usiOnAction') {
        if (!isFunction(optionalOptions[property])) {
          return null;
        }
      }

      return optionalOptions[property];
    } else {
      if (property === 'usiIcon' || property === 'usiOnAdd' || property === 'usiOnRemove' || property === 'usiOnAction') {
        return null;
      }

      return globalConfig[property];
    }
  }
}
