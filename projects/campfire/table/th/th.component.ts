import { Component, HostBinding, Input } from '@angular/core';

import { UsiTableService } from '../table.service';

@Component({
  selector: 'usi-table th',
  template: `
    <ng-content></ng-content>

    <fa-icon *ngIf="usiSortKey && sortMethod === 'asc'" class="usi-table__sort" [icon]="['fal', 'arrow-up']" (click)="sort()"></fa-icon>
    <fa-icon *ngIf="usiSortKey && sortMethod === 'desc'" class="usi-table__sort" [icon]="['fal', 'arrow-down']" (click)="sort()"></fa-icon>
    <fa-icon *ngIf="usiSortKey && sortMethod === 'unsorted'" class="usi-table__sort" [icon]="['fal', 'sort-alt']" (click)="sort()"></fa-icon>
  `,
  styleUrls: ['../styles/th.component.scss'],
})
export class UsiThComponent {
  sortMethod: 'asc' | 'desc' | 'unsorted' = 'asc';

  // Sorting
  @Input()
  usiSortKey?: string;

  @Input()
  usiSortFn?: Function;

  // Positioning
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

  constructor(private usiTableService: UsiTableService) {}

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
