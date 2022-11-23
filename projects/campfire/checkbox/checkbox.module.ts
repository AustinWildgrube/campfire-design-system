import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsiCheckboxComponent } from './checkbox.component';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiCheckboxComponent],
  imports: [CommonModule, FormsModule, UsiSharedModule, UsiUtilsModule],
  exports: [UsiCheckboxComponent],
})
export class UsiCheckboxModule {}
