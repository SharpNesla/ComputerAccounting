import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PartTypeSearchComponent} from "./part-type-search.component";
import {RoomSearchComponent} from "./room-search.component";
import {SoftwareSearchComponent} from "./software-search.component";
import {SoftwareTypeSearchComponent} from "./software-type-search.component";
import {SubsidiarySearchComponent} from "./subsidiary-search.component";
import {MaterialModule} from "../material-module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComputerSearchComponent} from "./computer-search.component";
import {EmployeeSearchComponent} from "./employee-search.component";
import {UtilsModule} from "../utils/utils.module";



@NgModule({
  declarations: [
    PartTypeSearchComponent,
    RoomSearchComponent,
    SoftwareSearchComponent,
    SoftwareTypeSearchComponent,
    SubsidiarySearchComponent,
    ComputerSearchComponent,
    EmployeeSearchComponent
  ],
  exports: [
    PartTypeSearchComponent,
    RoomSearchComponent,
    SoftwareSearchComponent,
    SoftwareTypeSearchComponent,
    SubsidiarySearchComponent,
    ComputerSearchComponent,
    EmployeeSearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UtilsModule,
    ReactiveFormsModule
  ]
})
export class SearchesModule { }
