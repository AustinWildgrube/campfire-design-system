import { Component, ElementRef, forwardRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, InputBoolean, UniqueId } from 'usi-campfire/utils';

export interface SelectDataInterface {
  value: string | number | any[];
  label: string;
  disabled?: boolean;
  group?: string;
}

@Component({
  selector: 'usi-select',
  template: `
    <div class="usi-select" (usiClickOutside)="showOptions = false" role="listbox" [attr.aria-expanded]="showOptions" [attr.aria-labelledby]="uid">
      <div class="usi-input-group">
        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--filled': value !== '' || hasValue,
            'usi-input-group__input--error': hasError || usiForceError
          }"
          (click)="showOptions = !showOptions"
          (keyup)="searchOptions($any($event).target.value)"
          (keyup.enter)="showOption()"
          [placeholder]="usiPlaceholder"
          [disabled]="usiDisabled == true"
          [value]="realValue ? realValue.label : ''"
          [readonly]="!usiSearchable"
          [attr.aria-labelledby]="uid"
        />

        <fa-icon
          *ngIf="showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="showOptions = false"
          [icon]="['fal', 'angle-up']"
        ></fa-icon>

        <fa-icon
          *ngIf="!showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="showOptions = true"
          [icon]="['fal', 'angle-down']"
        ></fa-icon>

        <label [id]="uid" class="usi-input-group__label">{{ usiLabel }} <span *ngIf="usiRequired">*</span></label>

        <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
          {{ usiHint }}
        </span>

        <div *ngIf="(usiError && touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
          <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
        </div>
      </div>

      <ul *ngIf="showOptions" class="usi-select__options" role="group">
        <li *ngIf="manipulatedData.size === 0" class="usi-select__no-result">{{ usiNoResultMessage }}</li>

        <ng-container *ngFor="let options of manipulatedData | keyvalue: asIsOrder">
          <li *ngIf="options.key !== undefined" class="usi-select__group-label">{{ options.key }}</li>

          <li *ngIf="manipulatedData.size > 1 && options.key === undefined" class="usi-select__group-divider"></li>

          <ng-container *ngFor="let option of options.value; let i = index">
            <li
              class="usi-select__option"
              [ngClass]="{
                'usi-select__option--active': realValue.value === option.value,
                'usi-select__option--disabled': option.disabled == true
              }"
              (click)="writeValue(option)"
              (keyup.enter)="writeValue(option)"
              (keyup.arrowUp)="moveFocus($any($event))"
              (keyup.arrowDown)="moveFocus($any($event))"
              [attr.aria-selected]="realValue.value === option.value"
              tabindex="0"
              role="option"
            >
              {{ option.label }}
            </li>
          </ng-container>
        </ng-container>
      </ul>
    </div>
  `,
  styleUrls: ['./styles/select.component.scss', '../input/styles/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsiSelectComponent),
      multi: true,
    },
  ],
})
export class UsiSelectComponent implements OnChanges, OnInit {
  @Input()
  usiLabel?: string = '';

  @Input()
  usiPlaceholder?: string = '';

  @Input()
  usiData: SelectDataInterface[] = [];

  @Input()
  usiNoResultMessage?: string = 'No Result';

  @Input()
  usiError: TemplateRef<any> | null = null;

  @Input()
  usiHint?: string;

  @Input()
  @InputBoolean()
  usiForceError?: BooleanInput;

  @Input()
  @InputBoolean()
  usiSearchable?: BooleanInput;

  @Input()
  @InputBoolean()
  usiRequired?: BooleanInput = false;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  hasError: boolean | null = false;
  touched: boolean | null = false;
  showOptions: boolean = false;
  hasValue: boolean = false;
  uid: string = '';

  realValue: SelectDataInterface = { label: '', value: '' };
  value: string | number | any[] = '';
  optionIndex: number = 0;
  numberOfOptions: number = 0;

  groupedData: Map<string, SelectDataInterface[]> = new Map();
  manipulatedData: Map<string, SelectDataInterface[]> = new Map();

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(): void {
    this.showOptions = false;
  }

  constructor(protected elementRef: ElementRef) {
    // Generate random name so we don't have matching ids
    this.uid = UniqueId();
  }

  ngOnInit(): void {
    // Group our data and then shallow copy it, so we can manipulate it
    this.groupedData = this.groupBy(this.usiData, (data) => data.group);
    this.manipulatedData = this.groupedData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { usiData } = changes;

    // If data changes, we need to re-group it
    if (usiData) {
      this.groupedData = this.groupBy(this.usiData, (data) => data.group);
      this.manipulatedData = this.groupedData;
    }
  }

