import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiNotificationService } from './notifications.service';

@NgModule({
  imports: [CommonModule],
  providers: [UsiNotificationService],
})
export class UsiNotificationsModule {}
