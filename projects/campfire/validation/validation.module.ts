import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiValidationModalComponent } from './validation.component';
import { UsiValidationComponentContainer } from './validation-container.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiButtonModule } from 'usi-campfire/button';
import { ComponentPortal, NotificationContainerDirective, Overlay, UsiNotificationService } from 'usi-campfire/notifications';

@NgModule({
  imports: [CommonModule, UsiSharedModule, UsiButtonModule],
  exports: [UsiValidationModalComponent, UsiValidationComponentContainer],
  declarations: [UsiValidationModalComponent, UsiValidationComponentContainer],
  providers: [UsiNotificationService],
})
export class UsiValidationModule {
  overlayContainer?: NotificationContainerDirective;

  constructor(private overlay: Overlay, private injector: Injector) {
    const overlayRef = this.overlay.create(this.overlayContainer);
    const component = new ComponentPortal(UsiValidationComponentContainer, this.injector);

    overlayRef.attach(component);
  }
}
