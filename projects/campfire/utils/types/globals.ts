import { IconName } from '@fortawesome/pro-light-svg-icons';

export interface UsiCalendar {
  dates: UsiDate[][];
  month: number;
  year: number;
}

export interface UsiDate {
  day: number;
  month: number;
  year: number;
  today: boolean;
  otherMonth?: boolean;
  beforeToday?: boolean;
}

export interface UsiModal {
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

export interface UsiMonth {
  dates: UsiDate[][];
  month: number;
  year: number;
}

export interface SelectData {
  value: string | number | any[];
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface UsiSnackbar {
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

export interface UsiToast {
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
