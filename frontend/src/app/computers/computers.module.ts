import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComputersComponent} from "./computers.component";
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";
import {ComputerEditorComponent} from './computer-editor.component';
import {ComputerGridComponent} from './computer-grid.component';
import {ComputerCardComponent} from './computer-card.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterModule} from "@angular/router";
import {SubsidiaryModule} from "../subsidiary/subsidiary.module";
import {PartTypesModule} from "../parts/part-types.module";
import {SoftwareModule} from "../software/software.module";


@NgModule({
  declarations: [
    ComputersComponent,
    ComputerEditorComponent,
    ComputerGridComponent,
    ComputerCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    RouterModule,
    PartTypesModule,
    SoftwareModule,
    SubsidiaryModule
  ],
  exports: [ComputersComponent, ComputerGridComponent],
  entryComponents: [ ComputerCardComponent ]
})
export class ComputersModule {
}
