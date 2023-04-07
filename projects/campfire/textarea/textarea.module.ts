import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsiTextareaComponent } from './textarea.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsiTextareaComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UsiTextareaComponent],
})
export class UsiTextareaModule {}
