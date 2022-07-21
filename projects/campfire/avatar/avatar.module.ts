import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiAvatarComponent } from './avatar.component';
import { UsiSharedModule } from 'usi-campfire/shared';

@NgModule({
  declarations: [UsiAvatarComponent],
  imports: [CommonModule, UsiSharedModule],
  exports: [UsiAvatarComponent],
})
export class UsiAvatarModule {}
