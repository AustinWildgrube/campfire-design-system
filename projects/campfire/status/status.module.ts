import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiStatusComponent } from 'usi-campfire/status/status.component';

@NgModule({
  declarations: [UsiStatusComponent],
  imports: [CommonModule],
  exports: [UsiStatusComponent],
})
export class UsiStatusModule {}
