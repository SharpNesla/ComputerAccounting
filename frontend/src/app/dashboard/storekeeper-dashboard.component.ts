import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-storekeeper-dashboard',
  template: `
      <sg-drawer-appbar-base>
          <header>Обзор</header>
      </sg-drawer-appbar-base>`,
})
export class StorekeeperDashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
