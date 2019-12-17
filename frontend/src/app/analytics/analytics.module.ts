import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalyticsComponent} from "./analytics.component";
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MaterialModule} from "../material-module";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {GridsModule} from "../grids/grids.module";



@NgModule({
  declarations: [AnalyticsComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatTabsModule,
    MaterialModule,
    NgxChartsModule,
    GridsModule
  ]
})
export class AnalyticsModule { }
