import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiSelectComponent } from './select.component';

import { UsiInputModule } from 'usi-campfire/input';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiSelectComponent],
  imports: [CommonModule, UsiSharedModule, UsiInputModule, UsiUtilsModule],
  exports: [UsiSelectComponent],
})
export class UsiSelectModule {}
