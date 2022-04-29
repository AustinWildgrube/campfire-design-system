import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiTitleComponent } from '../title.component';

@Component({
  template: ` <h1 [usiAlign]="usiAlign" [usiDisplay]="usiDisplay" usi-title>test title</h1> `,
})
class TestComponent extends UsiTitleComponent {}

describe('UsiTitlesComponent', () => {
  let component: UsiTitleComponent;
  let fixture: ComponentFixture<UsiTitleComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTitleComponent, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a title', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.innerHTML).toContain('test title');
    expect(debugElement.nativeElement.className).toBe('usi-title');
  });

  it('should set the title to display', () => {
    component.usiDisplay = true;
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-title--display');
  });

  it('should have center, right, and justify align styles', () => {
    component.usiAlign = 'center';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-title--center');

    component.usiAlign = 'right';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-title--right');

    component.usiAlign = 'justify';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-title--justify');
  });
});
