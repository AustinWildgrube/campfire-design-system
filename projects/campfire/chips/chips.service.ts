import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsiChipsService<T> {
  selected: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  isMultiple: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUnselectable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private optionIndex: number = 0;

  /**
   * TODO: Maybe put in a utils file?
   * For accessibility, we need to be able to navigate through the options with just arrow keys
   * https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
   * @param { KeyboardEvent } event | The keyboard event
   * @return
   */
  public moveFocus(event: KeyboardEvent): void {
    const chips = document.querySelectorAll<HTMLLIElement>('.usi-chip');

    switch (event.key) {
      case 'ArrowUp':
        if (this.optionIndex > 0) {
          this.optionIndex--;
        }

        break;

      case 'ArrowRight':
        if (this.optionIndex < chips.length - 1) {
          this.optionIndex++;
        }

        break;
      case 'ArrowDown':
        if (this.optionIndex < chips.length - 1) {
          this.optionIndex++;
        }

        break;
      case 'ArrowLeft':
        if (this.optionIndex > 0) {
          this.optionIndex--;
        }

        break;
      case 'Tab':
        if (this.optionIndex < chips.length - 1) {
          this.optionIndex++;
        }

        break;
      default:
        break;
    }

    if (chips[this.optionIndex]) {
      chips[this.optionIndex].focus();
    }
  }

  /**
   * Emits to each radio button if the radio group  has been selected.
   * @param { boolean } value | The value we want to emit to the radio group
   * @return
   */
  public select(value: any): void {
    if (this.isMultiple.value) {
      const currentValue = this.selected.value;
      this.selected.next([...currentValue, value]);
    } else {
      this.selected.next([value]);
    }
  }

  /**
   *  Removes our value from the selected array
   * @param { generic } value | The generic value we want to remove from the selected array
   * @return
   */
  public remove(value: T): void {
    const selectedArray: any[] = this.selected.getValue();

    selectedArray.forEach((item, index) => {
      if (item === value) {
        selectedArray.splice(index, 1);
      }
    });

    // we must destructure the array to trigger angular's change detection
    this.selected.next([...selectedArray]);
  }
}
