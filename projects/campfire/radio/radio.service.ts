import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { BooleanInput } from 'usi-campfire/utils';

@Injectable()
export class UsiRadioService {
  name = new ReplaySubject<string>(1);
  selected = new ReplaySubject<any>(1);
  disabled = new ReplaySubject<BooleanInput>(1);

  /**
   * Emits to each radio button if the radio group  has been selected.
   * @return
   */
  public select(value: any): void {
    this.selected.next(value);
  }

  /**
   * Emits to each radio button if the radio group has been disabled.
   * @return
   */
  public setDisabled(value: BooleanInput): void {
    this.disabled.next(value);
  }

  /**
   * Sets the name of each radio in a radio group.
   * @return
   */
  public setName(value: string): void {
    this.name.next(value);
  }
}
