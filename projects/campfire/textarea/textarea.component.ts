import { AfterViewInit, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';
import { UsiInputHarnessComponent } from 'usi-campfire/shared';

@Component({
  selector: 'usi-textarea',
  template: `
    <div class="usi-input-group">
      <!-- Prettier is causing strange EOL behavior with the textarea -->
      <!-- prettier-ignore -->
      <textarea
        [id]="uid"
        class="usi-input-group__input"
        [ngClass]="{
          'usi-input-group__input--error': hasError || usiForceError,
          'usi-input-group__input--filled': !isEmpty,
          'usi-input-group__input--resizeable': usiResizeable
        }"
        (input)="writeValue($any($event).target.value)"
        (blur)="checkValidations()"
        [formControl]="formControlValue"
        [placeholder]="usiPlaceholder"
        [minlength]="usiMin ? usiMin : 0"
        [maxlength]="usiMax ? usiMax : 524288"
        [required]="!!usiRequired"
        [attr.minlength]="usiMin"
        [attr.maxlength]="usiMax"
        >{{ usiValue }}</textarea>

      <label
        [for]="uid"
        class="usi-input-group__label"
        [ngClass]="{
          'usi-input-group__label--error': hasError || usiForceError
        }"
      >
        {{ usiLabel }} <span *ngIf="usiRequired">*</span>
      </label>

      <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
        {{ usiHint }}
      </span>

      <div *ngIf="(hasError && formControlValue.touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
        <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./styles/textarea.component.scss', '../input/styles/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiTextareaComponent),
      multi: true,
    },
  ],
})
export class UsiTextareaComponent extends UsiInputHarnessComponent implements AfterViewInit {
  @Input()
  usiMin?: string | number = 0;

  @Input()
  usiMax?: string | number = 524_288;

  @Input()
  @InputBoolean()
  usiResizeable?: BooleanInput;
}
