import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiInputComponent } from './input.component';
import { UsiSharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsiInputComponent],
  imports: [CommonModule, UsiSharedModule],
  exports: [UsiInputComponent],
})
export class UsiInputModule {}
