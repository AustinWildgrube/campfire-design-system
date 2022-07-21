import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';

import { UsiToastService } from './toast.service';
import { UsiToastComponent } from './toast.component';
import { UsiToastComponentContainer } from './toast-container.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { NotificationContainerDirective } from 'usi-campfire/notifications';
import { ComponentPortal, notificationServiceFactory, Overlay } from 'usi-campfire/notifications';

@NgModule({
  imports: [CommonModule, UsiSharedModule],
  declarations: [UsiToastComponent, UsiToastComponentContainer],
  exports: [UsiToastComponent, UsiToastComponentContainer],
  providers: [
    {
      deps: [Overlay, Injector],
      provide: [UsiToastService],
      useFactory: notificationServiceFactory,
    },
  ],
})
export class UsiToastModule {
  overlayContainer?: NotificationContainerDirective;

  constructor(private overlay: Overlay, private injector: Injector) {
    const overlayRef = this.overlay.create(this.overlayContainer);
    const component = new ComponentPortal(UsiToastComponentContainer, this.injector);

    overlayRef.attach(component);
  }
}
