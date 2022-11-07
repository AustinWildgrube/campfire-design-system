import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiDialogModalComponent } from './dialog.component';
import { UsiDialogComponentContainer } from './dialog-container.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiButtonModule } from 'usi-campfire/button';
import { UsiUtilsModule } from 'usi-campfire/utils';
import { ComponentPortal, NotificationContainerDirective, Overlay, UsiNotificationService } from 'usi-campfire/notifications';

@NgModule({
  declarations: [UsiDialogModalComponent, UsiDialogComponentContainer],
  imports: [CommonModule, UsiSharedModule, UsiUtilsModule, UsiButtonModule],
  exports: [UsiDialogModalComponent, UsiDialogComponentContainer],
  providers: [UsiNotificationService],
})
export class UsiDialogModule {
  overlayContainer?: NotificationContainerDirective;

  constructor(private overlay: Overlay, private injector: Injector) {
    const overlayRef = this.overlay.create(this.overlayContainer);
    const component = new ComponentPortal(UsiDialogComponentContainer, this.injector);

    overlayRef.attach(component);
  }
}
