import { Injectable } from '@angular/core';

import { SelectDataInterface } from './select.component';

@Injectable({
  providedIn: 'root',
})
export class UsiSelectService {
  public realValue: SelectDataInterface = { label: '', value: '' };
  public value: string | number | any[] = '';
  public showOptions: boolean = false;

  private optionIndex: number = 0;

  constructor() {}

  /**
   * For accessibility, we need to be able to navigate through the options with just arrow keys
   * https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
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
