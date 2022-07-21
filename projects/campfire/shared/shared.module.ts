import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
  declarations: [],
})
export class UsiSharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fal, fas);
  }
}
