import { Injector, NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

import { UsiValidationModalComponent } from './validation.component';
import { UsiValidationComponentContainer } from './validation-container.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';
import { UsiButtonModule } from 'usi-campfire/button';
import { ComponentPortal, NotificationContainerDirective, Overlay, OverlayRef, UsiNotificationService } from 'usi-campfire/notifications';

@NgModule({
  imports: [CommonModule, A11yModule, UsiSharedModule, UsiUtilsModule, UsiButtonModule],
  exports: [UsiValidationModalComponent, UsiValidationComponentContainer],
  declarations: [UsiValidationModalComponent, UsiValidationComponentContainer],
  providers: [UsiNotificationService],
})
export class UsiValidationModule implements OnDestroy {
  overlayContainer?: NotificationContainerDirective;
  overlayRef?: OverlayRef | undefined;

  constructor(private overlay: Overlay, private injector: Injector) {
    const component = new ComponentPortal(UsiValidationComponentContainer, this.injector);
    this.overlayRef = this.overlay.create(this.overlayContainer);
    this.overlayRef.attach(component);
  }

  ngOnDestroy(): void {
    this.overlayRef?.detach();
  }
}
