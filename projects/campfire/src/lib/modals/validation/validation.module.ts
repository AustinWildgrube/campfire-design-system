import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastContainerDirective } from '../../notifications/toast/toast.directive';
import { Overlay } from '../../notifications/overlay/overlay';
import { ComponentPortal } from '../../notifications/portal/portal';
import { UsiValidationComponentContainer } from './validation-container.component';

@NgModule({
  imports: [CommonModule],
})
export class UsiValidationModule {
  overlayContainer?: ToastContainerDirective;

  constructor(private overlay: Overlay, private injector: Injector) {
    const overlayRef = this.overlay.create(this.overlayContainer);
    const component = new ComponentPortal(UsiValidationComponentContainer, this.injector);

    overlayRef.attach(component);
  }
}
