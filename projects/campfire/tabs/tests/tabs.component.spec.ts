import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiTabsComponent } from '../tabs.component';
import { UsiTabComponent } from '../tab/tab.component';
import { UsiTabDirective } from '../tab/tab.directive';

@Component({
  template: `
    <usi-tab-group [usiDisabled]="usiDisabled" [usiGrow]="usiGrow" [usiTabPosition]="usiTabPosition">
      <usi-tab usiLabel="Tab 1">
        <p>{{ getTimeLoaded(1) | date: 'medium' }}</p>
      </usi-tab>

      <usi-tab usiLabel="Tab 2">
        <p>{{ getTimeLoaded(2) | date: 'medium' }}</p>
      </usi-tab>

      <usi-tab usiLabel="Tab 3">
        <ng-template usi-lazy>
          <p>{{ getTimeLoaded(3) | date: 'medium' }}</p>
        </ng-template>
      </usi-tab>
    </usi-tab-group>
  `,
})
class TestComponent extends UsiTabsComponent {
  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
}

describe('UsiTabsComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTabsComponent, UsiTabComponent, UsiTabDirective, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a tab group', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-tabs')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-tab-group')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-tab-group__container')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-tab-group__tab')).toBeTruthy();
  });

  it('should disable the tab group', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-tab-group__container--disabled')).toBeTruthy();
  });

  it('should grow the tabs to their max width', () => {
    component.usiGrow = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-tab-group__tab--grow')).toBeTruthy();
  });

  it('should change the position of the tabs', () => {
    component.usiTabPosition = 'center';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-tab-group--center')).toBeTruthy();

    component.usiTabPosition = 'right';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-tab-group--right')).toBeTruthy();
  });

  it('should lazy load the third tab', async () => {
    const tabs = debugElement.nativeElement.querySelectorAll('.usi-tab-group__tab');
    const tabsContent = debugElement.nativeElement.querySelectorAll('.usi-tabs__content');
    const tabValue = tabsContent[0].textContent;

    await new Promise((r) => setTimeout(r, 2000));

    tabs[2].click();
    fixture.detectChanges();

    const tabThreeValue = tabsContent[2].textContent;
    expect(tabValue !== tabThreeValue).toBeTruthy();
  });

  it('should emit an event when a tab is clicked', () => {
    const spy = spyOn(component.usiTabChange, 'emit');
    const tabs = debugElement.nativeElement.querySelectorAll('.usi-tab-group__tab');

    component.selectTab(tabs[1], 1);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(1);
  });
});
