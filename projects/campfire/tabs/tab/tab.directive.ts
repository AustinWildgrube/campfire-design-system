import { Directive, TemplateRef } from '@angular/core';

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({
  selector: '[usi-lazy]',
  exportAs: 'UsiTabComponent',
})
export class UsiTabDirective {
  constructor(public template: TemplateRef<any>) {}
}
