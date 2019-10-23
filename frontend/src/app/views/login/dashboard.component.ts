import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-login',
  template: `
      <main>
          <mat-card id="login-panel"><h2>Окна и фурнитура "Сибирские врата"</h2>
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
                  <button color="primary" mat-raised-button>Войти</button>
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
          margin: auto;
          width: 500px;
      }
  `]
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
