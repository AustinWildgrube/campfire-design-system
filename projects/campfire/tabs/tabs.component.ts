import { AfterViewChecked, Component, ContentChildren, ElementRef, HostBinding, Input, QueryList, ViewChildren } from '@angular/core';

import { UsiTabComponent } from './tab/tab.component';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-tab-group',
  template: `
    <div
      class="usi-tab-group"
      [ngClass]="{
        'usi-tab-group--center': usiTabPosition === 'center',
        'usi-tab-group--right': usiTabPosition === 'right'
      }"
    >
      <ul class="usi-tab-group__container" [ngClass]="{ 'usi-tab-group__container--disabled': usiDisabled }" [ngStyle]="{ width: usiGrow ? '100%' : 'auto' }">
        <ng-container>
          <li
            *ngFor="let tab of tabs; let i = index"
            class="usi-tab-group__tab"
            [ngClass]="{
              'usi-tab-group__tab--active': tab.usiActive,
              'usi-tab-group__tab--disabled': tab.usiDisabled || usiDisabled,
              'usi-tab-group__tab--grow': usiGrow
            }"
            (click)="selectTab(tab, i)"
            (keydown.enter)="selectTab(tab, i)"
            [attr.tabindex]="tab.usiDisabled || usiDisabled ? -1 : 0"
            #tabWidth
          >
            {{ tab.usiLabel }}
          </li>
        </ng-container>

        <li class="usi-tab-group__line" [style.left.px]="selectedWidth[selectedTab]" [style.width.px]="selectedWidthReal[selectedTab]"></li>
      </ul>
    </div>

    <ng-content></ng-content>
  `,
  styleUrls: ['./styles/tabs.component.scss'],
})
export class UsiTabsComponent implements AfterViewChecked {
  @ContentChildren(UsiTabComponent)
  tabs: QueryList<UsiTabComponent> | undefined;

  @ViewChildren('tabWidth')
  tabWidth!: QueryList<ElementRef>;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  @Input()
  @InputBoolean()
  usiGrow?: BooleanInput;

  @Input()
  usiTabPosition?: 'left' | 'center' | 'right';

  @HostBinding('class')
  get getClasses(): any {
    return {
      ['usi-tabs']: true,
    };
  }

  selectedTab: number = 0;
  selectedWidth: number[] = [];
  selectedWidthReal: number[] = [];

  constructor() {}

  ngAfterViewChecked(): void {
    // Fixes the NG0100 error
    // setTimeout makes this asynchronous, so it is picked up on the next change detection check
    setTimeout(() => {
      this.getTabWidths();
      this.getActiveTab();
    }, 0);
  }

  /**
   * Find if there are any active tabs
   * @return
   */
  public async getActiveTab(): Promise<void> {
    let activeTabs = [];

    this.tabs?.forEach((tab: UsiTabComponent, index: number) => {
      if (tab.usiActive) {
        activeTabs.push(tab);
        this.selectTab(tab, index);
      }
    });

    // If there is no active tab set, activate the first
    if (activeTabs?.length === 0 && this.tabs) {
      this.selectTab(this.tabs.first, 0);
    }
  }

  /**
   * Get the tab's width for the colored underline
   * @return
   */
  public getTabWidths(): void {
    this.selectedWidth = [];
    this.selectedWidthReal = [];

    this.tabWidth.forEach((tabWidth: ElementRef, i: number) => {
      this.selectedWidthReal[i] = tabWidth.nativeElement.offsetWidth;

      const lineOffset = this.selectedWidthReal.reduce((a: number, b: number) => a + b, 0) - tabWidth.nativeElement.offsetWidth;
      if (lineOffset > 0) {
        this.selectedWidth[i] = this.selectedWidthReal.reduce((a: number, b: number) => a + b, 0) - tabWidth.nativeElement.offsetWidth;
      } else {
        this.selectedWidth[i] = 0;
      }
    });
  }

  /**
   * Selects the tab and then gets the new tab's width since changing the font weight changes the width
   * @param { UsiTabComponent } tab | The tab component instance that will be selected
   * @param { number } index | Since we loop through the tabs, we need to know the index
   * @return
   */
  public selectTab(tab: UsiTabComponent, index: number): void {
    if (tab && !tab.usiDisabled && !this.usiDisabled) {
      // deactivate all tabs
      this.tabs?.toArray().forEach((tab: UsiTabComponent) => (tab.usiActive = false));

      // activate the tab the user has clicked on.
      tab.usiActive = true;

      // set selectedTab property
      this.selectedTab = index;

      this.getTabWidths();
    }
  }
}
