import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComputersComponent} from "./computers.component";
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";
import {ComputerEditorComponent} from './computer-editor.component';
import {ComputerGridComponent} from './computer-grid.component';
import {ComputerCardComponent} from './computer-card.component';


@NgModule({
  declarations: [
    ComputersComponent,
    ComputerEditorComponent,
    ComputerGridComponent,
    ComputerCardComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    MatTabsModule
  ],
  exports: [ComputersComponent]
})
export class ComputersModule {
}
