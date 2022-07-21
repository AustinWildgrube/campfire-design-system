import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[usiClickOutside]',
})
export class ClickOutsideDirective {
  @Output()
  usiClickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  public onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.firstOpen !== 0) {
      this.usiClickOutside.emit(event);
    }

    this.firstOpen++;
  }

  // Make sure the click is not triggered on the first open
  firstOpen = 0;

  constructor(private elementRef: ElementRef) {}
}
