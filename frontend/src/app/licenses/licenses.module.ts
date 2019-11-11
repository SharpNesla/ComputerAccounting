import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LicensesComponent} from "./licenses.component";
import {UtilsModule} from "../utils/utils.module";



@NgModule({
  declarations: [LicensesComponent],
  imports: [
    CommonModule,
    UtilsModule
  ]
})
export class LicensesModule { }
