import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-dashboard',
  template: `
      <main>
        <sg-appbar-base></sg-appbar-base>
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
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
