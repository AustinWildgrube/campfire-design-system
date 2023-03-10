import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';
import { UsiSelectModule } from 'usi-campfire/select';
import { UsiCheckboxModule } from 'usi-campfire/checkbox';

import { UsiMultiselectComponent } from './multiselect.component';

@NgModule({
  declarations: [UsiMultiselectComponent],
  imports: [CommonModule, ReactiveFormsModule, UsiSharedModule, UsiUtilsModule, UsiSelectModule, UsiCheckboxModule],
  exports: [UsiMultiselectComponent],
})
export class UsiMultiselectModule {}
