import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {DashboardComponent} from "./dashboard.component";
import {RouterModule} from "@angular/router";
import {UtilsModule} from "../utils/utils.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ComputerDirectoryComponent } from './directories/computer-directory.component';
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
  declarations: [LoginComponent, DashboardComponent, ComputerDirectoryComponent],
  exports: [
    LoginComponent, DashboardComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatToolbarModule,
    MatTabsModule
  ]
})
export class ViewsModule { }
