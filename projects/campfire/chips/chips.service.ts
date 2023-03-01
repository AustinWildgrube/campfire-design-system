import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsiChipsService {
  selected: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  isMultiple: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUnselectable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Emits to each radio button if the radio group  has been selected.
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

  public remove(value: any): void {
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
