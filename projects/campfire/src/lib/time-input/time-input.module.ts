import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTimeInputComponent } from './time-input.component';

@NgModule({
  declarations: [UsiTimeInputComponent],
  exports: [UsiTimeInputComponent],
  imports: [CommonModule],
})
export class UsiTimeInputModule {}
