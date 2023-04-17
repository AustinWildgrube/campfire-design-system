import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiRadioModule } from '../../radio.module';
import { UsiRadioService } from '../../radio.service';
import { UsiRadioButtonComponent } from '../radio-button.component';
import { UsiRadioGroupComponent } from '../../radio-group/radio-group.component';

@Component({
  template: `
    <usi-radio-group>
      <label usiValue="Radio Button One" usi-radio>Radio Button</label>
    </usi-radio-group>
  `,
})
class TestComponent extends UsiRadioButtonComponent {}

describe('UsiRadioButtonComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiRadioGroupComponent, UsiRadioButtonComponent, TestComponent],
      providers: [UsiRadioService],
      imports: [UsiRadioModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    component.usiValue = 'test';
    fixture.detectChanges();
  });

  it('should create a radio button', () => {
    expect(component).toBeTruthy();
    expect(By.css('.usi-radio-button')).toBeTruthy();
  });

  it('should disable radio button', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    expect(By.css('.usi-radio-button--disabled')).toBeTruthy();
  });

  it('should error if no value is present', () => {
    component.usiValue = null;
    fixture.detectChanges();

    expect(() => component.ngOnInit()).toThrowError('UsiRadioButtonComponent: A radio button must have a value.');
  });
});
