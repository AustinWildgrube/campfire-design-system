import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiButtonComponent } from './button.component';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiButtonComponent],
  imports: [CommonModule, UsiUtilsModule],
  exports: [UsiButtonComponent],
})
export class UsiButtonModule {}
