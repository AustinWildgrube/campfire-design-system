import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTabsComponent } from './tabs.component';
import { UsiTabComponent } from './tab/tab.component';

@NgModule({
  declarations: [UsiTabsComponent, UsiTabComponent],
  imports: [CommonModule],
  exports: [UsiTabsComponent, UsiTabComponent],
})
export class UsiTabsModule {}
