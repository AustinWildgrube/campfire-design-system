import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';

import { UsiTableComponent } from '../table.component';
import { UsiTableService } from '../table.service';
import { UsiTableModule } from '../table.module';
import { UsiSharedModule } from '../../shared/shared.module';

@Component({
  template: `
    <usi-table [usiData]="usiData" usiPagination usiHeadless usiGhost #testData>
      <thead>
        <tr>
          <th></th>
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

  usiData: { id: number }[] = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.usiData.push({
        id: i,
      });
    }
  }
}

describe('UsiTableComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsiTableComponent, TestComponent],
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

  it('should create a usi table', () => {
    expect(component).toBeTruthy();
    expect(debugElement.nativeElement.querySelector('.usi-table')).toBeTruthy();
  });

  it('should be headless', () => {
    expect(debugElement.nativeElement.querySelector('.usi-table--headless')).toBeTruthy();
  });

  it('should ghost the table', () => {
    expect(debugElement.nativeElement.querySelector('.usi-table--ghost')).toBeTruthy();
  });

  it('should be paginated', () => {
    expect(debugElement.nativeElement.querySelector('.usi-table__pagination')).toBeTruthy();
  });

  it('should change page', () => {
    const pagination = debugElement.nativeElement.querySelectorAll('.usi-table__pagination-arrow');
    const previousPage = pagination[0];
    const nextPage = pagination[1];

    nextPage.click();
    fixture.detectChanges();

    expect(component.testData.pageData['currentPage']).toEqual(2);

    previousPage.click();
    fixture.detectChanges();

    expect(component.testData.pageData['currentPage']).toEqual(1);
  });

  it('should change page size', () => {
    const select = debugElement.nativeElement.querySelector('.usi-table__page-size');

    select.value = select.options[3].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(+component.testData.pageData['pageSize']).toBe(10);

    select.value = select.options[5].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(+component.testData.pageData['pageSize']).toBe(100);
  });

  it('should have the correct number of pages', () => {
    expect(component.testData.pageData['totalItems']).toBe(100);
    expect(component.testData.pageData['totalPages']).toBe(20);
  });
});
