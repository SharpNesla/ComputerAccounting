import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AppbarBaseComponent} from "./layouts/appbar-base.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DrawerButtonComponent} from "./drawer-button.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {DrawerAppbarBaseComponent} from './layouts/drawer-appbar-base.component';
import {CrudComponent} from './grids/crud.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DialogLayoutComponent} from './layouts/dialog-layout.component';
import {MatSelectModule} from "@angular/material/select";
import { RolePipe } from '../employees/role.pipe';


@NgModule({
  declarations: [AppbarBaseComponent, DrawerButtonComponent,
    DrawerAppbarBaseComponent, CrudComponent, DialogLayoutComponent],
  exports: [
    AppbarBaseComponent,
    DrawerButtonComponent,
    CrudComponent,
    DrawerAppbarBaseComponent,
    DialogLayoutComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class UtilsModule {
}
