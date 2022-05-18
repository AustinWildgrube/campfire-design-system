import { ChangeDetectorRef, Component, forwardRef, HostBinding, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UsiRadioService } from '../radio.service';
import { BooleanInput, InputBoolean } from '../../utils/convert';

@Component({
  selector: 'usi-radio-group',
  template: ` <ng-content></ng-content> `,
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
export class UsiRadioGroupComponent implements ControlValueAccessor, OnInit {
  @HostBinding('class.usi-radio-group') true = true;

  @Input()
  usiName: string | null = null;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  @Input()
  usiDirection?: 'vertical' | 'horizontal' = 'horizontal';

  @HostBinding('class.usi-radio-button--vertical')
  public get isVertical(): boolean {
    return this.usiDirection === 'vertical';
  }

  private value: any = null;

  constructor(private cdr: ChangeDetectorRef, private usiRadioService: UsiRadioService) {}

  ngOnInit(): void {
    this.usiRadioService.selected.subscribe((value) => {
      if (this.value !== value) {
        this.value = value;
        this.onChange(this.value);
      }
    });

    this.usiRadioService.touched.subscribe(() => {
      Promise.resolve().then(() => this.onTouched());
    });

    this.usiRadioService.setDisabled(this.usiDisabled);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { usiDisabled, usiName } = changes;

    if (usiDisabled) {
      this.usiRadioService.setDisabled(this.usiDisabled);
    }

    if (usiName) {
      this.usiRadioService.setName(this.usiName!);
    }
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { boolean } value | if the radio button is true or false
   * @return
   */
  public writeValue(value: boolean): void {
    this.value = value;
    this.usiRadioService.select(value);
    this.cdr.markForCheck();
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
