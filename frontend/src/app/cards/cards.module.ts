import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material-module";
import {ComputerCardComponent} from "./computer-card.component";
import {EmployeeCardComponent} from "./employee-card.component";
import {LicenseCardComponent} from "./license-card.component";
import {PartCardComponent} from "./part-card.component";
import {PartTypeCardComponent} from "./part-type-card.component";
import {RoomCardComponent} from "./room-card.component";
import {SoftwareCardComponent} from "./software-card.component";
import {SoftwareTypeCardComponent} from "./software-type-card.component";
import {SubsidiaryCardComponent} from "./subsidiary-card.component";
import {UtilsModule} from "../utils/utils.module";
import {GridsModule} from "../grids/grids.module";
import {SearchesModule} from "../searches/searches.module";



@NgModule({
  declarations: [
    ComputerCardComponent,
    EmployeeCardComponent,
    LicenseCardComponent,
    PartCardComponent,
    PartTypeCardComponent,
    RoomCardComponent,
    SoftwareCardComponent,
    SoftwareTypeCardComponent,
    SubsidiaryCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UtilsModule,
    GridsModule,
    SearchesModule
  ],
  entryComponents:[
    ComputerCardComponent,
    EmployeeCardComponent,
    LicenseCardComponent,
    PartCardComponent,
    PartTypeCardComponent,
    RoomCardComponent,
    SoftwareCardComponent,
    SoftwareTypeCardComponent,
    SubsidiaryCardComponent
  ]
})
export class CardsModule { }
