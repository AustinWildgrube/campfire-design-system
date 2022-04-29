import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTitleComponent } from './title.component';

@NgModule({
  declarations: [UsiTitleComponent],
  exports: [UsiTitleComponent],
  imports: [CommonModule],
})
export class UsiTitleModule {}
