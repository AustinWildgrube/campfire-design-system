import { Component, Input, OnInit } from '@angular/core';

import { UsiChipsService } from '../chips.service';
import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-chip',
  template: `
    <li
      class="usi-chip"
      [ngClass]="{
        'usi-chip--disabled': usiDisabled,
        'usi-chip--selected': isSelected
      }"
      (click)="selectChip()"
      (keydown.enter)="selectChip()"
      (keydown.space)="selectChip()"
      (keyup)="moveFocus($any($event))"
      [tabindex]="isSelected ? 1 : 0"
    >
      <ng-content></ng-content>
    </li>
  `,
  styleUrls: ['./styles/chip-button.component.scss'],
})
export class UsiChipButtonComponent<T = unknown> implements OnInit {
  @Input()
  usiValue: T = null as unknown as T;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  isSelected: boolean | undefined = false;

  constructor(private usiChipsService: UsiChipsService<T>) {}

  ngOnInit(): void {
    if (this.usiValue === null || this.usiValue === undefined) {
      throw new Error('UsiChipComponent: Each chip must have a value.');
    }

    this.usiChipsService.selected.subscribe((selected: T[]) => {
      this.isSelected = !!selected.find((selectedChip: T) => selectedChip === this.usiValue);
    });
  }

  /**
   * Moves focus to the next or previous chip depending on the key pressed.
   * @param { KeyboardEvent } event | The keydown event.
   * @return
   */
  public moveFocus(event: KeyboardEvent): void {
    this.usiChipsService.moveFocus(event);
  }

  /**
   * Selects or unselects the chip depending on the current state.
   * @return
   */
  public selectChip(): void {
    if (this.usiDisabled) return;

    const isUnselectable = this.usiChipsService.isUnselectable.value;
    if (isUnselectable && this.isSelected) {
      this.usiChipsService.remove(this.usiValue);
    } else if (!this.isSelected) {
      this.usiChipsService.select(this.usiValue);
    }
  }
}
