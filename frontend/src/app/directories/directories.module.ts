import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComputersComponent} from "./computers.component";
import {EmployeesComponent} from "./employees.component";
import {LicensesComponent} from "./licenses.component";
import {PartsComponent} from "./parts.component";
import {SoftwareListComponent} from "./software-list.component";
import {SubsidiariesComponent} from "./subsidiaries.component";
import {MaterialModule} from "../material-module";
import {UtilsModule} from "../utils/utils.module";
import {GridsModule} from "../grids/grids.module";


@NgModule({
  declarations: [
    ComputersComponent,
    EmployeesComponent,
    LicensesComponent,
    PartsComponent,
    SoftwareListComponent,
    SubsidiariesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UtilsModule,
    GridsModule
  ]
})
export class DirectoriesModule { }
