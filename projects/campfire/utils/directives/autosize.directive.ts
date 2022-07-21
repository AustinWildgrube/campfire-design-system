import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, Directive, DoCheck, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsiResizeService } from '../resize';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

@Directive({
  selector: 'usi-textarea[usiAutosize]',
  exportAs: 'usiAutosize',
  host: {
    // Textarea elements that have the directive applied should have a single row by default.
    // Browsers normally show two rows by default and therefore this limits the minRows binding.
    rows: '1',
    '(input)': 'noopInputHandler()',
  },
})
export class UsiAutosizeDirective implements AfterViewInit, OnDestroy, DoCheck {
  private autosize: boolean = false;
  private el: HTMLTextAreaElement = this.elementRef.nativeElement;
  private cachedLineHeight!: number;
  private previousValue!: string;
  private previousMinRows: number | undefined;
  private minRows: number | undefined;
  private maxRows: number | undefined;
  private maxHeight: number | null = null;
  private minHeight: number | null = null;
  private destroy$ = new Subject();
  private inputGap = 18;

  @Input()
  set usiAutosize(value: string | boolean | AutoSizeType) {
    const isAutoSizeType = (data: string | boolean | AutoSizeType): data is AutoSizeType =>
      typeof data !== 'string' && typeof data !== 'boolean' && (!!data.maxRows || !!data.minRows);

    if (typeof value === 'string' || value === true) {
      this.autosize = true;
    } else if (isAutoSizeType(value)) {
      this.autosize = true;
      this.minRows = value.minRows;
      this.maxRows = value.maxRows;
      this.maxHeight = this.setMaxHeight();
      this.minHeight = this.setMinHeight();
    }
  }

  constructor(private elementRef: ElementRef, private ngZone: NgZone, private platform: Platform, private resizeService: UsiResizeService) {}

  ngAfterViewInit(): void {
    if (this.autosize && this.platform.isBrowser) {
      this.resizeToFitContent();
      this.resizeService
        .subscribe()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.resizeToFitContent(true));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngDoCheck(): void {
    if (this.autosize && this.platform.isBrowser) {
      this.resizeToFitContent();
    }
  }

  /**
   * Resizes the text area to fit the content the user has typed
   * @param { boolean } force | we are able to force the textarea to grow despite min/max specifications
   * @return
   */
  public resizeToFitContent(force: boolean = false): void {
    this.cacheTextareaLineHeight();
    // If we haven't determined the line-height yet, we know we're still hidden and there's no point
    // in checking the height of the textarea.
    if (!this.cachedLineHeight) {
      return;
    }

    const textarea = this.el.querySelector('.usi-input-group__input') as HTMLTextAreaElement;
    const value = textarea.value;

    // Only resize if the value or minRows have changed since these calculations can be expensive.
    if (!force && this.minRows === this.previousMinRows && value === this.previousValue) {
      return;
    }

    const placeholderText = textarea.placeholder;

    // Reset the textarea height to auto in order to shrink back to its default size.
    // Also, temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
    // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
    // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
    // need to be removed temporarily.
    textarea.classList.add('usi-textarea-autosize-measuring');
    textarea.placeholder = '';

    let height = Math.round((textarea.scrollHeight - this.inputGap) / this.cachedLineHeight) * this.cachedLineHeight + this.inputGap;
    if (this.maxHeight !== null && height > this.maxHeight) {
      height = this.maxHeight!;
    }

    if ((this.minHeight !== null && height < this.minHeight) || value === '') {
      height = this.minHeight!;
    }

    // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
    this.el.style.height = `${height}px`;

    textarea.style.height = `${height}px`;
    textarea.classList.remove('usi-textarea-autosize-measuring');
    textarea.placeholder = placeholderText;

    // On Firefox resizing the textarea will prevent it from scrolling to the caret position.
    // We need to re-set the selection in order for it to scroll to the proper position.
    if (typeof requestAnimationFrame !== 'undefined') {
      this.ngZone.runOutsideAngular(() =>
        requestAnimationFrame(() => {
          const { selectionStart, selectionEnd } = textarea;

          // IE will throw an "Unspecified error" if we try to set the selection range after the
          // element has been removed from the DOM. Assert that the directive hasn't been destroyed
          // between the time we requested the animation frame and when it was executed.
          // Also note that we have to assert that the textarea is focused before we set the
          // selection range. Setting the selection range on a non-focused textarea will cause
          // it to receive focus on IE and Edge.
          if (!this.destroy$.isStopped && document.activeElement === textarea) {
            textarea.setSelectionRange(selectionStart, selectionEnd);
          }
        })
      );
    }

    this.previousValue = value;
    this.previousMinRows = this.minRows;
  }

  /**
   * Calculates the min-height of our textarea based on specifications and the line height
   * @returns a minimum height in px or if we cannot calculate that null
   */
  public setMinHeight(): number | null {
    const minHeight = this.minRows && this.cachedLineHeight ? this.minRows * this.cachedLineHeight + this.inputGap : null;

    if (minHeight !== null) {
      const textarea = this.el.querySelector('.usi-input-group__input') as HTMLTextAreaElement;
      textarea.style.minHeight = `${minHeight}px`;
    }

    return minHeight;
  }

  /**
   * Calculates the max-height of our textarea based on specifications and the line height
   * @returns a maximum height in px or if we cannot calculate that null
   */
  public setMaxHeight(): number | null {
    const maxHeight = this.maxRows && this.cachedLineHeight ? this.maxRows * this.cachedLineHeight + this.inputGap : null;

    if (maxHeight !== null) {
      const textarea = this.el.querySelector('.usi-input-group__input') as HTMLTextAreaElement;
      textarea.style.maxHeight = `${maxHeight}px`;
    }

    return maxHeight;
  }

  /**
   * no-op handler that ensures we're running change detection on input events.
   * @return
   */
  public noopInputHandler(): void {}

  /**
   * We need to calculate the line height of our textarea, so we know how to calculate height.
   * @private
   */
  private cacheTextareaLineHeight(): void {
    if (this.cachedLineHeight >= 0 || !this.el) {
      return;
    }

    // Height of input - padding
    this.cachedLineHeight = 38 - this.inputGap;

    // Min and max heights have to be re-calculated if the cached line height changes
    this.maxHeight = this.setMaxHeight();
    this.minHeight = this.setMinHeight();
  }
}
