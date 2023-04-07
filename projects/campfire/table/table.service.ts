import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Injectable()
export class UsiTableService<T> implements OnDestroy {
  data = new BehaviorSubject<T[]>([]);
  dataTwo: T[] = [];

  dataCopy = new BehaviorSubject<T[]>([]);
  dataCopyTwo: T[] = [];

  startPage: number = 0;
  endPage: number = 0;
  maxPagesBeforeCurrentPage: number = 0;
  maxPagesAfterCurrentPage: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;
  totalPages: number = 0;
  pages: number[] = [];

  unsubscribe = new Subject<boolean>();

  constructor() {
    // Subscribe to data changes
    this.data.pipe(takeUntil(this.unsubscribe)).subscribe((data: T[]) => {
      this.dataTwo = data;
    });

    // Grab the data for the clone
    this.dataCopy.pipe(takeUntil(this.unsubscribe)).subscribe((data: T[]) => {
      this.dataCopyTwo = data;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  /**
   * Public sort function that serves as a layer between the consumer and the underlying logic.
   * @param { 'asc' | 'desc' | 'unsorted' } sortMethod | Specifies which direction the data should be sorted.
   * @param { string } sortKey | Which piece of data is being sorted.
   * @param { Function } sortFunction | A custom function for sorting data.
   */
  public sortData(sortMethod: 'asc' | 'desc' | 'unsorted', sortKey: string, sortFunction?: (a: T, b: T) => number): void {
    if (sortFunction !== undefined) {
      this.data.next(this.dataTwo.sort(sortFunction));
    } else if (sortMethod === 'unsorted') {
      this.data.next(this.dataCopyTwo.slice(this.startIndex, this.endIndex + 1));
    } else {
      this.data.next(this.dataTwo.sort(this.dynamicSort(sortKey, sortMethod)));
    }
  }

  /**
   * Public pagination function that manages our data.
   * @param { number } totalItems | The length of our data.
   * @param { number } currentPage | Which page the table is currently on.
   * @param { number } pageSize | How many items is selected per page.
   * @param { number } maxPages | Todo: Not quite sure yet if we remove.
   * @return
   */
  public paginate(totalItems: number, currentPage: number, pageSize: number, maxPages: number) {
    this.totalPages = Math.ceil(totalItems / pageSize);

    // Ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > this.totalPages) {
      currentPage = this.totalPages;
    }

    if (this.totalPages <= maxPages) {
      // Total pages less than max so show all pages
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      this.maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      this.maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

      if (currentPage <= this.maxPagesBeforeCurrentPage) {
        // current page near the start
        this.startPage = 1;
        this.endPage = maxPages;
      } else if (currentPage + this.maxPagesAfterCurrentPage >= this.totalPages) {
        // current page near the end
        this.startPage = this.totalPages - maxPages + 1;
        this.endPage = this.totalPages;
      } else {
        // current page somewhere in the middle
        this.startPage = currentPage - this.maxPagesBeforeCurrentPage;
        this.endPage = currentPage + this.maxPagesAfterCurrentPage;
      }
    }

    // calculate start and end item indexes
    this.startIndex = (currentPage - 1) * pageSize;
    this.endIndex = Math.min(this.startIndex + +pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    this.pages = Array.from(Array(this.endPage + 1 - this.startPage).keys()).map((i: number) => {
      return this.startPage + i;
    });

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: this.totalPages,
      startPage: this.startPage,
      endPage: this.endPage,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      pages: this.pages,
    };
  }

  /**
   * The underlying logic to how data is sorted. This method is able to be attached onto a piece of data, so it can
   * be dynamically sorted.
   * @param { string } property | Which piece of data needs to be sorted.
   * @param { 'asc' | 'desc' | 'unsorted' } sortMethod | Specifies which direction the data should be sorted.
   * @private
   */
  private dynamicSort(property: string, sortMethod: 'asc' | 'desc'): (a: T, b: T) => number {
    let sortOrder = 1;

    if (sortMethod === 'desc') {
      sortOrder = -1;
    }

    // Return a method so we can use dot notation. For example, this.data.dynamicSort(...).
    return function (a: any, b: any) {
      if (!a[property] && !b[property]) {
        throw new Error(`UsiTables: Property ${property} does not exist in table data.`);
      }

      let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
}
