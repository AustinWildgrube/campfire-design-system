import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UsiMobileMenuComponent } from './mobile-menu.component';

import { UsiSharedModule } from 'usi-campfire/shared';
import { UsiRadioModule } from 'usi-campfire/radio';
import { UsiSwitchModule } from 'usi-campfire/switch';

@NgModule({
  declarations: [UsiMobileMenuComponent],
  imports: [CommonModule, RouterModule, FormsModule, UsiSharedModule, UsiRadioModule, UsiSwitchModule],
  exports: [UsiMobileMenuComponent],
})
export class UsiMobileMenuModule {}
