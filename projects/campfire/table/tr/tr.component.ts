import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'usi-table tr',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['../styles/th.component.scss'],
})
export class UsiTrComponent {
  @HostBinding('class.usi-table__row') true = true;
}
