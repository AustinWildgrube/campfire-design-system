import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { UsiRadioService } from '../radio.service';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

@Component({
  selector: 'usi-radio-group',
  template: `
    <ul
      class="usi-radio-group"
      [ngClass]="{ 'usi-radio-group--vertical': usiDirection === 'vertical' }"
      [attr.aria-activedescendant]="usiRadioService.radioButtonArray[usiRadioService.activeButton].id"
      role="radiogroup"
    >
      <ng-content></ng-content>
    </ul>
  `,
  styleUrls: ['./styles/radio-group.component.scss'],
  providers: [
    UsiRadioService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiRadioGroupComponent),
      multi: true,
    },
  ],
})
export class UsiRadioGroupComponent<T = unknown> implements ControlValueAccessor, OnInit, OnChanges {
  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  @Input()
  usiDirection?: 'vertical' | 'horizontal' = 'horizontal';

  @Input()
  usiName?: string;

  constructor(public usiRadioService: UsiRadioService<T>) {}

  ngOnInit(): void {
    if (this.usiDisabled) {
      this.usiRadioService.disabled.next(!!this.usiDisabled);
    }

    if (this.usiName) {
      this.usiRadioService.name.next(this.usiName);
    } else {
      this.usiRadioService.name.next(UniqueId());
    }

    this.usiRadioService.selected.pipe(takeUntil(this.usiRadioService.unsubscribe)).subscribe((value: T) => {
      this.onChange(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { usiDisabled } = changes;

    if (usiDisabled) {
      this.usiRadioService.disabled.next(!!usiDisabled.currentValue);
    }
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { boolean } value | The value of the radio button
   * @return
   */
  public writeValue(value: T): void {
    this.usiRadioService.selected.next(value);
  }

  /**
   * We need to register an onChange function since we need to overwrite the Angular onChange function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * As with the registerOnChange function we also need to register an onTouched function
   * @param { () => any } fn | The function to overwrite with
   * @return
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @param { any } _ | Unused
   * @return
   */
  public onChange: (_: any) => void = (_: any) => {};

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @return
   */
  public onTouched: () => void = () => {};
}
