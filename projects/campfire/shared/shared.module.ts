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
  faBan,
  faCalendarDay,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faCircleNotch,
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
  faMagnifyingGlass,
  faPhoneFlip,
  faQuestionCircle,
  faSortAlt,
  faSpinner,
  faTimes,
  faUser,
  faUserGear,
} from '@fortawesome/pro-light-svg-icons';

import { UsiInputHarnessComponent } from './input-harness/input-harness';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule, UsiInputHarnessComponent],
  declarations: [UsiInputHarnessComponent],
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
      faBan,
      faCalendarDay,
      faCheck,
      faCheckCircle,
      faChevronLeft,
      faChevronRight,
      faCircleNotch,
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
      faMagnifyingGlass,
      faPhoneFlip,
      faQuestionCircle,
      faSortAlt,
      faSpinner,
      faTimes,
      faUser,
      faUserGear,

      // Regular
      farAngleDown,

      // Solid
      fasChevronLeft,
      fasChevronRight
    );
  }
}
