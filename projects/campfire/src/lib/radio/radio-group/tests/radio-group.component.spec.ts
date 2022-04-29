import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiRadioGroupComponent } from '../radio-group.component';
import { UsiRadioService } from '../../radio.service';
import { UsiRadioModule } from '../../radio.module';

@Component({
  template: `
    <usi-radio-group [usiName]="usiName" [usiDisabled]="usiDisabled" [usiDirection]="usiDirection" [usiGhost]="usiGhost">
      <label usiValue="one" usi-radio>One</label>
      <label usiValue="two" usi-radio>Two</label>
      <label usiValue="three" usi-radio>Three</label>
    </usi-radio-group>
  `,
})
class TestComponent extends UsiRadioGroupComponent {}

describe('UsiRadioGroupComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiRadioGroupComponent, TestComponent],
      providers: [UsiRadioService],
      imports: [UsiRadioModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a radio group', () => {
    expect(component).toBeTruthy();
    expect(By.css('.usi-radio-group')).toBeTruthy();
  });

  it('should have a name', () => {
    component.usiName = 'test';
    fixture.detectChanges();

    expect(component.usiName).toBeTruthy();
  });

  it('should ghost the radio button', () => {
    component.usiGhost = true;
    fixture.detectChanges();

    expect(component.usiGhost).toBeTruthy();
  });

  it('should disable radio button', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    expect(component.usiDisabled).toBeTruthy();
  });

  it('should have a default direction of horizontal', () => {
    expect(component.usiDirection).toBe('horizontal');

    component.usiDirection = 'vertical';
    fixture.detectChanges();

    expect(component.usiDirection).toBe('vertical');
  });
});
