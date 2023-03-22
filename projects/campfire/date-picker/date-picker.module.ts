import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsiDatePickerComponent } from './date-picker.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiDatePickerComponent],
  imports: [CommonModule, ReactiveFormsModule, UsiSharedModule, UsiUtilsModule],
  exports: [UsiDatePickerComponent],
})
export class UsiDatePickerModule {}
