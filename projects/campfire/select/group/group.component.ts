import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'usi-optgroup',
  template: `
    <li *ngIf="usiLabel !== undefined" class="usi-select__group-label">{{ usiLabel }}</li>
    <ng-content></ng-content>
  `,
  styleUrls: ['../styles/select.component.scss', '../../input/styles/input.component.scss'],
})
export class UsiGroupComponent implements OnInit {
  @Input()
  usiLabel?: string = undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('usi-select__group-divider--bottom');
  }
}
