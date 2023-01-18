import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsiMultiselectComponent } from './multiselect.component';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';
import { UsiCheckboxModule } from 'usi-campfire/checkbox';

@NgModule({
  declarations: [UsiMultiselectComponent],
  imports: [CommonModule, FormsModule, UsiSharedModule, UsiUtilsModule, UsiCheckboxModule],
  exports: [UsiMultiselectComponent],
})
export class UsiMultiselectModule {}
