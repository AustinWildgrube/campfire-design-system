import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

// TODO: reimplement or remove
// import { SelectData } from 'usi-campfire/utils';

@Injectable({
  providedIn: 'root',
})
export class UsiSelectService {
  public showOptions: boolean = false;
  public showSelectedOnly: boolean = false;
  public formControlValueCopy: FormControl = new FormControl();

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
   * The chosen values are an array of objects, so we're searching the object to
   * see if the value is included.
   * @return { boolean } | true if value is in the array
   */
  public isValueIncluded(value: string): boolean {
    if (this.formControlValueCopy.value) {
      return this.formControlValueCopy.value.indexOf(value) > -1;
    }

    return false;
  }
}
