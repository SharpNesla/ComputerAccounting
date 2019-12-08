import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalyticsComponent} from "./analytics.component";
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
  declarations: [AnalyticsComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatTabsModule
  ]
})
export class AnalyticsModule { }
