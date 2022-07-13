import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTimePickerComponent } from './time-picker.component';

@NgModule({
  declarations: [UsiTimePickerComponent],
  exports: [UsiTimePickerComponent],
  imports: [CommonModule],
})
export class UsiTimePickerModule {}
