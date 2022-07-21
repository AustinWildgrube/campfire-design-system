import { IconName } from '@fortawesome/pro-light-svg-icons';

export interface UsiModalInterface {
  usiButtonText?: string;
  usiCancelText?: string;
  usiId?: number;
  usiLimit?: number;
  usiMessage?: string;
  usiModalType?: 'dialog' | 'validation';
  usiOnAction?: Function;
  usiOnAdd?: Function;
  usiOnRemove?: Function;
  usiPosition?: 'center-center';
  usiTitle?: string;
  usiTimeout?: number;
  usiValidationType?: 'success' | 'warning' | 'error';
}

export interface UsiSnackbarInterface {
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

export interface UsiToastInterface {
  usiIcon?: IconName;
  usiId?: number;
  usiLimit?: number;
  usiMessage: string;
  usiOnAdd?: Function;
  usiOnRemove?: Function;
  usiPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center' | 'center-center';
  usiShowClose?: boolean;
  usiTitle: string;
  usiType?: 'success' | 'error' | 'warning' | 'info' | 'default';
  usiTimeout?: number;
}
