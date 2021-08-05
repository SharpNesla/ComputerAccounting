import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {UtilsModule} from './utils/utils.module';
import {LoginModule} from './login/login.module';
import {PageNotFoundComponent} from './page-not-found.component';
import {AboutComponent} from './about.component';
import {SettingsComponent} from './settings.component';
import {DeleteDialogComponent} from './delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialModule} from './material-module';
import {ErrorInterceptor} from './login/error-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptorService} from './login/jwt-interceptor.service';
import {CardsModule} from './cards/cards.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BadRequestDialogComponent} from './bad-request-dialog.component';
import {EntityNotFoundDialogComponent} from './entity-not-found-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AboutComponent,
    SettingsComponent,
    BadRequestDialogComponent,
    EntityNotFoundDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    LoginModule,
    NgxChartsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    UtilsModule,
    MatDialogModule,
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MaterialModule,
    CardsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'ru-ru'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent, BadRequestDialogComponent, EntityNotFoundDialogComponent]
})
export class AppModule {
}
