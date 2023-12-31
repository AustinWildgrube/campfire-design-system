import { Component, HostBinding, Input } from '@angular/core';

import { IconName } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'usi-avatar',
  template: `
    <img *ngIf="usiSrc" class="usi-avatar__image" [src]="usiSrc" [alt]="usiAlt" />

    <span *ngIf="usiText && !usiSrc" class="usi-avatar__text">{{ usiText }}</span>

    <fa-icon *ngIf="usiIcon && !usiSrc && !usiText" class="usi-avatar__text" [icon]="['fal', usiIcon]"></fa-icon>

    <!-- Default -->
    <fa-icon *ngIf="!usiIcon && !usiSrc && !usiText" class="usi-avatar__text" [icon]="['fal', 'user']"></fa-icon>
  `,
  styleUrls: ['./styles/avatar.component.scss'],
})
export class UsiAvatarComponent {
  @Input()
  usiSrc?: string;

  @Input()
  usiAlt?: string;

  @Input()
  usiText?: string;

  @Input()
  usiIcon?: IconName;

  @Input()
  usiShape?: 'circle' | 'square' = 'circle';

  @HostBinding(`class.usi-avatar--square`)
  public get isSquare(): boolean {
    return this.usiShape === 'square';
  }

  @Input()
  usiSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'md';

  @HostBinding('class')
  get getClasses(): any {
    return {
      ['usi-avatar']: true,
      [`usi-avatar--${this.usiSize}`]: this.usiSize,
    };
  }

  constructor() {}
}
