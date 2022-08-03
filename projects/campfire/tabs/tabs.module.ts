import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTabsComponent } from './tabs.component';
import { UsiTabComponent } from './tab/tab.component';
import { UsiTabDirective } from './tab/tab.directive';

@NgModule({
  declarations: [UsiTabsComponent, UsiTabComponent, UsiTabDirective],
  imports: [CommonModule],
  exports: [UsiTabsComponent, UsiTabComponent, UsiTabDirective],
})
export class UsiTabsModule {}
