import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';

import { Overlay } from '../overlay/overlay';
import { ComponentPortal } from '../portal/portal';

import { UsiSharedModule } from '../../shared/shared.module';
import { ToastContainerDirective } from './toast.directive';
import { UsiToastComponent } from './toast.component';
import { UsiToastComponentContainer } from './toast-container.component';
import { UsiToastService } from './toast.service';

@NgModule({
  imports: [CommonModule, UsiSharedModule],
  declarations: [UsiToastComponent, UsiToastComponentContainer],
  exports: [UsiToastComponent, UsiToastComponentContainer],
  entryComponents: [UsiToastComponent, UsiToastComponentContainer],
  providers: [UsiToastService],
})
export class UsiToastModule {
  overlayContainer?: ToastContainerDirective;

  constructor(private overlay: Overlay, private injector: Injector) {
    const overlayRef = this.overlay.create(this.overlayContainer);
    const component = new ComponentPortal(UsiToastComponentContainer, this.injector);

    overlayRef.attach(component);
  }
}
