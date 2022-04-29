import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiSharedModule } from '../../shared/shared.module';
import { UsiInlineComponent } from './inline.component';

@NgModule({
  imports: [CommonModule, UsiSharedModule],
  declarations: [UsiInlineComponent],
  exports: [UsiInlineComponent],
})
export class UsiInlineModule {}
