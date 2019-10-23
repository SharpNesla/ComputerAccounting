import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-login',
  template: `
      <mat-card id="login-panel">
      
      </mat-card>`,
  styles:[`
    #login-panel{
        width: 300px;
    }
  `]
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
