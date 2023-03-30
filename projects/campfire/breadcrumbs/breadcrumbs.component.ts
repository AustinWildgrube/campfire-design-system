import { Component, Input } from '@angular/core';

import { UsiBreadcrumbs } from 'usi-campfire/utils';

@Component({
  selector: 'usi-breadcrumbs',
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="usi-breadcrumbs">
        <li *ngFor="let breadcrumb of usiData; let i = index">
          <a
            *ngIf="breadcrumb.link"
            class="usi-breadcrumb usi-breadcrumb--link"
            [ngClass]="{ 'usi-breadcrumb--active': i === usiData.length - 1 }"
            [href]="breadcrumb.link"
            [attr.aria-current]="i === usiData.length - 1 ? 'page' : 'false'"
            target="_blank"
            rel="noreferrer noopener"
          >
            <fa-icon *ngIf="breadcrumb.icon" class="usi-breadcrumb__icon" [icon]="['fal', breadcrumb.icon]"></fa-icon>
            <span class="usi-breadcrumb__label">{{ breadcrumb.label }}</span>
          </a>

          <a
            *ngIf="breadcrumb.routerLink"
            class="usi-breadcrumb usi-breadcrumb--link"
            [ngClass]="{ 'usi-breadcrumb--active': i === usiData.length - 1 }"
            [routerLink]="breadcrumb.routerLink"
            [attr.aria-current]="i === usiData.length - 1 ? 'page' : 'false'"
          >
            <fa-icon *ngIf="breadcrumb.icon" class="usi-breadcrumb__icon" [icon]="['fal', breadcrumb.icon]"></fa-icon>
            <span class="usi-breadcrumb__label">{{ breadcrumb.label }}</span>
          </a>

          <span *ngIf="!breadcrumb.link && !breadcrumb.routerLink" class="usi-breadcrumb">
            <fa-icon *ngIf="breadcrumb.icon" class="usi-breadcrumb__icon" [icon]="['fal', breadcrumb.icon]"></fa-icon>
            <span class="usi-breadcrumb__label usi-breadcrumb__label--disabled">{{ breadcrumb.label }}</span>
          </span>

          <fa-icon *ngIf="i < usiData.length - 1 && !usiSeparator" class="usi-breadcrumb__separator" [icon]="['fas', 'chevron-right']"></fa-icon>
          <span *ngIf="i < usiData.length - 1 && usiSeparator" class="usi-breadcrumb__separator">{{ usiSeparator }}</span>
        </li>
      </ol>
    </nav>
  `,
  styleUrls: ['./styles/breadcrumbs.component.scss'],
})
export class UsiBreadcrumbsComponent {
  @Input()
  usiData: UsiBreadcrumbs[] = [];

  @Input()
  usiSeparator?: string;

  constructor() {}
}
