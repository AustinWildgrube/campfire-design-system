import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';
import { UsiInputHarnessComponent } from 'usi-campfire/shared';

@Component({
  selector: 'usi-input',
  template: `
    <div class="usi-input-group">
      <fa-icon *ngIf="usiPrefix" class="usi-input-group__prefix" [icon]="['fal', usiPrefix]"></fa-icon>
      <fa-icon *ngIf="usiSuffix && !usiPassword" class="usi-input-group__suffix" [icon]="['fal', usiSuffix]"></fa-icon>

      <fa-icon
        *ngIf="usiPassword === true && usiType === 'password'"
        class="usi-input-group__suffix usi-input-group__suffix--password"
        (click)="revealPassword()"
        [icon]="['fal', 'eye-slash']"
      >
      </fa-icon>

      <fa-icon
        *ngIf="usiPassword && usiType !== 'password'"
        class="usi-input-group__suffix usi-input-group__suffix--password"
        (click)="revealPassword()"
        [icon]="['fal', 'eye']"
      >
      </fa-icon>

      <ng-container [ngSwitch]="usiType">
        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': isEmpty == false,
            'usi-input-group__input--prefix': usiPrefix,
            'usi-input-group__input--suffix': usiSuffix || usiPassword
          }"
          [formControl]="formControlValue"
          [placeholder]="usiPlaceholder"
          [minlength]="usiMin ? usiMin : 0"
          [maxlength]="usiMax ? usiMax : 524288"
          [attr.aria-labelledby]="uid"
          [pattern]="usiPattern ? usiPattern : ''"
          [required]="!!usiRequired"
          (input)="writeValue($any($event).target.value)"
          (blur)="checkValidations()"
          *ngSwitchCase="'text'"
          type="text"
        />

        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': isEmpty == false,
            'usi-input-group__input--prefix': usiPrefix,
            'usi-input-group__input--suffix': usiSuffix || usiPassword
          }"
          [formControl]="formControlValue"
          [placeholder]="usiPlaceholder"
          [min]="usiMin ? usiMin : 0"
          [max]="usiMax ? usiMax : 524288"
          [pattern]="usiPattern ? usiPattern : ''"
          [required]="!!usiRequired"
          [attr.aria-labelledby]="uid"
          (input)="writeValue($any($event).target.value)"
          (blur)="checkValidations()"
          *ngSwitchCase="'number'"
          type="number"
        />

        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': isEmpty == false,
            'usi-input-group__input--prefix': usiPrefix,
            'usi-input-group__input--suffix': usiSuffix || usiPassword
          }"
          [formControl]="formControlValue"
          [placeholder]="usiPlaceholder"
          [minlength]="usiMin ? usiMin : 0"
          [maxlength]="usiMax ? usiMax : 524288"
          [pattern]="usiPattern ? usiPattern : ''"
          [required]="!!usiRequired"
          [attr.aria-labelledby]="uid"
          (input)="writeValue($any($event).target.value)"
          (blur)="checkValidations()"
          *ngSwitchCase="'email'"
          type="email"
        />

        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--error': hasError || usiForceError,
            'usi-input-group__input--filled': isEmpty == false,
            'usi-input-group__input--prefix': usiPrefix,
            'usi-input-group__input--suffix': usiSuffix || usiPassword
          }"
          [formControl]="formControlValue"
          [placeholder]="usiPlaceholder"
          [minlength]="usiMin ? usiMin : 0"
          [maxlength]="usiMax ? usiMax : 524288"
          [pattern]="usiPattern ? usiPattern : ''"
          [required]="!!usiRequired"
          [attr.aria-labelledby]="uid"
          (input)="writeValue($any($event).target.value)"
          (blur)="checkValidations()"
          *ngSwitchCase="'password'"
          type="password"
        />
      </ng-container>

      <label
        [id]="uid"
        class="usi-input-group__label"
        [ngClass]="{
          'usi-input-group__label--prefix': usiPrefix,
          'usi-input-group__label--error': hasError || usiForceError
        }"
      >
        {{ usiLabel }} <span *ngIf="usiRequired">*</span>
      </label>

      <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">{{ usiHint }}</span>

      <div *ngIf="(hasError && formControlValue.touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
        <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./styles/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiInputComponent),
      multi: true,
    },
  ],
})
export class UsiInputComponent extends UsiInputHarnessComponent implements ControlValueAccessor {
  @Input()
  usiType: 'text' | 'email' | 'password' | 'number' = 'text';

  @Input()
  usiMin?: string | number;

  @Input()
  usiMax?: string | number;

  @Input()
  usiPattern?: string | RegExp;

  @Input()
  @InputBoolean()
  usiPassword?: BooleanInput;

  /**
   * Change between the two states of the input type during password input
   * @return
   */
  public revealPassword(): void {
    this.usiType === 'password' ? (this.usiType = 'text') : (this.usiType = 'password');
  }
}
