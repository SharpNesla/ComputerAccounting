import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-admin-dashboard',
  template: `
      <sg-drawer-appbar-base>
          <header>Обзор</header>
      </sg-drawer-appbar-base>`,
})
export class AdminDashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
