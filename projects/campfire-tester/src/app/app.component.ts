import { Component } from '@angular/core';

import { UsiModalInterface } from 'usi-campfire/utils';
import { UsiModalsService } from 'usi-campfire/modals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  globalModalConfig: UsiModalInterface = {
    usiButtonText: 'Okay',
    usiCancelText: 'Cancel',
    usiId: 0,
    usiLimit: 1,
    usiModalType: 'validation',
    usiOnAction: () => {
      console.log('action');
    },
    usiOnAdd: () => {
      console.log('add');
    },
    usiOnRemove: () => {
      console.log('remove');
    },
    usiMessage: 'rtye',
    usiPosition: 'center-center',
    usiTitle: 'retyter',
    usiTimeout: 0,
    usiValidationType: 'success',
  };

  constructor(private usiModalService: UsiModalsService) {}

  openComponent() {
    this.usiModalService.add(this.globalModalConfig);
    console.log('openComponent');
  }
}
