import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-login',
  template: `
      <main>
          <mat-card id="login-panel">
              <mat-toolbar color="primary">Окна и фурнитура "Сибирские врата</mat-toolbar>
              <div id="login-panel-content">
                  <mat-form-field appearance="outline">
                      <mat-label>Логин</mat-label>
                      <input matInput placeholder="Логин">
                      <mat-icon matSuffix>account_circle</mat-icon>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                      <mat-label>Пароль</mat-label>
                      <input matInput placeholder="Пароль" type="password">
                      <mat-icon matSuffix>vpn_key</mat-icon>
                  </mat-form-field>
                  <button color="primary" mat-raised-button routerLink="dashboard">Войти</button>
              </div>
          </mat-card>
      </main>`,
  styles: [`
      main {
          width: 100vw;
          height: 100vh;
          background: url("../../../assets/LoginBackground.png") center;
          background-size: cover;
          display: flex;
      }

      #login-panel {
          flex-direction: column;
          margin: auto;
          width: 500px;
          padding: 0;
      }

      #login-panel-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
      }
  `]
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
