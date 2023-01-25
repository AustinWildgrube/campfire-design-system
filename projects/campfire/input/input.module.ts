import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReactiveFormsModule } from '@angular/forms';

import { UsiInputComponent } from './input.component';

import { UsiSharedModule } from 'usi-campfire/shared';

@NgModule({
  declarations: [UsiInputComponent],
  imports: [CommonModule, ReactiveFormsModule, TextFieldModule, UsiSharedModule],
  exports: [UsiInputComponent],
})
export class UsiInputModule {}
