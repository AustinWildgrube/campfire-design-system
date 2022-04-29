import { Directive, ElementRef, NgModule } from '@angular/core';

/**
 * To attach our container to.
 */
@Directive({
  selector: '[toastContainer]',
  exportAs: 'toastContainer',
})
export class ToastContainerDirective {
  constructor(private element: ElementRef) {}

  public getContainerElement(): HTMLElement {
    return this.element.nativeElement;
  }
}

@NgModule({
  declarations: [ToastContainerDirective],
  exports: [ToastContainerDirective],
})
export class ToastContainerModule {}
