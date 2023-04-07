import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { UsiTabButtonComponent } from '../tab-button.component';
import { UsiTabGroupComponent } from '../../tab-group/tab-group.component';

@Component({
  template: `
    <usi-tab-group>
      <usi-tab usiLabel="Tab 1">
        <p>Tab 1 content</p>
      </usi-tab>

      <usi-tab [usiLabel]="usiLabel" [usiActive]="true" [usiDisabled]="usiDisabled">
        <p>Tab 2 content</p>
      </usi-tab>

      <usi-tab usiLabel="Tab 3">
        <p>Tab 3 content</p>
      </usi-tab>
    </usi-tab-group>
  `,
})
class TestComponent extends UsiTabButtonComponent {}

describe('UsiTabComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTabGroupComponent, UsiTabButtonComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a single tab', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-tab-group__tab')).toBeTruthy();
  });

  it('should create a tab with label', () => {
    component.usiLabel = 'Test';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-tab-group__tab')[1].textContent).toContain('Test');
  });

  it('should create a tab with an active class', fakeAsync(() => {
    expect(debugElement.nativeElement.querySelectorAll('.usi-tab-group__tab')[1].classList).toContain('usi-tab-group__tab--active');
  }));

  it('should disable a single tab', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelectorAll('.usi-tab-group__tab')[1].classList).toContain('usi-tab-group__tab--disabled');
  });
});
