import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiInlineComponent } from './inline.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  imports: [CommonModule, UsiSharedModule],
  declarations: [UsiInlineComponent],
  exports: [UsiInlineComponent, UsiUtilsModule],
})
export class UsiInlineModule {}
