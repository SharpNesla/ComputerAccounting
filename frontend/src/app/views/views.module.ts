import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ViewsModule { }
