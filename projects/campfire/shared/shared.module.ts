import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import { faCaretDown, faChevronLeft as fasChevronLeft, faChevronRight as fasChevronRight } from '@fortawesome/pro-solid-svg-icons';
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faCalendarDay,
  faCheckCircle,
  faCoffee,
  faExclamationCircle,
  faExclamationTriangle,
  faEye,
  faEyeSlash,
  faFilePdf,
  faFileWord,
  faFrown,
  faInfoCircle,
  faQuestionCircle,
  faSortAlt,
  faTimes,
  faUser,
} from '@fortawesome/pro-light-svg-icons';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
  declarations: [],
})
export class UsiSharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      // Light & Regular
      faAngleDown,
      faAngleUp,
      faArrowDown,
      faArrowUp,
      faCalendarDay,
      faCaretDown,
      faCheckCircle,
      faChevronLeft,
      faChevronRight,
      faCoffee,
      faExclamationCircle,
      faExclamationTriangle,
      faEye,
      faEyeSlash,
      faFilePdf,
      faFileWord,
      faFrown,
      faInfoCircle,
      faQuestionCircle,
      faSortAlt,
      faTimes,
      faUser,

      // Solid
      fasChevronLeft,
      fasChevronRight
    );
  }
}
