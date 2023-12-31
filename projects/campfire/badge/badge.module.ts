import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiBadgeComponent } from './badge.component';
import { UsiSharedModule } from 'usi-campfire/shared';

@NgModule({
  declarations: [UsiBadgeComponent],
  imports: [CommonModule, UsiSharedModule],
  exports: [UsiBadgeComponent],
})
export class UsiBadgeModule {}