  /**
   * For accessibility, we need to be able to navigate through the options with just arrow keys
   * https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
   */
  public moveFocus(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp': // this is the ascii of arrow down
        if (this.optionIndex > 0) {
          this.optionIndex--;
        }

        break;
      case 'ArrowDown': // this is the ascii of arrow up
        if (this.optionIndex < this.usiData.length - 1) {
          this.optionIndex++;
        }

        break;
    }

    const options = document.querySelectorAll<HTMLLIElement>('.usi-select__option');
    if (options[this.optionIndex]) {
      options[this.optionIndex].focus();
    }
  }

  /**
   * Since we need to set focus on the first select option we have
   * to call this function to do so.
   * @return
   */
  public showOption(): void {
    this.showOptions = true;

    setTimeout(() => {
      document.querySelectorAll<HTMLLIElement>(`.usi-select__option`)[0]?.focus();
    }, 10);
  }

  /**
   * ES6 introduced an order for map items. Since we want to preserve
   * the group order that the user specifies we can add our own ordering
   * method. This also allows us to put non-grouped items at the end of
   * the map.
   * @param { any } a | The first item to compare
   * @param { any } b | The second item to compare
   * @return { number } number | 1 if it is a group, -1 if it is not a group
   */
  public asIsOrder(a: any, b: any): number {
    if (a.key === undefined) {
      return 1;
    } else if (b.key === undefined) {
      return -1;
    }

    return 1;
  }

  /**
   * When we have a keyup event we want to search our map of data and
   * filter it.
   * @param { string } query | The value of our search
   * @return
   */
  public searchOptions(query: string): void {
    if (query !== '') {
      this.hasValue = true;
      this.manipulatedData = this.filterData(this.groupedData, this.usiSearchable == true, query, UsiSelectComponent.defaultFilter, this.value);
    } else {
      this.hasValue = false;
    }
  }

  /**
   * Method that is invoked on an update of a model
   * @return
   */
  public updateChanges(): void {
    this.onChange(this.value);
  }

  /**
   * Write form value to the DOM element (model => view)
   * @param { SelectDataInterface | string } value | the value to write
   * @param { Event } event | the event that triggered the change
   * @return
   */
  public writeValue(value: SelectDataInterface | string, event?: Event): void {
    if (value) {
      // If value is provided to us from ngModel we need to find the corresponding
      // key value pair
      if (typeof value === 'string') {
        for (let [_, values] of this.usiData.entries()) {
          if (values.value === value) {
            this.value = value;
            this.realValue = values;
          }
        }
      } else {
        if (value.disabled !== null && value.disabled !== true) {
          this.value = value.value;
          this.realValue = value;
          this.showOptions = false;
        }
      }

      this.manipulatedData = this.groupedData;
      this.updateChanges();
    }
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
   * This method groups our data based on the group attribute if it is present
   * in the data provided.
   * @param { SelectDataInterface[] } list | The list of data to group
   * @param { () => any } keyGetter | The function to get the key from the data
   * @return
   */
  private groupBy(list: SelectDataInterface[], keyGetter: (arg0: any) => any): Map<string, SelectDataInterface[]> {
    const map = new Map();
    this.numberOfOptions = list.length;

    list.forEach((item: SelectDataInterface) => {
      const key = keyGetter(item);
      const collection = map.get(key);

      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });

    return map;
  }

  /**
   * This is our default filter that sees if the value is included in
   * the label. If it is not it will trim the value from our data.
   * @param { string } value | The value of our search
   * @param { SelectDataInterface } option | A single piece of data to test our filter against
   * @return
   */
  private static defaultFilter(value: string, option: SelectDataInterface) {
    return option.label.toLowerCase().trim().includes(value.toLowerCase().trim());
  }

  /**
   * When a search is performed we can invoke this method to filter our
   * data. After filtering, we regroup our data and return it for the
   * DOM to render.
   * @param { Map<string, SelectDataInterface[]> } data | The data that we will filter through
   * @param { boolean } searchable | Whether our data is searchable or not
   * @param { string } searchValue | The value of our search
   * @param { () => boolean } filter | The filter function to use. If none is provided we use our default filter
   * @param { string | number | any[] } value | The value of our select
   * @return
   */
  private filterData(
    data: Map<string, SelectDataInterface[]>,
    searchable: boolean,
    searchValue: string,
    filter: (value: string, item: SelectDataInterface) => boolean,
    value: string | number | any[]
  ) {
    if (!searchable) {
      return data;
    }

    let result: any = [];
    for (const [_, value] of data.entries()) {
      for (let i = 0; i < value.length; i += 1) {
        if (filter(searchValue, value[i])) {
          result.push(value[i]);
        }
      }
    }

    result = this.groupBy(result, (data) => data.group);
    return result;
  }
}
