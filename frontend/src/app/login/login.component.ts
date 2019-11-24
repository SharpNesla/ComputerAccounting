import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'sg-login',
  template: `
      <main>
          <mat-card id="login-panel" class="mat-elevation-z8">
              <mat-toolbar id="login-header" color="primary">
                  Окна и фурнитура «Сибирские врата»
              </mat-toolbar>
              <form [formGroup]="form">
                  <div id="login-panel-content">
                      <mat-form-field appearance="outline">
                          <mat-label>Логин</mat-label>
                          <input formControlName="email" matInput placeholder="Логин">
                          <mat-icon matSuffix>account_circle</mat-icon>
                      </mat-form-field>
                      <mat-form-field appearance="outline">
                          <mat-label>Пароль</mat-label>
                          <input formControlName="password" matInput
                                 placeholder="Пароль" type="password">
                          <mat-icon matSuffix>vpn_key</mat-icon>
                      </mat-form-field>
                      <button color="primary" (click)="login()"
                              mat-raised-button>Войти</button>
                  </div>
              </form>

          </mat-card>
      </main>`,
  styles: [`
      main {
          width: 100vw;
          height: 100vh;
          background: url("../../assets/LoginBackground2.png") center;
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

      #login-header {
          border-radius: 4px 4px 0px 0px;
      }
  `]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService,
              private router : Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.auth.login(val.email, val.password)
        .subscribe(
          x => {
            console.log("User is logged in");
          },
          err =>{

          }
        );
    }
  }

  ngOnInit() {
  }

}
