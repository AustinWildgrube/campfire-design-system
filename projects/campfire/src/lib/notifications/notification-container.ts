import { UsiToastConfig } from './toast/toast.service';
import { UsiSnackbarConfig } from './snackbar/snackbar.service';

import { isFunction } from './toast/toast.utils';
import { UsiModalConfig } from '../modals/modals.service';

export class UsiNotificationComponentContainer {
  notifications: Array<UsiToastConfig | UsiSnackbarConfig | UsiModalConfig> = [];
  topLeftNotifications: Array<UsiToastConfig | UsiSnackbarConfig | UsiModalConfig> = [];
  topCenterNotifications: Array<UsiToastConfig | UsiSnackbarConfig | UsiModalConfig> = [];
  topRightNotifications: Array<UsiToastConfig | UsiSnackbarConfig | UsiModalConfig> = [];
  centerCenterNotifications: Array<UsiToastConfig | UsiSnackbarConfig | UsiModalConfig> = [];
  bottomLeftNotifications: Array<UsiToastConfig | UsiSnackbarConfig | UsiModalConfig> = [];
  bottomCenterNotifications: Array<UsiToastConfig | UsiSnackbarConfig | UsiModalConfig> = [];
  bottomRightNotifications: Array<UsiToastConfig | UsiSnackbarConfig | UsiModalConfig> = [];

  constructor() {}

  /**
   * We need to sort notifications into the correct arrays to keep from running multiple
   * for loops.
   * @protected
   */
  protected prepareNotifications(): void {
    this.topLeftNotifications = this.notifications.filter((toast) => toast.usiPosition === 'top-left');
    this.topCenterNotifications = this.notifications.filter((toast) => toast.usiPosition === 'top-center');
    this.topRightNotifications = this.notifications.filter((toast) => toast.usiPosition === 'top-right' || !toast.usiPosition);
    this.centerCenterNotifications = this.notifications.filter((toast) => toast.usiPosition === 'center-center');
    this.bottomLeftNotifications = this.notifications.filter((toast) => toast.usiPosition === 'bottom-left');
    this.bottomCenterNotifications = this.notifications.filter((toast) => toast.usiPosition === 'bottom-center');
    this.bottomRightNotifications = this.notifications.filter((toast) => toast.usiPosition === 'bottom-right');
  }

  /**
   * Add a new notification to our array.
   * @param { UsiToastConfig | UsiSnackbarConfig | UsiModalConfig } toast | The data for the notification.
   * @protected
   */
  protected add(toast: UsiToastConfig | UsiSnackbarConfig | UsiModalConfig): void {
    // If we've gone over our limit, remove the earliest one from the array
    if (this.notifications.length >= toast.usiLimit!) {
      console.log('Removing oldest notification');
      this.notifications.shift();
    }

    // Add toast to array
    this.notifications.push(toast);

    // If there's a timeout individually or globally, set the toast to timeout
    if (toast.usiTimeout) {
      this.setTimeout(toast);
    }

    // Sort notifications into respective arrays
    this.prepareNotifications();
  }

  /**
   * Clear individual notification by id from our array.
   * @param { number } id | ID of the notification that needs to be cleared.
   * @protected
   */
  protected clear(id: number): void {
    this.notifications.forEach((value: any, key: number) => {
      if (value.usiId === id) {
        // Custom close function was specified
        if (value.usiOnRemove && isFunction(value.usiOnRemove)) {
          value.usiOnRemove.call(this, value);
        }

        this.notifications.splice(key, 1);
      }
    });

    this.prepareNotifications();
  }

  /**
   * Clear all toast notifications in the array.
   * @protected
   */
  protected clearAll(): void {
    // Run on remove function if there is one.
    this.notifications.forEach((value: any) => {
      if (value.usiOnRemove && isFunction(value.usiOnRemove)) {
        value.usiOnRemove.call(this, value);
      }
    });

    this.notifications = [];
    this.prepareNotifications();
  }

  /**
   * Sets the timeouts for individual notifications.
   * @param { UsiToastConfig | UsiSnackbarConfig | UsiModalConfig } notification | We need the ID and Timeout to
   * set properties.
   * @protected
   */
  protected setTimeout(notification: UsiToastConfig | UsiSnackbarConfig | UsiModalConfig): void {
    window.setTimeout(() => {
      this.clear(notification.usiId!);
    }, notification.usiTimeout);
  }
}
