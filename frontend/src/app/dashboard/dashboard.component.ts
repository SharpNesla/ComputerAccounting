import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-dashboard',
  template: `
      <sg-drawer-appbar-base>
          <header>Обзор</header>
      </sg-drawer-appbar-base>`,
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
