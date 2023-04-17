import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class UsiRadioService<T = unknown> {
  selected = new BehaviorSubject<T>(null as unknown as T);
  disabled = new BehaviorSubject<boolean>(false);
  name = new BehaviorSubject<string>('');
  unsubscribe = new Subject<boolean>();

  radioButtonArray: { id: string; value: T }[] = [];
  activeButton: number = 0;

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  /**
   * To satisfy W3 we need to handle keyboard events
   * https://www.w3.org/WAI/ARIA/apg/patterns/radio
   * @param { KeyboardEvent } event | The keyboard event
   */
  public onKeyUp(event: KeyboardEvent): void {
    const radioButtons = document.querySelectorAll<HTMLSpanElement>('.usi-radio-button');
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      this.activeButton < radioButtons.length - 1 ? this.activeButton++ : (this.activeButton = 0);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      this.activeButton > 0 ? this.activeButton-- : (this.activeButton = radioButtons.length - 1);
    }

    radioButtons[this.activeButton].focus();
    this.selected.next(this.radioButtonArray[this.activeButton].value);
  }
}
