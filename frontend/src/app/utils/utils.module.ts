import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {DashboardComponent} from "./login/dashboard.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [LoginComponent, DashboardComponent],
  exports: [
    LoginComponent, DashboardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule
  ]
})
export class ViewsModule { }
