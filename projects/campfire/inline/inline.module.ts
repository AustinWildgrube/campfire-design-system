import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiInlineComponent } from './inline.component';

import { UsiSharedModule } from 'usi-campfire/shared';

@NgModule({
  imports: [CommonModule, UsiSharedModule],
  declarations: [UsiInlineComponent],
  exports: [UsiInlineComponent],
})
export class UsiInlineModule {}
