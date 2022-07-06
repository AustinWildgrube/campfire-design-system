import { Injectable, NgZone, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { auditTime, finalize } from 'rxjs/operators';

const NOOP = (): void => {};

@Injectable({
  providedIn: 'root',
})
export class UsiResizeService implements OnDestroy {
  private readonly resizeSource: Subject<void> = new Subject<void>();
  private disposeHandle: () => void = NOOP;
  private listeners: number = 0;
  private renderer: Renderer2;

  constructor(private ngZone: NgZone, private rendererFactory2: RendererFactory2) {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
  }

  ngOnDestroy(): void {
    // Caretaker note: the `handler` is an instance property (it's not defined on the class prototype).
    // The `handler` captures `this` and prevents the `UsiResizeService` from being garbage collected.
    this.handler = NOOP;
  }

  /**
   * Here we subscribe to our resize observable.
   * @return
   */
  public subscribe(): Observable<void> {
    this.registerListener();

    return this.resizeSource.pipe(
      auditTime(16),
      finalize(() => this.unregisterListener())
    );
  }

  /**
   * Since we subscribe to an observable we need to unsubscribe.
   * @return
   */
  public unsubscribe(): void {
    this.unregisterListener();
  }

  /**
   * Go next in our observable.
   * @private
   */
  private handler = (): void => {
    this.ngZone.run(() => {
      this.resizeSource.next();
    });
  };

  /**
   * We are able to detect the resize event and create a listener if there is not one.
   * @private
   */
  private registerListener(): void {
    if (this.listeners === 0) {
      this.ngZone.runOutsideAngular(() => {
        this.disposeHandle = this.renderer.listen('window', 'resize', this.handler);
      });
    }

    this.listeners += 1;
  }

  /**
   * We'll need to remove our listeners and dispose of the service when the component is destroyed.
   * @private
   */
  private unregisterListener(): void {
    this.listeners -= 1;

    if (this.listeners === 0) {
      this.disposeHandle();
      this.disposeHandle = NOOP;
    }
  }
}
