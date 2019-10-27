import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartTypesComponent} from "./part-types.component";
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";
import {PartTypeEditorComponent} from './part-type-editor.component';
import {PartTypeGridComponent} from './part-type-grid.component';
import {PartTypeCardComponent} from './part-type-card.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    PartTypesComponent,
    PartTypeEditorComponent,
    PartTypeGridComponent,
    PartTypeCardComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [PartTypesComponent]
})
export class PartTypesModule {
}
