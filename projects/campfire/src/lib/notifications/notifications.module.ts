import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Overlay } from './overlay/overlay';
import { notificationServiceFactory, UsiNotificationService } from './notifications.service';

import { UsiToastService } from './toast/toast.service';
import { UsiSharedModule } from '../shared/shared.module';
import { UsiToastModule } from './toast/toast.module';
import { UsiSnackbarModule } from './snackbar/snackbar.module';
import { UsiInlineModule } from './inline/inline.module';
import { UsiSnackbarService } from './snackbar/snackbar.service';
import { UsiInlineComponent } from './inline/inline.component';
import { UsiToastComponentContainer } from './toast/toast-container.component';
import { UsiSnackbarComponentContainer } from './snackbar/snackbar-container.component';

export let providers = [
  {
    deps: [Overlay, Injector],
    provide: [UsiToastService, UsiSnackbarService],
    useFactory: notificationServiceFactory,
  },
];

@NgModule({
  imports: [CommonModule, UsiSharedModule, UsiToastModule, UsiSnackbarModule, UsiInlineModule],
  exports: [UsiInlineComponent, UsiSnackbarComponentContainer, UsiToastComponentContainer],
  providers: providers,
})

// Todo: check
export class UsiNotificationsModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: UsiNotificationsModule,
      providers: providers,
    };
  }
}
