import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {AppbarBaseComponent} from "./layouts/appbar-base.component";
import {MatToolbarModule} from "@angular/material/toolbar";



@NgModule({
  declarations: [AppbarBaseComponent],
  exports: [
    AppbarBaseComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ]
})
export class UtilsModule { }
