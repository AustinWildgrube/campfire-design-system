import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiTrComponent } from '../tr/tr.component';
import { UsiTableModule } from '../table.module';

@Component({
  template: `
    <usi-table>
      <tbody>
        <tr></tr>
      </tbody>
    </usi-table>
  `,
})
export class TestComponent extends UsiTrComponent {}

describe('UsiTrComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, UsiTrComponent],
      imports: [UsiTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsiTrComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create table row tag', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.className).toContain('usi-table__row');
  });
});
