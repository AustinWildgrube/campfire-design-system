import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Overlay } from '../overlay/overlay';
import { ComponentPortal } from '../portal/portal';

import { UsiSharedModule } from '../../shared/shared.module';
import { ToastContainerDirective } from '../toast/toast.directive';

import { UsiSnackbarComponent } from './snackbar.component';
import { UsiSnackbarComponentContainer } from './snackbar-container.component';
import { UsiSnackbarService } from './snackbar.service';

@NgModule({
  imports: [CommonModule, UsiSharedModule],
  declarations: [UsiSnackbarComponent, UsiSnackbarComponentContainer],
  exports: [UsiSnackbarComponent, UsiSnackbarComponentContainer],
  entryComponents: [UsiSnackbarComponent, UsiSnackbarComponentContainer],
  providers: [UsiSnackbarService],
})
export class UsiSnackbarModule {
  overlayContainer?: ToastContainerDirective;

  constructor(private overlay: Overlay, private injector: Injector) {
    const overlayRef = this.overlay.create(this.overlayContainer);
    const component = new ComponentPortal(UsiSnackbarComponentContainer, this.injector);

    overlayRef.attach(component);
  }
}
