import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';
import { UsiTabDirective } from './tab.directive';

@Component({
  selector: 'usi-tab',
  template: `
    <div class="usi-tabs__content" [hidden]="shouldHide() | async">
      <ng-content></ng-content>

      <ng-container *ngIf="contentTemplate && usiActive">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </ng-container>
    </div>
  `,
  styleUrls: ['../styles/tab.component.scss'],
})
export class UsiTabComponent implements AfterContentInit {
  @Input()
  usiLabel: string = '';

  @Input()
  @InputBoolean()
  usiActive?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  @ContentChildren(UsiTabDirective)
  templates: QueryList<any> | undefined;

  contentTemplate: TemplateRef<any> | undefined;
  private shouldHideSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngAfterContentInit() {
    if (this.templates) {
      this.templates.forEach((item) => {
        this.contentTemplate = item.template;
      });
    }

    setTimeout(() => {
      this.shouldHideSubject.next(!this.usiActive);
    }, 0);
  }

  public shouldHide(): Observable<boolean> {
    return this.shouldHideSubject.asObservable();
  }
}
