import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {AppbarBaseComponent} from "./layouts/appbar-base.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DrawerButtonComponent} from "./drawer-button.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import { DrawerAppbarBaseComponent } from './layouts/drawer-appbar-base/drawer-appbar-base.component';
import { CrudComponent } from './grids/crud.component';




@NgModule({
  declarations: [AppbarBaseComponent, DrawerButtonComponent, DrawerAppbarBaseComponent, CrudComponent],
  exports: [
    AppbarBaseComponent,
    DrawerButtonComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class UtilsModule { }
