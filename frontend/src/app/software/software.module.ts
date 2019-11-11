import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SoftwareListComponent} from "./software-list.component";
import {MatTabsModule} from "@angular/material/tabs";
import {UtilsModule} from "../utils/utils.module";



@NgModule({
  declarations: [SoftwareListComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    UtilsModule
  ]
})
export class SoftwareModule { }
