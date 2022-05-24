import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiGhostComponent } from './ghost.component';

@NgModule({
  declarations: [UsiGhostComponent],
  exports: [UsiGhostComponent],
  imports: [CommonModule],
})
export class UsiGhostModule {}
