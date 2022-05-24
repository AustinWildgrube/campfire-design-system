import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { UsiGhostComponent } from '../ghost.component';

@Component({
  template: `<usi-ghost [usiHeight]="usiHeight" [usiWidth]="usiWidth" [usiType]="usiType" [usiInline]="usiInline"></usi-ghost>`,
})
class TestComponent extends UsiGhostComponent {}

describe('GhostComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiGhostComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a ghost component', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-ghost')).toBeTruthy();
  });

  it('should create an inline ghost element', () => {
    component.usiInline = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost--inline')).toBeTruthy();
  });

  it('should support custom heights', () => {
    component.usiHeight = 100;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').style.height).toBe('100px');
  });

  it('should support custom widths', () => {
    component.usiWidth = 100;
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').style.width).toBe('100px');
  });

  it('should support different types', () => {
    component.usiType = 'rectangle';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--rectangle');

    component.usiType = 'circle';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--circle');

    component.usiType = 'text';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--text');

    component.usiType = 'h1';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--h1');

    component.usiType = 'h2';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--h2');

    component.usiType = 'h3';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--h3');

    component.usiType = 'h4';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--h4');

    component.usiType = 'h5';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--h5');

    component.usiType = 'h6';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-ghost').classList).toContain('usi-ghost--h6');
  });
});
