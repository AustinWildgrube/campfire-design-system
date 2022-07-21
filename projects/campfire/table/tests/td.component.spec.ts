import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiTdComponent } from '../td/td.component';
import { UsiTableModule } from '../table.module';

@Component({
  template: `
    <usi-table>
      <tbody>
        <tr>
          <td [usiMobileLabel]="usiMobileLabel" [usiAlign]="usiAlign"></td>
        </tr>
      </tbody>
    </usi-table>
  `,
})
export class TestComponent extends UsiTdComponent {}

describe('UsiTdComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, UsiTdComponent],
      imports: [UsiTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiTdComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create table data tag', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.className).toContain('usi-table__data');
  });

  it('should create a mobile label', () => {
    component.usiMobileLabel = 'test';
    fixture.detectChanges();

    expect(debugElement.nativeElement.querySelector('.usi-table__mobile-label')).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-table__mobile-label').textContent).toBe('test');
  });

  it('should align the label', () => {
    component.usiAlign = 'right';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-table__data--right');

    component.usiAlign = 'center';
    fixture.detectChanges();

    expect(debugElement.nativeElement.className).toContain('usi-table__data--center');
  });
});
