import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

import { UsiTableService } from './table.service';
import { BooleanInput, InputBoolean } from '../utils/convert';

interface Pagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

@Component({
  selector: 'usi-table',
  template: `
    <table>
      <ng-content></ng-content>
    </table>

    <div *ngIf="usiData && usiPagination" class="usi-table__pagination">
      <div>
        <span class="usi-table__page-label">Items per page:</span>

        <select class="usi-table__page-size" [(ngModel)]="usiPageSize" (ngModelChange)="setPage(pageData.currentPage)" aria-label="Select page size">
          <option value="1">1</option>
          <option value="2">2</option>

          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="100">100</option>
        </select>
      </div>

      <span class="usi-table__pagination-info"> {{ pageData.startIndex + 1 }} - {{ pageData.endIndex + 1 }} of {{ usiData.length }} </span>

      <span>
        <!--Todo change for page size-->
        <fa-icon class="usi-table__pagination-arrow" (click)="setPage(pageData.currentPage - 1)" [icon]="['fas', 'chevron-left']"></fa-icon>
        <fa-icon class="usi-table__pagination-arrow" (click)="setPage(pageData.currentPage + 1)" [icon]="['fas', 'chevron-right']"></fa-icon>
      </span>
    </div>
  `,
  styleUrls: ['./styles/table.component.scss'],
  providers: [UsiTableService],
})
export class UsiTableComponent implements AfterViewInit, OnChanges, OnInit {
  data: any;

  pageData: Pagination = {
    totalItems: 0,
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    startPage: 0,
    endPage: 0,
    startIndex: 0,
    endIndex: 0,
    pages: [],
  };

  @Input()
  @InputBoolean()
  usiHeadless?: BooleanInput;

  @Input()
  usiData?: readonly any[] = [];

  @Input()
  @InputBoolean()
  usiPagination?: BooleanInput;

  @Input()
  usiPageSize?: number = 5;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private usiTableService: UsiTableService) {}

  ngOnInit(): void {
    if (this.usiData) {
      // Subscribe to data changes
      this.usiTableService.data.subscribe((data) => {
        this.data = data;
      });

      // Make initial changes
      this.usiTableService.data.next(this.usiData);
      this.usiTableService.dataCopy.next(this.usiData);
      this.setPage(1);
    }
  }

  ngAfterViewInit(): void {
    this.addTableClasses(this.renderer, this.usiHeadless);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If data changes, update the table.
    const { usiData } = changes;

    if (usiData) {
      this.usiTableService.data.next(usiData.currentValue);
    }
  }

  /**
   * Set the pagination data.
   * @param { number } page | Which page we are switching to.
   * @return
   */
  public setPage(page: number): void {
    if (this.usiData && this.usiPageSize) {
      // Get the page data for the specific page and get items for new page
      this.pageData = this.usiTableService.paginate(this.usiData.length, page, this.usiPageSize, 55);
      let pageItems = this.usiData.slice(this.pageData.startIndex, this.pageData.endIndex + 1);

      // Make changes to our data
      this.usiTableService.data.next(pageItems);
    }
  }

  /**
   * We need to add custom classes to the table for Campfire styles.
   * @param { Renderer2 } renderer | The renderer to add classes to the table.
   * @param isHeadless | BooleanInput | Whether the table is headless.
   */
  private addTableClasses(renderer: Renderer2, isHeadless: BooleanInput): void {
    Array.prototype.forEach.call(this.elementRef.nativeElement.querySelectorAll('*'), function (node) {
      switch (node.nodeName) {
        case 'TABLE': {
          renderer.addClass(node, 'usi-table');

          if (isHeadless) {
            renderer.addClass(node, 'usi-table--headless');
          }

          break;
        }
        case 'THEAD': {
          renderer.addClass(node, 'usi-table__head');
          break;
        }
        case 'TH': {
          renderer.addClass(node, 'usi-table__label');
          break;
        }
        case 'TBODY': {
          renderer.addClass(node, 'usi-table__body');
          break;
        }
      }
    });
  }
}
