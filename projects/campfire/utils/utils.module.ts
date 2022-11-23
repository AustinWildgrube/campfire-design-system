import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { UsiAutosizeDirective } from './directives/autosize.directive';
import { UsiAutofocusDirective } from './directives/autofocus.directive';
import { UsiSpacingDirective } from './directives/spacing.directive';

@NgModule({
  imports: [CommonModule],
  exports: [UsiAutosizeDirective, ClickOutsideDirective, UsiAutofocusDirective, UsiSpacingDirective],
  declarations: [UsiAutosizeDirective, ClickOutsideDirective, UsiAutofocusDirective, UsiSpacingDirective],
})
export class UsiUtilsModule {
  constructor() {}
}
