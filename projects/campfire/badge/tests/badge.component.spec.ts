import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiBadgeComponent } from '../badge.component';

import { UsiSharedModule } from 'usi-campfire/shared';

@Component({
  template: `<usi-badge [usiType]="usiType" [usiIcon]="usiIcon">Test Badge</usi-badge>`,
})
class TestComponent extends UsiBadgeComponent {}

describe('UsiBadgeComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiBadgeComponent, TestComponent],
      imports: [UsiSharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a badge', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-badge')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-badge').textContent).toContain('Test Badge');
  });

  it('should have the correct type styles', () => {
    component.usiType = 'success';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-badge--success')).toBeTruthy();

    component.usiType = 'warning';
    fixture.detectChanges();
    expect(debugElement.nativeElement.querySelector('.usi-badge--warning')).toBeTruthy();

    component.usiType = 'error';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-badge--error')).toBeTruthy();

    component.usiType = 'info';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-badge--info')).toBeTruthy();
  });

  it('should have a custom icon', () => {
    component.usiIcon = 'coffee';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('fa-icon')).toBeTruthy();
  });
});
