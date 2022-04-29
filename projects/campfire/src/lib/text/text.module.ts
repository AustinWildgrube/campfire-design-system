import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTextComponent } from './text.component';

@NgModule({
  declarations: [UsiTextComponent],
  exports: [UsiTextComponent],
  imports: [CommonModule],
})
export class UsiTextModule {}
