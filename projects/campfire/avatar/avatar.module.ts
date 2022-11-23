import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiAvatarComponent } from './avatar.component';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiAvatarComponent],
  imports: [CommonModule, UsiSharedModule, UsiUtilsModule],
  exports: [UsiAvatarComponent],
})
export class UsiAvatarModule {}
