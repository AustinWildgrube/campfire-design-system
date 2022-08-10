import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faAngleDown as farAngleDown } from '@fortawesome/pro-regular-svg-icons';
import { faChevronLeft as fasChevronLeft, faChevronRight as fasChevronRight } from '@fortawesome/pro-solid-svg-icons';
import {
  faAngleDown,
  faAngleRight,
  faAngleUp,
  faArrowDown,
  faArrowLeftLong,
  faArrowRightFromBracket,
  faArrowUp,
  faCalendarDay,
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
  faGear,
  faGlobe,
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
      faAngleDown,
      faAngleRight,
      faAngleUp,
      faArrowDown,
      faArrowLeftLong,
      faArrowRightFromBracket,
      faArrowUp,
      faCalendarDay,
      faCheck,
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
      faGear,
      faGlobe,
      faInfoCircle,
      faQuestionCircle,
      faSortAlt,
      faTimes,
      faUser,

      // Regular
      farAngleDown,

      // Solid
      fasChevronLeft,
      fasChevronRight
    );
  }
}
