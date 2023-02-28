import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiUtilsModule } from 'usi-campfire/utils';
import { UsiTimePickerComponent } from './time-picker.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsiTimePickerComponent],
  imports: [CommonModule, UsiUtilsModule, ReactiveFormsModule],
  exports: [UsiTimePickerComponent],
})
export class UsiTimePickerModule {}
