import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UsiTabButtonDirective } from './tab-button.directive';
import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

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
  styleUrls: ['./styles/tab-button.component.scss'],
})
export class UsiTabButtonComponent implements AfterContentInit {
  @Input()
  usiLabel: string = '';

  @Input()
  @InputBoolean()
  usiActive?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  @ContentChildren(UsiTabButtonDirective)
  templates: QueryList<UsiTabButtonDirective> | undefined;

  contentTemplate: TemplateRef<UsiTabButtonDirective> | undefined;

  private shouldHideTab = new BehaviorSubject<boolean>(false);

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    if (this.templates) {
      this.templates.forEach((item: UsiTabButtonDirective) => {
        this.contentTemplate = item.template;
      });
    }

    this.setActive(this.usiActive);
  }

  /**
   * Here we update the active tab and then detect changes to keep the NG0100 error from logging
   * @param { BooleanInput } active | whether the current tab is active
   */
  public setActive(active: BooleanInput): void {
    this.usiActive = active;
    this.shouldHideTab.next(!active);
    this.cdr.detectChanges();
  }

  /**
   * We need a function that checks our observable and returns the value to our HTML
   * @return { Observable<boolean> } the value of our shouldHideTab behavior subject
   */
  public shouldHide(): Observable<boolean> {
    return this.shouldHideTab.asObservable();
  }
}
