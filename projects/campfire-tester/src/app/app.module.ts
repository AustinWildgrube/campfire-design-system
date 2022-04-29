import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CampfireModule } from '../../../campfire/src/lib/campfire.module';
import { UsiSharedModule } from '../../../campfire/src/lib/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, CampfireModule, UsiSharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
