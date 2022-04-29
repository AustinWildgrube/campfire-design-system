import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastContainerDirective } from '../../notifications/toast/toast.directive';
import { Overlay } from '../../notifications/overlay/overlay';
import { ComponentPortal } from '../../notifications/portal/portal';
import { UsiDialogComponentContainer } from './dialog-container.component';

@NgModule({
  imports: [CommonModule],
})
export class UsiDialogModule {
  overlayContainer?: ToastContainerDirective;

  constructor(private overlay: Overlay, private injector: Injector) {
    const overlayRef = this.overlay.create(this.overlayContainer);
    const component = new ComponentPortal(UsiDialogComponentContainer, this.injector);

    overlayRef.attach(component);
  }
}
