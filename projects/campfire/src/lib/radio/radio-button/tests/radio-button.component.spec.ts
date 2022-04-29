import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsiRadioButtonComponent } from '../radio-button.component';
import { UsiRadioService } from '../../radio.service';
import { UsiRadioModule } from '../../radio.module';

@Component({
  template: ` <label usi-radio ngModel>Radio Button</label> `,
})
class TestComponent extends UsiRadioButtonComponent {}

describe('UsiRadioButtonComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiRadioButtonComponent, TestComponent],
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

  it('should create a radio button', () => {
    expect(component).toBeTruthy();
    expect(By.css('.usi-radio-button')).toBeTruthy();
  });

  it('should disable radio button', () => {
    component.usiDisabled = true;
    fixture.detectChanges();

    expect(component.usiDisabled).toBeTruthy();
  });

  it('should ghost the radio button', () => {
    component.usiGhost = true;
    fixture.detectChanges();

    expect(component.usiGhost).toBeTruthy();
  });

  it('should have a value', () => {
    component.usiValue = 'test';
    fixture.detectChanges();

    expect(component.usiValue).toBe('test');
  });
});
