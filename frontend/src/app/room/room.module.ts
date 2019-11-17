import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";
import {RoomGridComponent} from "./room-grid.component";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {RoomEditorComponent} from "./room-editor.component";


@NgModule({
  declarations: [RoomGridComponent, RoomEditorComponent],
  exports: [
    RoomGridComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class RoomModule {
}
