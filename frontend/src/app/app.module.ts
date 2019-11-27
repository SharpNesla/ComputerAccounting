import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {UtilsModule} from "./utils/utils.module";
import {LoginModule} from "./login/login.module";
import {ComputersModule} from "./computers/computers.module";
import {PageNotFoundComponent} from './page-not-found.component';
import {AboutComponent} from './about.component';
import {SettingsComponent} from './settings.component';
import {DeleteDialogComponent} from "./delete-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MaterialModule} from "./material-module";
import {ErrorInterceptor} from "./login/error-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptorService} from "./login/jwt-interceptor.service";
import {LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AboutComponent,
    SettingsComponent,
    DeleteDialogComponent
  ],
  imports: [
    LoginModule,
    ComputersModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    UtilsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'ru-ru'}
    ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent]
})
export class AppModule {
}
