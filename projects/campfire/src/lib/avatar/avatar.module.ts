import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiAvatarComponent } from './avatar.component';
import { UsiSharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsiAvatarComponent],
  imports: [CommonModule, UsiSharedModule],
  exports: [UsiAvatarComponent],
})
export class UsiAvatarModule {}
