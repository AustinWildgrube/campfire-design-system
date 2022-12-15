import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiStatusComponent } from '../status.component';

@Component({
  template: `<usi-status [usiColor]="usiColor">Test Status</usi-status>`,
})
class TestComponent extends UsiStatusComponent {}

describe('UsiStatusComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiStatusComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a status', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-status')).toBeTruthy();
  });

  it('should have the correct color', () => {
    component.usiColor = 'pink';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-status__circle').style.backgroundColor).toBe('pink');
  });

  it('should have the correct text', () => {
    expect(debugElement.nativeElement.querySelector('.usi-status').textContent).toContain('Test Status');
  });
});
