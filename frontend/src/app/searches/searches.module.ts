import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PartTypeSearchComponent} from "./part-type-search.component";
import {RoomSearchComponent} from "./room-search.component";
import {SoftwareSearchComponent} from "./software-search.component";
import {SoftwareTypeSearchComponent} from "./software-type-search.component";
import {SubsidiarySearchComponent} from "./subsidiary-search.component";
import {MaterialModule} from "../material-module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PartTypeSearchComponent,
    RoomSearchComponent,
    SoftwareSearchComponent,
    SoftwareTypeSearchComponent,
    SubsidiarySearchComponent
  ],
  exports: [
    PartTypeSearchComponent,
    RoomSearchComponent,
    SoftwareSearchComponent,
    SoftwareTypeSearchComponent,
    SubsidiarySearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class SearchesModule { }
