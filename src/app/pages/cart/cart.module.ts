import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import {CartComponent} from "./cart.component";
import { ViewerComponent } from './viewer/viewer.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import { SidecardComponent } from './sidecard/sidecard.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    CartComponent,
    ViewerComponent,
    SidecardComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class CartModule { }
