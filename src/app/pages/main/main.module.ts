import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ViewerComponent } from './viewer/viewer.component';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ViewerComponent
  ],
  exports: [
    ViewerComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class MainModule { }
