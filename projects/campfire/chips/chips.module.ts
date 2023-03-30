import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiChipGroupComponent } from './chip-group/chip-group.component';
import { UsiChipButtonComponent } from './chip-button/chip-button.component';
import { UsiButtonModule } from 'usi-campfire/button';

@NgModule({
  declarations: [UsiChipGroupComponent, UsiChipButtonComponent],
  imports: [CommonModule, UsiButtonModule],
  exports: [UsiChipGroupComponent, UsiChipButtonComponent],
})
export class UsiChipsModule {}
