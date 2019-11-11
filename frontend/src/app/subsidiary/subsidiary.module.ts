import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubsidiariesComponent} from "./subsidiaries.component";
import {UtilsModule} from "../utils/utils.module";
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
  declarations: [SubsidiariesComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatTabsModule
  ]
})
export class SubsidiaryModule { }
