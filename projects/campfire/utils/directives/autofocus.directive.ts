import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';

import { BooleanInput, InputBoolean } from '../convert';

@Directive({
  selector: '[usiAutofocus]',
})
export class UsiAutofocusDirective implements AfterViewChecked {
  @Input()
  @InputBoolean()
  usiAutofocus: BooleanInput = false;

  focused: boolean = false;

  constructor(private host: ElementRef) {}

  ngAfterViewChecked() {
    if (!this.focused && this.usiAutofocus) {
      const focusableElements = UsiAutofocusDirective.getFocusableElements(this.host.nativeElement);

      if (focusableElements.length === 0) {
        this.host.nativeElement.focus();
      }

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      this.focused = true;
    }
  }

  private static find(element: any, selector: string): any[] {
    return Array.from(element.querySelectorAll(selector));
  }

  private static getFocusableElements(element: HTMLElement) {
    let focusableElements = UsiAutofocusDirective.find(
      element,
      `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`
    );

    let visibleFocusableElements = [];
    for (let focusableElement of focusableElements) {
      if (getComputedStyle(focusableElement).display != 'none' && getComputedStyle(focusableElement).visibility != 'hidden')
        visibleFocusableElements.push(focusableElement);
    }

    return visibleFocusableElements;
  }
}
