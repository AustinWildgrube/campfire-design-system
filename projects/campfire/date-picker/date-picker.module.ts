import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiDatePickerComponent } from './date-picker.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiDatePickerComponent],
  imports: [CommonModule, UsiSharedModule, UsiUtilsModule],
  exports: [UsiDatePickerComponent],
})
export class UsiDatePickerModule {}
