import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComputerGridComponent} from "./computer-grid.component";
import {EmployeeGridComponent} from "./employee-grid.component";
import {LicenseGridComponent} from "./license-grid.component";
import {PartGridComponent} from "./part-grid.component";
import {PartTypeGridComponent} from "./part-type-grid.component";
import {RoomGridComponent} from "./room-grid.component";
import {SoftwareGridComponent} from "./software-grid.component";
import {SubsidiaryGridComponent} from "./subsidiary-grid.component";
import {SoftwareTypeGridComponent} from "./software-type-grid.component";
import {MaterialModule} from "../material-module";
import {UtilsModule} from "../utils/utils.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SearchesModule} from "../searches/searches.module";


@NgModule({
  declarations: [
    ComputerGridComponent,
    EmployeeGridComponent,
    LicenseGridComponent,
    PartGridComponent,
    PartTypeGridComponent,
    RoomGridComponent,
    SoftwareGridComponent,
    SoftwareTypeGridComponent,
    SubsidiaryGridComponent
  ],
  exports: [
    ComputerGridComponent,
    EmployeeGridComponent,
    LicenseGridComponent,
    PartGridComponent,
    PartTypeGridComponent,
    RoomGridComponent,
    SoftwareGridComponent,
    SoftwareTypeGridComponent,
    SubsidiaryGridComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UtilsModule,
    RouterModule,
    FormsModule,
    SearchesModule
  ]
})
export class GridsModule { }
