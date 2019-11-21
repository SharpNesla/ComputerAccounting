import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalyticsComponent} from "./analytics.component";
import {UtilsModule} from "../utils/utils.module";



@NgModule({
  declarations: [AnalyticsComponent],
  imports: [
    CommonModule,
    UtilsModule
  ]
})
export class AnalyticsModule { }
