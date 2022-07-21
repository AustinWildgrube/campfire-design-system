import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { UsiAutosizeDirective } from './directives/autosize.directive';

@NgModule({
  imports: [CommonModule],
  exports: [UsiAutosizeDirective, ClickOutsideDirective],
  declarations: [UsiAutosizeDirective, ClickOutsideDirective],
})
export class UsiUtilsModule {
  constructor() {}
}
