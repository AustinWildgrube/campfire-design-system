import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsiBreadcrumbsComponent } from './breadcrumbs.component';
import { UsiUtilsModule } from 'usi-campfire/utils';
import { UsiSharedModule } from 'usi-campfire/shared';

@NgModule({
  declarations: [UsiBreadcrumbsComponent],
  imports: [CommonModule, RouterModule, UsiSharedModule, UsiUtilsModule],
  exports: [UsiBreadcrumbsComponent],
})
export class UsiBreadcrumbsModule {}
