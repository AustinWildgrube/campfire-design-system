import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiCardComponent } from './card.component';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiCardComponent],
  imports: [CommonModule, UsiUtilsModule],
  exports: [UsiCardComponent],
})
export class UsiCardModule {}
