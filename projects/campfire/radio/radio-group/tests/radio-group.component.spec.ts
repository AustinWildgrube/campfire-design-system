import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiRadioGroupComponent } from '../radio-group.component';
import { UsiRadioService } from '../../radio.service';
import { UsiRadioModule } from '../../radio.module';

@Component({
  template: `
    <usi-radio-group [usiDisabled]="usiDisabled" [usiDirection]="usiDirection">
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

  it('should disable radio button', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    const radioButtons = debugElement.queryAll(By.css('.usi-radio-button--disabled'));
    expect(radioButtons.length).toBe(3);
  });

  it('should have a direction', () => {
    const radioGroup = debugElement.query(By.css('.usi-radio-group'));
    expect(radioGroup.nativeElement.classList).not.toContain('usi-radio-group--vertical');

    component.usiDirection = 'vertical';
    fixture.detectChanges();

    expect(radioGroup.nativeElement.classList).toContain('usi-radio-group--vertical');
  });
});
