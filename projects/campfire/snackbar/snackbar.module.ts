import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiSnackbarService } from './snackbar.service';
import { UsiSnackbarComponent } from './snackbar.component';
import { UsiSnackbarComponentContainer } from './snackbar-container.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { ComponentPortal, NotificationContainerDirective, notificationServiceFactory, Overlay } from 'usi-campfire/notifications';

@NgModule({
  imports: [CommonModule, UsiSharedModule],
  declarations: [UsiSnackbarComponent, UsiSnackbarComponentContainer],
  exports: [UsiSnackbarComponent, UsiSnackbarComponentContainer],
  providers: [
    {
      deps: [Overlay, Injector],
      provide: [UsiSnackbarService],
      useFactory: notificationServiceFactory,
    },
  ],
})
export class UsiSnackbarModule {
  overlayContainer?: NotificationContainerDirective;

  constructor(private overlay: Overlay, private injector: Injector) {
    const overlayRef = this.overlay.create(this.overlayContainer);
    const component = new ComponentPortal(UsiSnackbarComponentContainer, this.injector);

    overlayRef.attach(component);
  }
}
