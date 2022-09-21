import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { UsiSpacing } from 'usi-campfire/utils';

@Component({
  selector: 'usi-table td',
  template: `
    <span *ngIf="usiMobileLabel !== ''" class="usi-table__mobile-label">{{ usiMobileLabel }}</span>
    <ng-content></ng-content>
  `,
  styleUrls: ['../styles/td.component.scss'],
})
export class UsiTdComponent extends UsiSpacing {
  @HostBinding('class.usi-table__data') true = true;

  @Input()
  usiMobileLabel?: string;

  @Input()
  usiAlign?: 'left' | 'center' | 'right';

  @HostBinding('class.usi-table__data--center')
  public get isCenter(): boolean {
    return this.usiAlign === 'center';
  }

  @HostBinding('class.usi-table__data--right')
  public get isRight(): boolean {
    return this.usiAlign === 'right';
  }

  constructor(private elementRef: ElementRef) {
    super(elementRef);
  }
}
