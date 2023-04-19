import { Component, ElementRef, HostBinding, Input } from '@angular/core';

import { UsiTableService } from '../table.service';

@Component({
  selector: 'usi-table th',
  template: `
    <ng-content></ng-content>

    <fa-icon
      *ngIf="usiSortKey && sortMethod === 'asc'"
      class="usi-table__sort"
      [icon]="['fal', 'arrow-up']"
      (click)="sort()"
      (keyup.enter)="sort()"
      (keyup.space)="sort()"
      aria-label="Sort ascending"
      role="button"
      tabindex="0"
    ></fa-icon>

    <fa-icon
      *ngIf="usiSortKey && sortMethod === 'desc'"
      class="usi-table__sort"
      [icon]="['fal', 'arrow-down']"
      (click)="sort()"
      (keyup.enter)="sort()"
      (keyup.space)="sort()"
      aria-label="Sort descending"
      role="button"
      tabindex="0"
    ></fa-icon>

    <fa-icon
      *ngIf="usiSortKey && sortMethod === 'unsorted'"
      class="usi-table__sort"
      [icon]="['fal', 'sort-alt']"
      (click)="sort()"
      (keyup.enter)="sort()"
      (keyup.space)="sort()"
      aria-label="Sort back to original order"
      role="button"
      tabindex="0"
    ></fa-icon>
  `,
  styleUrls: ['../styles/th.component.scss'],
})
export class UsiThComponent<T = unknown> {
  @Input()
  usiSortKey?: string;

  @Input()
  usiSortFn?: (a: T, b: T) => number;

  @Input()
  usiAlign?: 'left' | 'center' | 'right';

  @HostBinding('class.usi-table__label--center')
  public get isCenter(): boolean {
    return this.usiAlign === 'center';
  }

  @HostBinding('class.usi-table__label--right')
  public get isRight(): boolean {
    return this.usiAlign === 'right';
  }

  sortMethod: 'asc' | 'desc' | 'unsorted' = 'asc';

  constructor(private elementRef: ElementRef, private usiTableService: UsiTableService<T>) {}

  /**
   * We need to determine our sort method and then use our table service to
   * actually sort the table.
   */
  public sort(): void {
    if (this.usiSortKey) {
      if (this.sortMethod === 'asc') {
        this.sortMethod = 'desc';
      } else if (this.sortMethod === 'desc') {
        this.sortMethod = 'unsorted';
      } else {
        this.sortMethod = 'asc';
      }

      this.usiTableService.sortData(this.sortMethod, this.usiSortKey, this.usiSortFn);
    }
  }
}
