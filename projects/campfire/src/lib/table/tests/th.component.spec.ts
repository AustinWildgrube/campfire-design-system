import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsiThComponent } from '../th/th.component';
import { UsiTableComponent } from '../table.component';
import { UsiTableModule } from '../table.module';
import { UsiSharedModule } from '../../shared/shared.module';
import { UsiTableService } from '../table.service';

@Component({
  template: `
    <usi-table [usiData]="usiData" usiPagination usiHeadless #testData>
      <thead>
        <tr>
          <th usiAlign="center" usiSortKey="id"></th>
          <th usiAlign="center" [usiSortFn]="sortFn" usiSortKey="idTwo"></th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let data of testData.data">
          <td></td>
        </tr>
      </tbody>
    </usi-table>
  `,
})
class TestComponent {
  @ViewChild('testData', { static: true }) testData!: UsiTableComponent;

  usiData: { id: number; idTwo: number }[] = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.usiData.push({
        id: i,
        idTwo: i,
      });
    }
  }

  public sortFn = (a: { idTwo: number }, b: { idTwo: number }): number => {
    return b.idTwo - a.idTwo;
  };
}

describe('UsiThComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTableComponent, UsiThComponent, TestComponent],
      imports: [UsiTableModule, UsiSharedModule],
      providers: [UsiTableService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create a th element', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-table__head')).toBeTruthy();
  });

  it('should align the th element', () => {
    expect(debugElement.nativeElement.querySelector('.usi-table__label--center')).toBeTruthy();
  });

  it('should sort the th element', () => {
    const sortButton = debugElement.nativeElement.querySelectorAll('.usi-table__sort')[0];
    expect(component.testData.data[0].id).toEqual(0);

    sortButton.click();
    fixture.detectChanges();

    expect(component.testData.data[0].id).toEqual(4);
  });

  it('should respect custom sort function', () => {
    const sortButton = debugElement.nativeElement.querySelectorAll('.usi-table__sort')[1];
    expect(component.testData.data[0].idTwo).toEqual(0);

    sortButton.click();
    fixture.detectChanges();

    expect(component.testData.data[0].idTwo).toEqual(4);
  });
});
