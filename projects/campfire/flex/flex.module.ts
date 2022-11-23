import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiFlexComponent } from './flex.component';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiFlexComponent],
  exports: [UsiFlexComponent],
  imports: [CommonModule, UsiUtilsModule],
})
export class UsiFlexModule {}
