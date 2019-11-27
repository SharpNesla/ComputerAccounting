import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LicenseEditorComponent} from "./license-editor.component";
import {EmployeeEditorComponent} from "./employee-editor.component";
import {ComputerEditorComponent} from "./computer-editor.component";
import {PartEditorComponent} from "./part-editor.component";
import {PartTypeEditorComponent} from "./part-type-editor.component";
import {RoomEditorComponent} from "./room-editor.component";
import {SoftwareEditorComponent} from "./software-editor.component";
import {SoftwareTypeEditorComponent} from "./software-type-editor.component";
import {SubsidiaryEditorComponent} from "./subsidiary-editor.component";
import {MaterialModule} from "../material-module";
import {SearchesModule} from "../searches/searches.module";
import {FormsModule} from "@angular/forms";
import {UtilsModule} from "../utils/utils.module";




@NgModule({
  declarations: [
    ComputerEditorComponent,
    EmployeeEditorComponent,
    LicenseEditorComponent,
    PartEditorComponent,
    PartTypeEditorComponent,
    RoomEditorComponent,
    SoftwareEditorComponent,
    SoftwareTypeEditorComponent,
    SubsidiaryEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SearchesModule,
    FormsModule,
    UtilsModule
  ]
})
export class EditorsModule { }
