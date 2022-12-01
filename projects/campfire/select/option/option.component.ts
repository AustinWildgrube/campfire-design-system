import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { UsiSelectService } from '../select.service';
import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'usi-option',
  template: `
    <li
      class="usi-select__option"
      [ngClass]="{
        'usi-select__option--active': usiSelectService.realValue.value === usiValue,
        'usi-select__option--disabled': usiDisabled == true
      }"
      (click)="writeValue(usiValue)"
      (keyup.enter)="writeValue(usiValue)"
      (keyup.arrowUp)="usiSelectService.moveFocus($any($event))"
      (keyup.arrowDown)="usiSelectService.moveFocus($any($event))"
      [attr.aria-selected]="usiSelectService.realValue.value === usiValue"
      tabindex="0"
      role="option"
    >
      <div #contentWrapper>
        <ng-content></ng-content>
      </div>
    </li>
  `,
  styleUrls: ['../styles/select.component.scss', '../../input/styles/input.component.scss'],
})
export class UsiOptionComponent implements OnInit {
  @ViewChild('contentWrapper') content: ElementRef | undefined;

  @Input()
  usiValue?: any = undefined;

  @Input()
  @InputBoolean()
  usiDisabled?: BooleanInput = false;

  constructor(public usiSelectService: UsiSelectService) {}

  ngOnInit(): void {
    if (this.usiValue === undefined) {
      throw new Error('UsiSelectOption: A select option must have a value!');
    }
  }

  /**
   * Write the value to the select service and update form
   * @param { any } value | The value to write to the select service
   */
  public writeValue(value: any): void {
    if (this.usiDisabled !== null && this.usiDisabled !== true) {
      this.usiSelectService.realValue = { label: this.content?.nativeElement.textContent, value: value };
      this.usiSelectService.value = value;
      this.usiSelectService.showOptions = false;
    }

    this.usiSelectService.updateChanges();
  }
}
