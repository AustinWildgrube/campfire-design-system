import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsiSwitchComponent } from './switch.component';

import { UsiSharedModule } from 'usi-campfire/shared';

@NgModule({
  declarations: [UsiSwitchComponent],
  imports: [CommonModule, FormsModule, UsiSharedModule],
  exports: [UsiSwitchComponent],
})
export class UsiSwitchModule {}
