import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { UsiTabButtonComponent } from '../tab-button/tab-button.component';

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

        <li class="usi-tab-group__line" [style.left.px]="selectedWidth[selectedTab]" [style.width.px]="selectedWidthReal[selectedTab]"></li>
      </ul>
    </div>

    <ng-content></ng-content>
  `,
  styleUrls: ['./styles/tab-group.component.scss'],
})
export class UsiTabGroupComponent implements AfterViewChecked {
  @ContentChildren(UsiTabButtonComponent)
  tabs: QueryList<UsiTabButtonComponent> | undefined;

  @ViewChildren('tabWidth')
  tabWidth!: QueryList<ElementRef>;

  @Output()
  usiTabChange: EventEmitter<number> = new EventEmitter<number>();

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

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.getTabWidths();
    this.getActiveTab();
    this.cdr.detectChanges();
  }

  /**
   * Find if there are any active tabs
   * @return
   */
  public async getActiveTab(): Promise<void> {
    let activeTabs = [];

    this.tabs?.forEach((tab: UsiTabButtonComponent, index: number) => {
      if (tab.usiActive) {
        activeTabs.push(tab);
        this.selectTab(tab, index);
      }
    });

    // if there is no active tab set, activate the first
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
   * @param { UsiTabButtonComponent } tab | The tab component instance that will be selected
   * @param { number } index | Since we loop through the tabs, we need to know the index
   * @return
   */
  public selectTab(tab: UsiTabButtonComponent, index: number): void {
    if (tab && !tab.usiDisabled && !this.usiDisabled) {
      // deactivate all tabs
      this.tabs?.toArray().forEach((tab: UsiTabButtonComponent) => {
        tab.usiActive = false;
        tab.setActive(false);
      });

      tab.usiActive = true;
      tab.setActive(true);

      this.selectedTab = index;
      this.getTabWidths();
      this.usiTabChange.emit(index);
    }
  }
}
