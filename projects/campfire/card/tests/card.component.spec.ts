import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { UsiCardComponent } from '../card.component';

@Component({
  template: `<usi-card><p>Test Content</p></usi-card>`,
})
class TestComponent extends UsiCardComponent {}

describe('UsiCardComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiCardComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a card', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-card')).toBeTruthy();
  });

  it('should have content inside the card', () => {
    const testContent = debugElement.nativeElement.querySelector('p');
    expect(testContent.textContent).toEqual('Test Content');
  });
});
