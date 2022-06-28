import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiInputModule } from '../input/input.module';
import { UsiSharedModule } from '../shared/shared.module';

import { UsiSelectComponent } from './select.component';

@NgModule({
  declarations: [UsiSelectComponent],
  imports: [CommonModule, UsiSharedModule, UsiInputModule],
  exports: [UsiSelectComponent],
})
export class UsiSelectModule {}
