import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTextareaComponent } from './textarea.component';
import { UsiAutosizeDirective } from '../utils/directives/autosize.directive';

@NgModule({
  declarations: [UsiTextareaComponent, UsiAutosizeDirective],
  imports: [CommonModule],
  exports: [UsiTextareaComponent, UsiAutosizeDirective],
})
export class UsiTextareaModule {}
