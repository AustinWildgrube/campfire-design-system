import { Directive, ElementRef, NgModule } from '@angular/core';

/**
 * To attach our container to.
 */
@Directive({
  selector: '[notificationContainer]',
  exportAs: 'notificationContainer',
})
export class NotificationContainerDirective {
  constructor(private element: ElementRef) {}

  public getContainerElement(): HTMLElement {
    return this.element.nativeElement;
  }
}

@NgModule({
  declarations: [NotificationContainerDirective],
  exports: [NotificationContainerDirective],
})
export class NotificationContainerModule {}
