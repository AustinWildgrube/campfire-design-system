import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsiCheckboxComponent } from './checkbox.component';
import { UsiSharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsiCheckboxComponent],
  imports: [CommonModule, FormsModule, UsiSharedModule],
  exports: [UsiCheckboxComponent],
})
export class UsiCheckboxModule {}
