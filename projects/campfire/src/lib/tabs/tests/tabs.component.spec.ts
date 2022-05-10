import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiTabsComponent } from '../tabs.component';
import { UsiTabComponent } from '../tab/tab.component';

@Component({
  template: `
    <usi-tab-group [usiDisabled]="usiDisabled" [usiGrow]="usiGrow" [usiTabPosition]="usiTabPosition" [usiGhost]="usiGhost">
      <usi-tab usiLabel="Tab 1">
        <p>Tab 1 content</p>
      </usi-tab>
      <usi-tab usiLabel="Tab 2">
        <p>Tab 2 content</p>
      </usi-tab>
      <usi-tab usiLabel="Tab 3">
        <p>Tab 3 content</p>
      </usi-tab>
    </usi-tab-group>
  `,
})
class TestComponent extends UsiTabsComponent {}

describe('UsiTabsComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTabsComponent, UsiTabComponent, TestComponent],
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

  it('should ghost the tab group', () => {
    component.usiGhost = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-tab-group--ghost')).toBeTruthy();
  });
});
