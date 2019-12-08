import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {UtilsModule} from "../utils/utils.module";
import {BranchAdminDashboardComponent} from "./branch-admin-dashboard.component";
import {DirectorDashboardComponent} from "./director-dashboard.component";
import {BranchDirectorDashboardComponent} from "./branch-director-dashboard.component";
import {StorekeeperDashboardComponent} from "./storekeeper-dashboard.component";
import {ResponsibleDashboardComponent} from "./responsible-dashboard.component";
import {AdminDashboardComponent} from "./admin-dashboard.component";
import {BarChartModule, NgxChartsModule} from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    DashboardComponent,
    DirectorDashboardComponent,
    AdminDashboardComponent,
    BranchDirectorDashboardComponent,
    BranchAdminDashboardComponent,
    StorekeeperDashboardComponent,
    ResponsibleDashboardComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    BarChartModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
