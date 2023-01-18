import { Injectable } from '@angular/core';

import { SelectData } from 'usi-campfire/utils';

@Injectable({
  providedIn: 'root',
})
export class UsiSelectService {
  public value: any[] = [];
  public valueObject: SelectData[] = [];
  public multiSelectBadges: SelectData[] = [];
  public showOptions: boolean = false;
  public showSelectedOnly: boolean = false;

  // public inputWidth: number = 0;
  // public badgeContainerWidth: number = 0;
  // public showMore: boolean = false;

  private optionIndex: number = 0;

  constructor() {}

  /**
   * For accessibility, we need to be able to navigate through the options with just arrow keys
   * https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
   * @param { KeyboardEvent } event | The keyboard event
   * @return
   */
  public moveFocus(event: KeyboardEvent): void {
    const options = document.querySelectorAll<HTMLLIElement>('.usi-select__option');

    switch (event.key) {
      case 'ArrowUp':
        if (this.optionIndex > 0) {
          this.optionIndex--;
        }

        break;
      case 'ArrowDown':
        if (this.optionIndex < options.length - 1) {
          this.optionIndex++;
        }

        break;
    }

    if (options[this.optionIndex]) {
      options[this.optionIndex].focus();
    }
  }

  /**
   * Clear all the selected values by emptying the value array
   * @return
   */
  public clearAll(): void {
    this.value = [];
    this.valueObject = [];
    this.multiSelectBadges = [];
  }

  // /**
  //  * Determines if adding the badge will cause the badges to overflow
  //  * @param { SelectData } value | The value to add
  //  * @param { boolean } remove | Whether we are removing a badge
  //  */
  // public checkOverflow(value: SelectData, remove: boolean): void {
  //   if (remove) {
  //     this.badgeContainerWidth -= this.getTextWidth(value.label, '12px Open Sans') + 39;
  //     this.badgeContainerWidth = 0;
  //     this.multiSelectBadges = [];
  //
  //     for (let i = 0; i < this.value.length; i++) {
  //       this.checkOverflow(this.value[i], false);
  //       this.multiSelectBadges.push(this.valueObject[i]);
  //     }
  //
  //     this.showMore = this.badgeContainerWidth > this.inputWidth;
  //   } else {
  //     this.badgeContainerWidth += this.getTextWidth(value.label, '12px Open Sans') + 39;
  //
  //     if (this.badgeContainerWidth > this.inputWidth) {
  //       this.multiSelectBadges.pop();
  //       this.showMore = true;
  //     } else {
  //       this.showMore = false;
  //     }
  //   }
  // }

  // /**
  //  * Get the width of text to determine if it will overflow
  //  * @param { string } text | The text to get the width of
  //  * @param { string } font | The font to use
  //  * @private { number } | The width of the text
  //  */
  // private getTextWidth(text: string, font: string): number {
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');
  //
  //   context!.font = font || getComputedStyle(document.body).font;
  //
  //   return context!.measureText(text).width;
  // }

  /**
   * Method that is invoked on an update of a model
   * @return
   */
  public updateChanges(): void {
    this.onChange(this.value);
  }

  /**
   * This function is left empty to satisfy the ControlValueAccessor interface
   * @param { any } _ | Unused
   * @return
   */
  public onChange: (_: any) => void = (_: any) => {};
}
