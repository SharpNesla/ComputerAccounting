import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {UtilsModule} from "../utils/utils.module";



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    UtilsModule
  ]
})
export class DashboardModule { }
