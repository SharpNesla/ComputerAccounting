import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LicensesComponent} from "./licenses.component";
import {UtilsModule} from "../utils/utils.module";
import {LicenseGridComponent} from "./license-grid.component";
import {LicenseEditorComponent} from "./license-editor.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SoftwareModule} from "../software/software.module";
import {PortalModule} from "@angular/cdk/portal";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {A11yModule} from "@angular/cdk/a11y";
import {LicenseCardComponent} from "./license-card.component";


@NgModule({
  declarations: [
    LicensesComponent,
    LicenseGridComponent,
    LicenseEditorComponent,
    LicenseCardComponent],
  exports: [
    LicenseGridComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    SoftwareModule,
    MatDatepickerModule,
  ]
})
export class LicensesModule {
}
