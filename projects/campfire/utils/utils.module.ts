import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { UsiAutosizeDirective } from './directives/autosize.directive';
import { UsiAutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  imports: [CommonModule],
  exports: [UsiAutosizeDirective, ClickOutsideDirective, UsiAutofocusDirective],
  declarations: [UsiAutosizeDirective, ClickOutsideDirective, UsiAutofocusDirective],
})
export class UsiUtilsModule {
  constructor() {}
}
