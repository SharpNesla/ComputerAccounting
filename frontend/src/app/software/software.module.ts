import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SoftwareListComponent} from "./software-list.component";
import {MatTabsModule} from "@angular/material/tabs";
import {UtilsModule} from "../utils/utils.module";
import {SoftwareEditorComponent} from "./software-editor.component";
import {SoftwareGridComponent} from "./software-grid.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {SoftwareTypeEditorComponent} from "./software-type-editor.component";
import {SoftwareTypeGridComponent} from "./software-type-grid.component";
import {MatButtonModule} from "@angular/material/button";
import {SoftwareTypeSearchComponent} from "./software-type-search.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {SoftwareSearchComponent} from "./software-search.component";
import {SoftwareTypeCardComponent} from "./software-type-card.component";
import {SoftwareCardComponent} from "./software-card.component";


@NgModule({
  declarations: [SoftwareListComponent,
    SoftwareEditorComponent,
    SoftwareGridComponent,
    SoftwareSearchComponent,
    SoftwareCardComponent,
    SoftwareTypeEditorComponent,
    SoftwareTypeGridComponent,
    SoftwareTypeSearchComponent,
    SoftwareTypeCardComponent
  ],
  exports: [
    SoftwareTypeSearchComponent,
    SoftwareSearchComponent,
    SoftwareGridComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    UtilsModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class SoftwareModule {
}
