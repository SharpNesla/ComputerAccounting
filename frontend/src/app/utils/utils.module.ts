import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AppbarBaseComponent} from "./layouts/appbar-base.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DrawerButtonComponent} from "./drawer-button.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {DrawerAppbarBaseComponent} from './layouts/drawer-appbar-base.component';
import {BottomBarComponent} from '../grids/bottom-bar.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DialogLayoutComponent} from './layouts/dialog-layout.component';
import {MatSelectModule} from "@angular/material/select";
import {RolePipe} from './role.pipe';
import {PartCategoryPipe} from './part-category.pipe';
import {ComputerTypePipe} from './computer-type.pipe';
import {SoftwareCategoryPipe} from './software-category.pipe';
import {FormsModule} from "@angular/forms";
import {GenderPipe} from './gender.pipe';
import {PartStatePipe} from './part-state.pipe';
import {NullDefaultValueDirective} from "./null-default-value.directive";
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from './api-interceptor.service';

@NgModule({
  declarations: [AppbarBaseComponent, DrawerButtonComponent,
    DrawerAppbarBaseComponent,  DialogLayoutComponent,
    NullDefaultValueDirective,
    RolePipe, PartCategoryPipe, ComputerTypePipe, SoftwareCategoryPipe,
    GenderPipe, PartStatePipe],
  exports: [
    AppbarBaseComponent,
    DrawerButtonComponent,
    DrawerAppbarBaseComponent,
    DialogLayoutComponent,
    RolePipe,
    NullDefaultValueDirective,
    PartCategoryPipe,
    ComputerTypePipe,
    SoftwareCategoryPipe,
    GenderPipe,
    PartStatePipe
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
    MatSelectModule,
    FormsModule
  ]
})
export class UtilsModule {
}
