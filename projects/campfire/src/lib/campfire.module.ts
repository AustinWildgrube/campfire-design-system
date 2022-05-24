import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UsiAvatarModule } from './avatar/avatar.module';
import { UsiButtonModule } from './button/button.module';
import { UsiCheckboxModule } from './checkbox/checkbox.module';
import { UsiFlexModule } from './flex/flex.module';
import { UsiGhostModule } from './ghost/ghost.module';
import { UsiInputModule } from './input/input.module';
import { UsiNotificationsModule } from './notifications/notifications.module';
import { UsiRadioModule } from './radio/radio.module';
import { UsiTableModule } from './table/table.module';
import { UsiTabsModule } from './tabs/tabs.module';
import { UsiTextModule } from './text/text.module';
import { UsiTimeInputModule } from './time-input/time-input.module';
import { UsiTitleModule } from './title/title.module';

import { UsiNotificationService } from './notifications/notifications.service';
import { UsiTableService } from './table/table.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,

    UsiAvatarModule,
    UsiButtonModule,
    UsiCheckboxModule,
    UsiFlexModule,
    UsiGhostModule,
    UsiInputModule,
    UsiNotificationsModule,
    UsiRadioModule,
    UsiTableModule,
    UsiTabsModule,
    UsiTextModule,
    UsiTimeInputModule,
    UsiTitleModule,
  ],
  exports: [
    UsiAvatarModule,
    UsiButtonModule,
    UsiCheckboxModule,
    UsiFlexModule,
    UsiGhostModule,
    UsiInputModule,
    UsiNotificationsModule,
    UsiRadioModule,
    UsiTableModule,
    UsiTabsModule,
    UsiTextModule,
    UsiTimeInputModule,
    UsiTitleModule,
  ],
  providers: [UsiNotificationService, UsiTableService],
})
export class CampfireModule {}
