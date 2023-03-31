import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UsiChipsService } from '../chips.service';
import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-chip-group',
  template: `
    <ul class="usi-chip-group">
      <ng-content></ng-content>
    </ul>
  `,
  styleUrls: ['./styles/chip-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiChipGroupComponent),
      multi: true,
    },
  ],
})
export class UsiChipGroupComponent<T = unknown> implements ControlValueAccessor, OnInit {
  @Input()
  usiSelected?: T | T[];

  @Output()
  usiSelectedChange: EventEmitter<T | T[]> = new EventEmitter<T | T[]>();

  @Input()
  @InputBoolean()
  usiMultiple?: BooleanInput;

  @Input()
  @InputBoolean()
  usiUnselectable?: BooleanInput;

  value: T | T[] | null = null;

  constructor(private usiChipService: UsiChipsService<T>) {}

  ngOnInit(): void {
    if (this.usiMultiple) {
      this.usiChipService.isMultiple.next(true);
    }

    if (this.usiUnselectable) {
      this.usiChipService.isUnselectable.next(true);
    }

    if (this.usiSelected) {
      if (Array.isArray(this.usiSelected)) {
        for (let i = 0; i < this.usiSelected.length; i++) {
          this.usiChipService.select(this.usiSelected[i]);
        }
      } else {
        this.usiChipService.select(this.usiSelected);
      }
    }

    this.usiChipService.selected.subscribe((value: T[]) => {
      this.writeValue(value);
    });
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { any } value | the value to write
   * @return
   */
  public writeValue(value: T[]): void {
    this.value = value;
    this.onChange(this.value);
    this.usiSelectedChange.emit(this.value);
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
