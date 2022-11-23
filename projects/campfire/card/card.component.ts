import { Component } from '@angular/core';

@Component({
  selector: 'usi-card',
  template: `
    <div class="usi-card">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./styles/card.component.scss'],
})
export class UsiCardComponent {
  constructor() {}
}
