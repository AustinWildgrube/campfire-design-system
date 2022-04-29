import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiFlexComponent } from './flex.component';

@NgModule({
  declarations: [UsiFlexComponent],
  exports: [UsiFlexComponent],
  imports: [CommonModule],
})
export class UsiFlexModule {}
