import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiGhostComponent } from './ghost.component';
import { UsiUtilsModule } from 'usi-campfire/utils';

@NgModule({
  declarations: [UsiGhostComponent],
  imports: [CommonModule, UsiUtilsModule],
  exports: [UsiGhostComponent],
})
export class UsiGhostModule {}
