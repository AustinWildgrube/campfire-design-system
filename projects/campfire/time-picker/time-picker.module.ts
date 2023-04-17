import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsiTimePickerComponent } from './time-picker.component';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiTimePickerComponent],
  imports: [CommonModule, ReactiveFormsModule, UsiUtilsModule],
  exports: [UsiTimePickerComponent],
})
export class UsiTimePickerModule {}
