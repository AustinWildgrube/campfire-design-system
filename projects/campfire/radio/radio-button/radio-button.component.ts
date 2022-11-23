import { ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Input, NgZone, OnInit, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';

import { UsiRadioService } from '../radio.service';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

@Component({
  selector: 'label[usi-radio]',
  template: `
    <span class="usi-radio-button">
      <input
        class="usi-radio-button__input"
        [ngClass]="{ 'usi-radio-button__input--checked': isChecked }"
        [name]="name"
        [checked]="isChecked"
        [disabled]="usiDisabled == true"
        [attr.aria-labelledby]="uid"
        type="radio"
      />
      <span [id]="uid" class="usi-radio-button__label" [ngClass]="{ 'usi-radio-button--disabled': usiDisabled }">
        <ng-content></ng-content>
      </span>
    </span>
  `,
  styleUrls: ['./styles/radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiRadioButtonComponent),
      multi: true,
    },
  ],
})
export class UsiRadioButtonComponent implements ControlValueAccessor, OnInit {
  @Input()
  usiValue: string = '';

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  @Input()
  @InputBoolean()
  usiChecked?: BooleanInput;

  private isNgModel: boolean = false;

  isChecked: boolean = false;
  name: string = '';
  uid: string = '';

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Optional() @Inject(UsiRadioService) private usiRadioService: UsiRadioService | null
  ) {
    // Generate random name so we don't have matching ids
    this.uid = UniqueId();

    if (this.usiRadioService) {
      this.usiRadioService?.setName((Math.random() + 1).toString(36).substring(7));

      this.usiRadioService.disabled.subscribe((disabled) => {
        if (disabled) {
          this.usiDisabled = disabled;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.name = (Math.random() + 1).toString(36).substring(7);
    }
  }

  ngOnInit(): void {
    if (this.usiRadioService) {
      if (this.usiChecked) {
        this.writeValue(true);
        this.usiRadioService.select(this.usiValue);
      }

      this.usiRadioService.name.subscribe((name) => {
        this.name = name;
        this.cdr.markForCheck();
      });

      this.usiRadioService.selected.subscribe((value) => {
        if (value) {
          const isChecked = this.isChecked;
          this.isChecked = this.usiValue === value;

          if (this.isNgModel && isChecked !== this.isChecked && !this.isChecked) {
            this.onChange(false);
          }

          this.cdr.markForCheck();
        }
      });
    }

    this.setupClickListener();
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { boolean } value | if the radio button is true or false
   * @return
   */
  public writeValue(value: boolean): void {
    this.isChecked = value;
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

  /**
   * Sets up a click listener on the radio button, so we can update the radio service
   * @return
   */
  private setupClickListener(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click').subscribe((event) => {
        // Prevent label click triggered twice.
        event.stopPropagation();
        event.preventDefault();

        if (this.usiDisabled || this.isChecked) {
          return;
        }

        this.ngZone.run(() => {
          this.usiRadioService?.select(this.usiValue);

          if (this.isNgModel) {
            this.isChecked = true;
            this.onChange(true);
          }

          this.cdr.markForCheck();
        });
      });
    });
  }
}
