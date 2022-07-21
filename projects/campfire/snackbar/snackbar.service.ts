import { Injectable } from '@angular/core';

import { NotificationEvent, NotificationEventType, UsiNotificationService } from 'usi-campfire/notifications';
import { isFunction, isString, UsiSnackbarInterface } from 'usi-campfire/utils';

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
   * @param { UsiSnackbarInterface | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToastInterface } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public default(options: UsiSnackbarInterface | string, optionalOptions?: Partial<UsiSnackbarInterface>): number {
    return this.add(options, 'default', optionalOptions);
  }

  /**
   * Create snackbar of success type.
   * @param { UsiSnackbarInterface | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToastInterface } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public success(options: UsiSnackbarInterface | string, optionalOptions?: Partial<UsiSnackbarInterface>): number {
    return this.add(options, 'success', optionalOptions);
  }

  /**
   * Create snackbar of error type.
   * @param { UsiSnackbarInterface | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToastInterface } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public error(options: UsiSnackbarInterface | string, optionalOptions?: Partial<UsiSnackbarInterface>): number {
    return this.add(options, 'error', optionalOptions);
  }

  /**
   * Create snackbar of warning type.
   * @param { UsiSnackbarInterface | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToastInterface } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public info(options: UsiSnackbarInterface | string, optionalOptions?: Partial<UsiSnackbarInterface>): number {
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
   * @param { UsiSnackbarInterface | string } options | Options the user has defined or a title.
   * @param { string } type | Type of snackbar notification to add.
   * @param { UsiToastInterface } optionalOptions | If using the shortcut and wants to be more specific.
   * @protected
   */
  protected add(options: UsiSnackbarInterface | string, type: string, optionalOptions?: Partial<UsiSnackbarInterface>): number {
    let customSnackbarConfig: UsiSnackbarInterface;

    // Set snackbar options to what is provided or set with title and message
    if (isString(options) && options !== '') {
      customSnackbarConfig = <UsiSnackbarInterface>{
        usiTitle: options.toString(),
        ...optionalOptions,
      };
    } else {
      customSnackbarConfig = <UsiSnackbarInterface>options;
    }

    // Message is required
    if (!customSnackbarConfig || !customSnackbarConfig.usiTitle) {
      throw new Error('UsiSnackbar: Snackbar notification must contain at least a title!');
    }

    // Set config items of snackbar
    let snackbar: UsiSnackbarInterface = <UsiSnackbarInterface>{
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
