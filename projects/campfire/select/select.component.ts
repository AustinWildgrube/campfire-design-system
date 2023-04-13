import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Platform } from '@angular/cdk/platform';

import { map, merge, Observable, takeUntil } from 'rxjs';

import { UsiInputHarnessComponent } from 'usi-campfire/shared';
import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

import { UsiSelectService } from './select.service';
import { UsiOptionComponent } from './option/option.component';

@Component({
  selector: 'usi-select',
  template: `
    <div
      class="usi-select"
      (usiClickOutside)="usiSelectService.showOptions = false; usiSelectService.activeFocus = null"
      (keyup)="onKeyUp($event)"
      [attr.aria-activedescendant]="usiSelectService.activeFocus"
      [attr.aria-expanded]="usiSelectService.showOptions"
      [attr.aria-labelledby]="uid"
      aria-haspopup="listbox"
      aria-controls="listbox"
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
          [value]="labelText"
          [placeholder]="usiPlaceholder"
          [disabled]="usiDisabled"
          [readonly]="!usiSearchable"
          [attr.aria-labelledby]="uid"
        />

        <fa-icon
          *ngIf="usiSelectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="usiSelectService.showOptions = false"
          [icon]="['fal', 'angle-up']"
          aria-label="Close options"
        ></fa-icon>

        <fa-icon
          *ngIf="!usiSelectService.showOptions"
          class="usi-input-group__suffix usi-input-group__suffix--password"
          (click)="usiSelectService.showOptions = true"
          [icon]="['fal', 'angle-down']"
          aria-label="Open options"
        ></fa-icon>

        <label [id]="uid" class="usi-input-group__label">{{ usiLabel }} <span *ngIf="usiRequired">*</span></label>

        <span *ngIf="usiHint && !hasError && !usiForceError" class="usi-input-group__hint">
          {{ usiHint }}
        </span>

        <div *ngIf="(hasError && formControlValue.touched) || usiForceError" class="usi-input-group__hint usi-input-group__hint--error">
          <ng-container *ngTemplateOutlet="usiError">{{ usiError }}</ng-container>
        </div>
      </div>

      <ul *ngIf="usiSelectService.showOptions" id="listbox" class="usi-select__options" role="listbox">
        <li *ngIf="hiddenOptions === options?.length" class="usi-select__no-result">{{ usiNoResultMessage }}</li>
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
export class UsiSelectComponent<T = unknown> extends UsiInputHarnessComponent implements AfterViewInit, OnInit {
  @ContentChildren(UsiOptionComponent) options: QueryList<UsiOptionComponent> | undefined;

  @Input()
  @InputBoolean()
  usiSearchable?: BooleanInput;

  @Input()
  usiNoResultMessage?: string = 'No Results Found';

  @Output()
  usiSelectionChange: EventEmitter<string | string[]> = new EventEmitter<string | string[]>();

  searchString: string = '';
  labelText: string = '';
  activeIndex: number = 0;
  hiddenOptions: number = 0;
  searchTimeout: number | null = null;
  combinedSelections: Observable<T[]> | undefined;

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

    // Pass our form control to the service so the option component can access it
    this.usiSelectService.formControlValueCopy = this.formControlValue;
  }

  override ngAfterViewInit() {
    // Initial value
    if (this.formControlValue.value) {
      this.getLabelByValue(this.formControlValue.value);
    }

    // Subscribe to form control changes so we can get a label
    this.formControlValue.valueChanges.pipe(takeUntil(this.usiSelectService.unsubscribe)).subscribe((value: T | T[]) => {
      this.getLabelByValue(value);
      this.searchOptions('');
    });

    if (this.options) {
      // Since there can be many option components we will just combine them into one observable
      this.combinedSelections = merge(...this.options.map((option: UsiOptionComponent) => option.stateChanges.pipe(map(() => option.usiValue as T[]))));
    }

    // Only emit a change on user input
    this.combinedSelections?.pipe(takeUntil(this.usiSelectService.unsubscribe)).subscribe(() => {
      this.usiSelectionChange.emit(this.formControlValue.value);
    });
  }

  /**
   * For accessibility, we need to be able to perform certain actions based on the
   * key up event. This is based on the following example:
   * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
   * @param  { KeyboardEvent } event | our keyup event
   * @return
   */
  public onKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.usiSelectService.showOptions = false;
        this.usiSelectService.activeFocus = null;
        this.searchString = '';
        break;

      case 'Enter':
      case 'Space':
        if (this.usiSelectService.showOptions) break;
        this.usiSelectService.showOptions = true;
        break;

      case 'Home':
        this.usiSelectService.showOptions = true;
        setTimeout(() => setTimeout(() => this.options?.first.content?.nativeElement.focus()));
        break;

      case 'End':
        this.usiSelectService.showOptions = true;
        setTimeout(() => this.options?.last.content?.nativeElement.focus());
        break;

      case 'ArrowUp':
        if (this.usiSelectService.showOptions) {
          this.usiSelectService.moveFocus(event);
        } else {
          this.usiSelectService.showOptions = true;
          setTimeout(() => this.options?.first.content?.nativeElement.focus());
        }
        break;

      case 'ArrowDown':
        if (this.usiSelectService.showOptions) {
          this.usiSelectService.moveFocus(event);
        } else {
          this.usiSelectService.showOptions = true;
        }
        break;

      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          this.searchOptionsByLetter(event);
        }
        break;
    }
  }

  /**
   * Loop through our options until we find a matching value, so we can set the
   * text content as the label.
   * @param { string | string[] } value | what we are matching to the option value
   * @return
   */
  public getLabelByValue(value: T | T[]): void {
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
   * When we have a keyup event we want to search our options and filter it.
   * @param { string } query | The value of our search
   * @return
   */
  public searchOptions(query: string): void {
    // Has to be searchable
    if (!this.usiSearchable) return;

    this.options?.forEach((option: UsiOptionComponent) => {
      if (option.content?.nativeElement.textContent?.toLowerCase().includes(query.toLowerCase())) {
        option.content?.nativeElement.classList.remove('usi-select__option--hidden');
      } else {
        option.content?.nativeElement.classList.add('usi-select__option--hidden');
      }
    });

    this.hiddenOptions = document.querySelectorAll('.usi-select__option--hidden').length;
  }

  /**
   * According to W3 we need to "open the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed
   * character. If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string. If the same character is
   * typed in succession, visual focus cycles among the options starting with that character".
   * @param { KeyboardEvent } event | our keyup event
   * @private
   */
  private searchOptionsByLetter(event: KeyboardEvent): void {
    this.usiSelectService.showOptions = true;

    if (typeof this.searchTimeout === 'number') {
      window.clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = window.setTimeout(() => {
      this.searchString = '';
    }, 500);

    this.searchString += event.key;

    const letterArray = this.searchString.split('');
    const allSameLetter = letterArray.every((letter: string) => letter === letterArray[0]);

    setTimeout(() => {
      let foundOption: HTMLLIElement | undefined;
      const options = Array.from(document.querySelectorAll<HTMLLIElement>(`.usi-select__option`));

      if (!allSameLetter) {
        foundOption = options.find((option: HTMLLIElement) => option.textContent?.toLowerCase().startsWith(this.searchString.toLowerCase()));
      } else {
        const filteredOptions = options.filter((option: HTMLLIElement) => option.textContent?.toLowerCase().startsWith(this.searchString[0].toLowerCase()));
        foundOption = filteredOptions[this.activeIndex];
        if (this.activeIndex >= filteredOptions.length - 1) {
          this.activeIndex = 0;
        } else {
          this.activeIndex++;
        }
      }

      foundOption?.focus();
    });

    if (this.searchString === '') {
      this.activeIndex = 0;
    }
  }
}
