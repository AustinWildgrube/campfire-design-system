import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTabGroupComponent } from './tab-group/tab-group.component';
import { UsiTabButtonComponent } from './tab-button/tab-button.component';
import { UsiTabButtonDirective } from './tab-button/tab-button.directive';

@NgModule({
  declarations: [UsiTabGroupComponent, UsiTabButtonComponent, UsiTabButtonDirective],
  imports: [CommonModule],
  exports: [UsiTabGroupComponent, UsiTabButtonComponent, UsiTabButtonDirective],
})
export class UsiTabsModule {}
