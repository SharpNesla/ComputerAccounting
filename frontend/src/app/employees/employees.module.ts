import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeEditorComponent} from "./employee-editor.component";
import {EmployeeGridComponent} from "./employee-grid.component";
import {EmployeesComponent} from "./employees.component";
import {UtilsModule} from "../utils/utils.module";
import {LicensesModule} from "../licenses/licenses.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {SoftwareModule} from "../software/software.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {RolePipe} from "./role.pipe";
import {MaterialModule} from "../material-module";
import {MatInputModule} from "@angular/material/input";
import {EmployeeCardComponent} from "./employee-card.component";
import {PartTypesModule} from "../parts/part-types.module";
import {ComputerCardComponent} from "../computers/computer-card.component";


@NgModule({
  declarations: [
    EmployeeEditorComponent,
    EmployeeGridComponent,
    EmployeesComponent,
    EmployeeCardComponent,
    RolePipe
    ],
  imports: [
    CommonModule,
    UtilsModule,
    LicensesModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    SoftwareModule,
    MatDatepickerModule,
    MatCardModule,
    MatInputModule,
    MaterialModule,
    PartTypesModule
  ],
  entryComponents: [ EmployeeCardComponent]
})
export class EmployeesModule {
}
