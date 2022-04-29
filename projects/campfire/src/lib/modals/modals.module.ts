import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiSharedModule } from '../shared/shared.module';
import { UsiButtonModule } from '../button/button.module';
import { UsiNotificationService } from '../notifications/notifications.service';
import { UsiValidationComponentContainer } from './validation/validation-container.component';
import { UsiDialogComponentContainer } from './dialog/dialog-container.component';
import { UsiDialogModalComponent } from './dialog/dialog.component';
import { UsiDialogModule } from './dialog/dialog.module';
import { UsiValidationModule } from './validation/validation.module';
import { UsiValidationModalComponent } from './validation/validation.component';

@NgModule({
  imports: [CommonModule, UsiSharedModule, UsiButtonModule, UsiDialogModule, UsiValidationModule],
  exports: [UsiDialogModalComponent, UsiValidationModalComponent, UsiDialogComponentContainer, UsiValidationComponentContainer],
  declarations: [UsiDialogModalComponent, UsiValidationModalComponent, UsiDialogComponentContainer, UsiValidationComponentContainer],
  entryComponents: [UsiDialogComponentContainer, UsiValidationComponentContainer],
  providers: [UsiNotificationService],
})
export class UsiModalsModule {}
