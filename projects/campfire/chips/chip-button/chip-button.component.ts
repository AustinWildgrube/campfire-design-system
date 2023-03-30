import { Component, Input, OnInit } from '@angular/core';

import { UsiChipsService } from '../chips.service';
import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-chip',
  template: `
    <div
      class="usi-chip"
      [ngClass]="{
        'usi-chip--disabled': usiDisabled,
        'usi-chip--selected': isSelected
      }"
      (click)="selectChip()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./styles/chip-button.component.scss'],
})
export class UsiChipButtonComponent implements OnInit {
  @Input()
  usiValue: string | number = '';

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput;

  isSelected: boolean = false;

  constructor(private usiChipsService: UsiChipsService) {}

  ngOnInit(): void {
    this.usiChipsService.selected.subscribe((selected) => {
      this.isSelected = selected.find((e: any) => e === this.usiValue);
    });
  }

  public selectChip(): void {
    if (!this.usiDisabled) {
      if (this.usiChipsService.isUnselectable && this.isSelected) {
        this.usiChipsService.remove(this.usiValue);
      } else {
        this.usiChipsService.select(this.usiValue);
      }
    }
  }
}
