import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsiRadioButtonComponent } from './radio-button/radio-button.component';
import { UsiRadioGroupComponent } from './radio-group/radio-group.component';

@NgModule({
  declarations: [UsiRadioButtonComponent, UsiRadioGroupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UsiRadioButtonComponent, UsiRadioGroupComponent],
})
export class UsiRadioModule {}
