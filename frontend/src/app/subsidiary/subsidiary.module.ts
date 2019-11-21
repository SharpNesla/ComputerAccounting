import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubsidiariesComponent} from "./subsidiaries.component";
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";
import {SubsidiaryGridComponent} from "./subsidiary-grid.component";
import {MatTableModule} from "@angular/material/table";
import {SubsidiaryEditorComponent} from "./subsidiary-editor.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {SubsidiarySearchComponent} from './subsidiary-search.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RoomGridComponent} from "./room-grid.component";
import {RoomEditorComponent} from "./room-editor.component";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {RoomSearchComponent} from "./room-search.component";


@NgModule({
  declarations: [SubsidiariesComponent, SubsidiaryGridComponent, SubsidiaryGridComponent,
    SubsidiaryEditorComponent, RoomGridComponent, RoomEditorComponent, RoomSearchComponent,
    SubsidiarySearchComponent],
  exports: [
    SubsidiarySearchComponent,
    RoomSearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule
  ]
})
export class SubsidiaryModule {
}
