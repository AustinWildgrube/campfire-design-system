import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiModalsService } from './modals.service';

@NgModule({
  imports: [CommonModule],
  providers: [UsiModalsService],
})
export class UsiModalsModule {}
