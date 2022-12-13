import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiSelectComponent } from './select.component';
import { UsiOptionComponent } from './option/option.component';
import { UsiGroupComponent } from './group/group.component';

import { UsiInputModule } from 'usi-campfire/input';
import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiUtilsModule } from 'usi-campfire/utils';
import { UsiCheckboxModule } from 'usi-campfire/checkbox';

@NgModule({
  declarations: [UsiSelectComponent, UsiOptionComponent, UsiGroupComponent],
  imports: [CommonModule, UsiSharedModule, UsiInputModule, UsiUtilsModule, UsiCheckboxModule],
  exports: [UsiSelectComponent, UsiOptionComponent, UsiGroupComponent],
})
export class UsiSelectModule {}
