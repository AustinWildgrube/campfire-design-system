import { Injectable } from '@angular/core';

import { IconName } from '@fortawesome/pro-light-svg-icons';

import { NotificationEvent, NotificationEventType, UsiNotificationService } from '../notifications.service';
import { isFunction, isString } from '../toast/toast.utils';

export interface UsiSnackbarConfig {
  usiButtonText?: string;
  usiIcon?: IconName;
  usiId?: number;
  usiLimit?: number;
  usiOnAction?: Function;
  usiOnAdd?: Function;
  usiOnRemove?: Function;
  usiPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center' | 'center-center';
  usiTitle: string;
  usiType?: 'success' | 'error' | 'info' | 'default';
  usiTimeout?: number;
}

export const globalSnackbarConfig = {
  usiButtonText: 'Okay',
  usiIcon: 'question-circle',
  usiId: 0,
  usiLimit: 4,
  usiOnAction: () => {},
  usiOnAdd: () => {},
  usiOnRemove: () => {},
  usiPosition: 'bottom-center',
  usiTitle: '',
  usiType: 'default',
  usiTimeout: 4000,
};

@Injectable({ providedIn: 'root' })
export class UsiSnackbarService extends UsiNotificationService {
  constructor() {
    super();
  }

  /**
   * Create snackbar of default type.
   * @param { UsiSnackbarConfig | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToastConfig } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public default(options: UsiSnackbarConfig | string, optionalOptions?: Partial<UsiSnackbarConfig>): number {
    return this.add(options, 'default', optionalOptions);
  }

  /**
   * Create snackbar of success type.
   * @param { UsiSnackbarConfig | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToastConfig } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public success(options: UsiSnackbarConfig | string, optionalOptions?: Partial<UsiSnackbarConfig>): number {
    return this.add(options, 'success', optionalOptions);
  }

  /**
   * Create snackbar of error type.
   * @param { UsiSnackbarConfig | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToastConfig } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public error(options: UsiSnackbarConfig | string, optionalOptions?: Partial<UsiSnackbarConfig>): number {
    return this.add(options, 'error', optionalOptions);
  }

  /**
   * Create snackbar of warning type.
   * @param { UsiSnackbarConfig | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToastConfig } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public info(options: UsiSnackbarConfig | string, optionalOptions?: Partial<UsiSnackbarConfig>): number {
    return this.add(options, 'info', optionalOptions);
  }

  /**
   * Clear a specific snackbar message.
   * @param { number } id | ID of the snackbar to be cleared.
   * @return
   */
  public override clear(id: number): void {
    super.emitEvent(new NotificationEvent(NotificationEventType.CLEAR, id));
  }

  /**
   * Clear all snackbar messages.
   * @return
   */
  public override clearAll(): void {
    super.emitEvent(new NotificationEvent(NotificationEventType.CLEAR_ALL));
  }

  /**
   * Add our new snackbar message.
   * @param { UsiSnackbarConfig | string } options | Options the user has defined or a title.
   * @param { string } type | Type of snackbar notification to add.
   * @param { UsiToastConfig } optionalOptions | If using the shortcut and wants to be more specific.
   * @protected
   */
  protected add(options: UsiSnackbarConfig | string, type: string, optionalOptions?: Partial<UsiSnackbarConfig>): number {
    let customSnackbarConfig: UsiSnackbarConfig;

    // Set snackbar options to what is provided or set with title and message
    if (isString(options) && options !== '') {
      customSnackbarConfig = <UsiSnackbarConfig>{
        usiTitle: options.toString(),
        ...optionalOptions,
      };
    } else {
      customSnackbarConfig = <UsiSnackbarConfig>options;
    }

    // Message is required
    if (!customSnackbarConfig || !customSnackbarConfig.usiTitle) {
      throw new Error('UsiSnackbar: Snackbar notification must contain at least a title!');
    }

    // Set config items of snackbar
    let snackbar: UsiSnackbarConfig = <UsiSnackbarConfig>{
      usiOnAction: super.checkConfigItem(options, optionalOptions, globalSnackbarConfig, 'usiOnAction'),
      usiButtonText: super.checkConfigItem(options, optionalOptions, globalSnackbarConfig, 'usiButtonText'),
      usiIcon: super.checkConfigItem(options, optionalOptions, globalSnackbarConfig, 'usiIcon'),
      usiId: Math.floor(Math.random() * 1000 + 1),
      usiLimit: super.checkConfigItem(options, optionalOptions, globalSnackbarConfig, 'usiLimit'),
      usiOnAdd: super.checkConfigItem(options, optionalOptions, globalSnackbarConfig, 'usiOnAdd'),
      usiOnRemove: super.checkConfigItem(options, optionalOptions, globalSnackbarConfig, 'usiOnRemove'),
      usiPosition: super.checkConfigItem(options, optionalOptions, globalSnackbarConfig, 'usiPosition'),
      usiTitle: customSnackbarConfig.usiTitle,
      usiType: type || 'default',
      usiTimeout: super.checkConfigItem(options, optionalOptions, globalSnackbarConfig, 'usiTimeout'),
    };

    // Push up a new snackbar item
    super.emitEvent(new NotificationEvent(NotificationEventType.ADD, snackbar));

    // If we have a onAdd function, call it here
    if (snackbar.usiOnAdd && isFunction(snackbar.usiOnAdd)) {
      snackbar.usiOnAdd.call(this, snackbar);
    }

    // Return the id of our snackbar message so the user can use
    // it to clear the notification if desired.
    return snackbar.usiId!;
  }
}
