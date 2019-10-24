import {Component, OnInit} from '@angular/core';
import {AppbarBaseComponent} from "../utils/layouts/appbar-base.component";

@Component({
  selector: 'sg-dashboard',
  template: `
      <sg-appbar-base></sg-appbar-base>`,
  styles: [`
      main {
          width: 100vw;
          height: 100vh;
          background: url("../../assets/LoginBackground.png") center;
          background-size: cover;
          display: flex;
      }

      #login-panel {
          margin: auto;
          width: 500px;
      }
  `]
})
export class DashboardComponent extends AppbarBaseComponent implements OnInit {


  ngOnInit() {
  }

}
