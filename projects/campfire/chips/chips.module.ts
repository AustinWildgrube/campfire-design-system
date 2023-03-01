import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiChipsComponent } from './chips.component';
import { UsiChipComponent } from './chip/chip.component';
import { UsiButtonModule } from 'usi-campfire/button';

@NgModule({
  declarations: [UsiChipsComponent, UsiChipComponent],
  imports: [CommonModule, UsiButtonModule],
  exports: [UsiChipsComponent, UsiChipComponent],
})
export class UsiChipsModule {}
