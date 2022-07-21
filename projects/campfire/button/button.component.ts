import { AfterViewInit, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

import { BooleanInput, InputBoolean } from 'usi-campfire/utils';

@Component({
  selector: 'button[usi-button], a[usi-button]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./styles/button.component.scss'],
})
export class UsiButtonComponent implements AfterViewInit {
  @HostBinding('class.usi-button') true = true;

  @Input()
  @InputBoolean()
  usiLoading: BooleanInput = false;

  @HostBinding('class.usi-button--loading')
  public get isLoading(): BooleanInput {
    return this.usiLoading;
  }

  @Input()
  @InputBoolean()
  usiBlock: BooleanInput = false;

  @HostBinding('class.usi-button--block')
  public get isBlock(): BooleanInput {
    return this.usiBlock;
  }

  @Input()
  @InputBoolean()
  usiDisabled: BooleanInput = false;

  @HostBinding(`attr.disabled`)
  public get isDisabled(): BooleanInput {
    return this.usiDisabled || null;
  }

  @Input()
  usiType: 'primary' | 'secondary' | 'transparent' = 'primary';

  @HostBinding('class.usi-button--secondary')
  public get isSecondary(): boolean {
    return this.usiType === 'secondary';
  }

  @HostBinding(`class.usi-button--transparent`)
  public get isTransparent(): boolean {
    return this.usiType === 'transparent';
  }

  @Input()
  usiSize: 'small' | 'medium' | 'large' = 'medium';

  @HostBinding(`class.usi-button--small`)
  public get isSmall(): boolean {
    return this.usiSize === 'small';
  }

  @HostBinding(`class.usi-button--large`)
  public get isLarge(): boolean {
    return this.usiSize === 'large';
  }

  @Input()
  usiColor: 'usi' | 'white' = 'usi';

  @HostBinding('class.usi-button--white')
  public get isWhite(): boolean {
    return this.usiColor === 'white';
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
  }

  private insertSpan(nodes: NodeList, renderer: Renderer2): void {
    nodes.forEach((node) => {
      if (node.nodeName === '#text') {
        const span = renderer.createElement('span');
        const parent = renderer.parentNode(node);
        renderer.insertBefore(parent, span, node);
        renderer.appendChild(span, node);
      }
    });
  }
}
