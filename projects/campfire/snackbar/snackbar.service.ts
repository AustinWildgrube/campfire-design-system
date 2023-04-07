import { Injectable, OnDestroy } from '@angular/core';

import { NotificationEvent, NotificationEventType, UsiNotificationService } from 'usi-campfire/notifications';
import { isFunction, isString, UsiSnackbar } from 'usi-campfire/utils';
import { Subject } from 'rxjs';

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
export class UsiSnackbarService extends UsiNotificationService implements OnDestroy {
  unsubscribe = new Subject<boolean>();

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  /**
   * Create snackbar of default type.
   * @param { UsiSnackbar | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public default(options: UsiSnackbar | string, optionalOptions?: Partial<UsiSnackbar>): number {
    return this.add(options, 'default', optionalOptions);
  }

  /**
   * Create snackbar of success type.
   * @param { UsiSnackbar | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public success(options: UsiSnackbar | string, optionalOptions?: Partial<UsiSnackbar>): number {
    return this.add(options, 'success', optionalOptions);
  }

  /**
   * Create snackbar of error type.
   * @param { UsiSnackbar | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public error(options: UsiSnackbar | string, optionalOptions?: Partial<UsiSnackbar>): number {
    return this.add(options, 'error', optionalOptions);
  }

  /**
   * Create snackbar of warning type.
   * @param { UsiSnackbar | string } options | Individual snackbar config overrides or a title.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public info(options: UsiSnackbar | string, optionalOptions?: Partial<UsiSnackbar>): number {
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
   * @param { UsiSnackbar | string } options | Options the user has defined or a title.
   * @param { string } type | Type of snackbar notification to add.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @protected
   */
  protected add(options: UsiSnackbar | string, type: string, optionalOptions?: Partial<UsiSnackbar>): number {
    let customSnackbarConfig: UsiSnackbar;

    // Set snackbar options to what is provided or set with title and message
    if (isString(options) && options !== '') {
      customSnackbarConfig = <UsiSnackbar>{
        usiTitle: options.toString(),
        ...optionalOptions,
      };
    } else {
      customSnackbarConfig = <UsiSnackbar>options;
    }

    // Message is required
    if (!customSnackbarConfig || !customSnackbarConfig.usiTitle) {
      throw new Error('UsiSnackbar: Snackbar notification must contain at least a title!');
    }

    // Set config items of snackbar
    let snackbar: UsiSnackbar = <UsiSnackbar>{
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
