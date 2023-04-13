import { Injector, NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

import { UsiDialogModalComponent } from './dialog.component';
import { UsiDialogComponentContainer } from './dialog-container.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiButtonModule } from 'usi-campfire/button';
import { UsiUtilsModule } from 'usi-campfire/utils';
import { ComponentPortal, NotificationContainerDirective, Overlay, OverlayRef, UsiNotificationService } from 'usi-campfire/notifications';

@NgModule({
  declarations: [UsiDialogModalComponent, UsiDialogComponentContainer],
  imports: [CommonModule, A11yModule, UsiSharedModule, UsiUtilsModule, UsiButtonModule],
  exports: [UsiDialogModalComponent, UsiDialogComponentContainer],
  providers: [UsiNotificationService],
})
export class UsiDialogModule implements OnDestroy {
  overlayContainer?: NotificationContainerDirective;
  overlayRef?: OverlayRef | undefined;

  constructor(private overlay: Overlay, private injector: Injector) {
    const component = new ComponentPortal(UsiDialogComponentContainer, this.injector);
    this.overlayRef = this.overlay.create(this.overlayContainer);
    this.overlayRef.attach(component);
  }

  ngOnDestroy(): void {
    this.overlayRef?.detach();
  }
}
