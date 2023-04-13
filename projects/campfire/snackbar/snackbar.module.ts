import { Injector, NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiSnackbarService } from './snackbar.service';
import { UsiSnackbarComponent } from './snackbar.component';
import { UsiSnackbarComponentContainer } from './snackbar-container.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { ComponentPortal, NotificationContainerDirective, notificationServiceFactory, Overlay, OverlayRef } from 'usi-campfire/notifications';

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
export class UsiSnackbarModule implements OnDestroy {
  overlayContainer?: NotificationContainerDirective;
  overlayRef?: OverlayRef | undefined;

  constructor(private overlay: Overlay, private injector: Injector) {
    const component = new ComponentPortal(UsiSnackbarComponentContainer, this.injector);
    this.overlayRef = this.overlay.create(this.overlayContainer);
    this.overlayRef.attach(component);
  }

  ngOnDestroy(): void {
    this.overlayRef?.detach();
  }
}
