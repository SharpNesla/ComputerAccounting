import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartsComponent} from "./parts.component";
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";
import {PartTypeEditorComponent} from './part-type-editor.component';
import {PartTypeGridComponent} from './part-type-grid.component';
import {PartTypeCardComponent} from './part-type-card.component';
import {MatTableModule} from "@angular/material/table";
import {PartGridComponent} from "./part-grid.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    PartsComponent,
    PartTypeEditorComponent,
    PartTypeGridComponent,
    PartTypeCardComponent,
    PartGridComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [PartsComponent]
})
export class PartTypesModule {
}
