import { Directive, TemplateRef } from '@angular/core';

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({
  selector: '[usi-lazy]',
  exportAs: 'UsiTabButtonComponent',
})
export class UsiTabButtonDirective {
  constructor(public template: TemplateRef<UsiTabButtonDirective>) {}
}
