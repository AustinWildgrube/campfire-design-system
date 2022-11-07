import { Injectable } from '@angular/core';

import { isFunction, isString, UsiModal } from 'usi-campfire/utils';
import { NotificationEvent, NotificationEventType, UsiNotificationService } from 'usi-campfire/notifications';

export const globalModalConfig: UsiModal = {
  usiButtonText: 'Okay',
  usiCancelText: 'Cancel',
  usiId: 0,
  usiLimit: 1,
  usiModalType: 'dialog',
  usiOnAction: () => {},
  usiOnAdd: () => {},
  usiOnRemove: () => {},
  usiMessage: '',
  usiPosition: 'center-center',
  usiTitle: '',
  usiTimeout: 0,
  usiValidationType: 'success',
};

@Injectable({
  providedIn: 'root',
})
export class UsiModalsService extends UsiNotificationService {
  constructor() {
    super();
  }

  /**
   * Clear the specific modal message.
   * @param { number } id | ID of the modal to be cleared.
   * @return
   */
  public override clear(id: number): void {
    super.emitEvent(new NotificationEvent(NotificationEventType.CLEAR, id));
  }

  /**
   * Add our new notification.
   * @param options
   * @param optionalOptions
   */
  public add(options: UsiModal | string, optionalOptions?: Partial<UsiModal>): number {
    let customModalConfig: UsiModal;

    // Set modal options to what is provided or set with title and message
    if (isString(options) && options !== '') {
      customModalConfig = <UsiModal>{
        usiTitle: options.toString(),
        ...optionalOptions,
      };
    } else {
      customModalConfig = <UsiModal>options;
    }

    // Title is required
    if (!customModalConfig || !customModalConfig.usiTitle) {
      throw new Error('UsiModal: Modal must contain at least a title!');
    }

    // Set config items of snackbar
    let modal: UsiModal = <UsiModal>{
      usiButtonText: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiButtonText'),
      usiCancelText: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiCancelText'),
      usiId: Math.floor(Math.random() * 1000 + 1),
      usiLimit: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiLimit'),
      usiMessage: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiMessage'),
      usiModalType: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiModalType'),
      usiOnAction: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiOnAction'),
      usiOnAdd: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiOnAdd'),
      usiOnRemove: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiOnRemove'),
      usiPosition: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiPosition'),
      usiTitle: customModalConfig.usiTitle,
      usiTimeout: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiTimeout'),
      usiValidationType: super.checkConfigItem(options, optionalOptions, globalModalConfig, 'usiValidationType'),
    };

    // Push up a new modal item
    super.emitEvent(new NotificationEvent(NotificationEventType.ADD, modal));

    // If we have a onAdd function, call it here
    if (modal.usiOnAdd && isFunction(modal.usiOnAdd)) {
      modal.usiOnAdd.call(this, modal);
    }

    // Return the id of our snackbar message so the user can use
    // it to clear the notification if desired.
    return modal.usiId!;
  }
}
