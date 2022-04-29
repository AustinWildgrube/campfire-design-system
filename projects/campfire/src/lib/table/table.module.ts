import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsiSharedModule } from '../shared/shared.module';
import { UsiTableService } from './table.service';

import { UsiTableComponent } from './table.component';
import { UsiThComponent } from './th/th.component';
import { UsiTdComponent } from './td/td.component';
import { UsiTrComponent } from './tr/tr.component';

@NgModule({
  declarations: [UsiTableComponent, UsiTrComponent, UsiThComponent, UsiTdComponent],
  imports: [CommonModule, FormsModule, UsiSharedModule],
  exports: [UsiTableComponent, UsiTrComponent, UsiThComponent, UsiTdComponent],
  providers: [UsiTableService],
})
export class UsiTableModule {}
