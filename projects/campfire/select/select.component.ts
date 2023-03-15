import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Platform } from '@angular/cdk/platform';

import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsiInputHarnessComponent } from 'usi-campfire/shared';
import { BooleanInput, InputBoolean, SelectData } from 'usi-campfire/utils';

import { UsiSelectService } from './select.service';
import { UsiOptionComponent } from './option/option.component';

@Component({
  selector: 'usi-select',
  template: `
    <div
      class="usi-select"
      (usiClickOutside)="usiSelectService.showOptions = false"
      [attr.aria-expanded]="usiSelectService.showOptions"
      [attr.aria-labelledby]="uid"
      role="listbox"
    >
      <div class="usi-input-group">
        <input
          class="usi-input-group__input"
          [ngClass]="{
            'usi-input-group__input--filled': !isEmpty,
            'usi-input-group__input--error': hasError || usiForceError
          }"
          (click)="usiSelectService.showOptions = !usiSelectService.showOptions"
          (keyup)="searchOptions($any($event).target.value)"
          (keyup.enter)="showOptionList()"
          [value]="labelText"
          [placeholder]="usiPlaceholder"
          [disabled]="usiDisabled == true"
          [readonly]="!usiSearchable"
          [attr.aria-labelledby]="uid"
        />

        <fa-icon
          *ngIf="usiSelectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="usiSelectService.showOptions = false"
          [icon]="['fal', 'angle-up']"
        ></fa-icon>

        <fa-icon
          *ngIf="!usiSelectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="usiSelectService.showOptions = true"
          [icon]="['fal', 'angle-down']"
        ></fa-icon>

        <label [id]="uid" class="usi-input-group__label">{{ usiLabel }} <span *ngIf="usiRequired">*</span></label>

        <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
          {{ usiHint }}
        </span>

        <div *ngIf="(usiError && formControlValue.touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
          <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
        </div>
      </div>

      <ul *ngIf="usiSelectService.showOptions && usiData" class="usi-select__options" role="group">
        <li *ngIf="manipulatedData.size === 0" class="usi-select__no-result">{{ usiNoResultMessage }}</li>

        <ng-container *ngFor="let options of manipulatedData | keyvalue: asIsOrder">
          <li *ngIf="options.key !== undefined" class="usi-select__group-label">{{ options.key }}</li>
          <li *ngIf="manipulatedData.size > 1 && options.key === undefined" class="usi-select__group-divider"></li>

          <ng-container *ngFor="let option of options.value; let i = index">
            <usi-option [usiValue]="option.value" [usiDisabled]="option.disabled">{{ option.label }}</usi-option>
          </ng-container>
        </ng-container>
      </ul>

      <ul *ngIf="usiSelectService.showOptions && !usiData" class="usi-select__options" role="group">
        <ng-content></ng-content>
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
    UsiSelectService,
  ],
})
export class UsiSelectComponent extends UsiInputHarnessComponent implements AfterViewInit, OnChanges, OnInit {
  @Input()
  usiData?: SelectData[] = undefined;

  @Input()
  usiNoResultMessage?: string = 'No Result';

  @Input()
  @InputBoolean()
  usiSearchable?: BooleanInput;

  @Output()
  usiSearchValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  usiSelectionChange: EventEmitter<string | string[]> = new EventEmitter<string | string[]>();

  @ContentChildren(UsiOptionComponent) private options: QueryList<UsiOptionComponent> | undefined;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(): void {
    this.usiSelectService.showOptions = false;
  }

  labelText: string = '';
  combinedSelections: Observable<string[]> | undefined;
  groupedData: Map<string, SelectData[]> = new Map();
  manipulatedData: Map<string | undefined, SelectData[]> = new Map();

  constructor(
    public usiSelectService: UsiSelectService,
    parentFormGroup: FormGroupDirective,
    cdr: ChangeDetectorRef,
    platform: Platform,
    autofillMonitor: AutofillMonitor,
    elementRef: ElementRef
  ) {
    super(parentFormGroup, cdr, platform, autofillMonitor, elementRef);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // Group our data and then shallow copy it, so we can manipulate it
    if (this.usiData) {
      this.groupedData = this.groupBy(this.usiData, (data) => data.group);
      this.manipulatedData = this.groupedData;
    }

    // Pass our form control to the service so the option component can access it
    this.usiSelectService.formControlValueCopy = this.formControlValue;
  }

  override ngAfterViewInit() {
    if (this.options) {
      // Since there can be many option components we will just combine them into one observable
      this.combinedSelections = merge<any>(...this.options.map((option: UsiOptionComponent) => option.stateChanges.pipe(map(() => option.usiValue))));
    }

    // Initial value
    if (this.formControlValue.value) {
      this.getLabelByValue(this.formControlValue.value);
    }

    // Subscribe to form control changes so we can get a label
    this.formControlValue.valueChanges.subscribe((value: string | string[]) => {
      this.getLabelByValue(value);
    });

    // Only emit a change on user input
    this.combinedSelections?.subscribe(() => {
      this.usiSelectionChange.emit(this.formControlValue.value);
    });
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    const { usiData } = changes;

    // If data changes, we need to re-group it
    if (usiData && this.usiData) {
      this.groupedData = this.groupBy(this.usiData, (data) => data.group);
      this.manipulatedData = this.groupedData;
    }
  }

  /**
   * Loop through our options until we find a matching value, so we can set the
   * text content as the label.
   * @param { string | string[] } value | what we are matching to the option value
   */
  public getLabelByValue(value: string | string[]): void {
    let hasLabel: boolean = false;
    this.options?.forEach((usiOption: UsiOptionComponent) => {
      if (value === usiOption.usiValue) {
        this.labelText = usiOption.content?.nativeElement.textContent;
        hasLabel = true;
      }
    });

    if (!hasLabel) {
      this.labelText = '';
      hasLabel = false;
    }

    this.usiValue = this.formControlValue.value;
    this.checkValidations();
    this.cdr.detectChanges();
  }

  /**
   * Since we need to set focus on the first select option we have to call this
   * function to do so.
   * @return
   */
  public showOptionList(): void {
    this.usiSelectService.showOptions = true;

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
      this.usiSearchValue.emit(query);
      this.usiValue = query;
      this.checkValidations();

      this.manipulatedData = this.filterData(
        this.groupedData,
        this.usiSearchable == true,
        query,
        UsiSelectComponent.defaultFilter,
        this.formControlValue.value
      );
    } else {
      this.manipulatedData = this.groupedData;
    }
  }

  /**
   * This method groups our data based on the group attribute if it is present
   * in the data provided.
   * @param { SelectData[] } list | The list of data to group
   * @param { () => any } keyGetter | The function to get the key from the data
   * @return
   */
  protected groupBy(list: SelectData[], keyGetter: (arg0: any) => any): Map<string, SelectData[]> {
    const map = new Map();

    list.forEach((item: SelectData) => {
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
   * @param { SelectData } option | A single piece of data to test our filter against
   * @return
   */
  private static defaultFilter(value: string, option: SelectData) {
    return option.label.toLowerCase().trim().includes(value.toLowerCase().trim());
  }

  /**
   * When a search is performed we can invoke this method to filter our
   * data. After filtering, we regroup our data and return it for the
   * DOM to render.
   * @param { Map<string, SelectData[]> } data | The data that we will filter through
   * @param { boolean } searchable | Whether our data is searchable or not
   * @param { string } searchValue | The value of our search
   * @param { () => boolean } filter | The filter function to use. If none is provided we use our default filter
   * @param { string | number | any[] } value | The value of our select
   * @return
   */
  private filterData(
    data: Map<string, SelectData[]>,
    searchable: boolean,
    searchValue: string,
    filter: (value: string, item: SelectData) => boolean,
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
