import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { NotificationEvent, NotificationEventType, UsiNotificationService } from 'usi-campfire/notifications';
import { isFunction, isString, UsiToast } from 'usi-campfire/utils';

export const globalToastConfig = {
  usiIcon: 'question-circle',
  usiId: 0,
  usiLimit: 4,
  usiMessage: '',
  usiOnAdd: () => {},
  usiOnRemove: () => {},
  usiPosition: 'top-right',
  usiShowClose: true,
  usiTitle: '',
  usiType: 'default',
  usiTimeout: 4000,
};

@Injectable({ providedIn: 'root' })
export class UsiToastService extends UsiNotificationService implements OnDestroy {
  unsubscribe = new Subject<boolean>();

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  /**
   * Create Toast of default type.
   * @param { UsiToast | string } options | Individual toast config overrides or a title.
   * @param { string } message? | Optional message if they don't want to use a config.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public default(options: UsiToast | string, message?: string, optionalOptions?: Partial<UsiToast>): number {
    return this.add(options, 'default', message, optionalOptions);
  }

  /**
   * Create Toast of info type.
   * @param { UsiToast | string } options | Individual toast config overrides or a title.
   * @param { string } message | Optional message if they don't want to use a config.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public info(options: UsiToast | string, message?: string, optionalOptions?: Partial<UsiToast>): number {
    return this.add(options, 'info', message);
  }

  /**
   * Create Toast of success type.
   * @param { UsiToast | string } options | Individual toast config overrides or a title.
   * @param { string } message | Optional message if they don't want to use a config.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public success(options: UsiToast | string, message?: string, optionalOptions?: Partial<UsiToast>): number {
    return this.add(options, 'success', message);
  }

  /**
   * Create Toast of error type.
   * @param { UsiToast | string } options | Individual toast config overrides or a title.
   * @param { string } message | Optional message if they don't want to use a config.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public error(options: UsiToast | string, message?: string, optionalOptions?: Partial<UsiToast>): number {
    return this.add(options, 'error', message);
  }

  /**
   * Create Toast of warning type.
   * @param { UsiToast | string } options | Individual toast config overrides or a title.
   * @param { string } message | Optional message if they don't want to use a config.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @return
   */
  public warning(options: UsiToast | string, message?: string, optionalOptions?: Partial<UsiToast>): number {
    return this.add(options, 'warning', message);
  }

  /**
   * Clear all toast message.
   * @return
   */
  public override clearAll(): void {
    super.emitEvent(new NotificationEvent(NotificationEventType.CLEAR_ALL));
  }

  /**
   * Clear the specific toast message.
   * @param { number } id | ID of the toast to be cleared.
   * @return
   */
  public override clear(id: number): void {
    super.emitEvent(new NotificationEvent(NotificationEventType.CLEAR, id));
  }

  /**
   * Add our new toast message.
   * @param { UsiToast | string } options | Options the user has defined or a title.
   * @param { string } type | Type of toast notification to add.
   * @param { string } message | If the user defines a title they will need a message.
   * @param { UsiToast } optionalOptions | If using the shortcut and wants to be more specific.
   * @protected
   */
  protected add(options: UsiToast | string, type: string, message?: string, optionalOptions?: Partial<UsiToast>): number {
    let customToastConfig: UsiToast;

    // Set toast options to what is provided or set with title and message
    if (isString(options) && options !== '' && isString(message) && message != null) {
      customToastConfig = <UsiToast>{
        usiTitle: options.toString(),
        usiMessage: message.toString(),
        ...optionalOptions,
      };
    } else {
      customToastConfig = <UsiToast>options;
    }

    // Message is required
    if (!customToastConfig || (!customToastConfig.usiTitle && !customToastConfig.usiMessage)) {
      throw new Error('UsiToast: Toast notification must contain a title and a message!');
    }

    // Set config items of toast
    let toast: UsiToast = <UsiToast>{
      usiIcon: super.checkConfigItem(options, optionalOptions, globalToastConfig, 'usiIcon'),
      usiId: Math.floor(Math.random() * 1000 + 1),
      usiLimit: super.checkConfigItem(options, optionalOptions, globalToastConfig, 'usiLimit'),
      usiMessage: customToastConfig.usiMessage,
      usiOnAdd: super.checkConfigItem(options, optionalOptions, globalToastConfig, 'usiOnAdd'),
      usiOnRemove: super.checkConfigItem(options, optionalOptions, globalToastConfig, 'usiOnRemove'),
      usiPosition: super.checkConfigItem(options, optionalOptions, globalToastConfig, 'usiPosition'),
      usiShowClose: super.checkConfigItem(options, optionalOptions, globalToastConfig, 'usiShowClose'),
      usiTitle: customToastConfig.usiTitle,
      usiType: type || 'default',
      usiTimeout: super.checkConfigItem(options, optionalOptions, globalToastConfig, 'usiTimeout'),
    };

    // Push up a new toast item
    super.emitEvent(new NotificationEvent(NotificationEventType.ADD, toast));

    // If we have a onAdd function, call it here
    if (toast.usiOnAdd && isFunction(toast.usiOnAdd)) {
      toast.usiOnAdd.call(this, toast);
    }

    // Return the id of our toast message so the user can use it to
    // clear the notification if desired.
    return toast.usiId!;
  }
}
