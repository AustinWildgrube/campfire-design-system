import { ComponentRef } from '@angular/core';
import { BasePortalHost, ComponentPortal } from '../portal/portal';

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export class OverlayRef {
  constructor(private _portalHost: BasePortalHost) {}

  public attach(portal: ComponentPortal<any>): ComponentRef<any> {
    return this._portalHost.attach(portal);
  }

  /**
   * Detaches an overlay from a portal.
   * @returns Resolves when the overlay has been detached.
   */
  public detach() {
    return this._portalHost.detach();
  }
}
