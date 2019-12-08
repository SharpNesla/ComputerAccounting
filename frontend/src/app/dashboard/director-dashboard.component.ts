import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-director-dashboard',
  template: `
      <sg-drawer-appbar-base>
          <header>Обзор: директор</header>
          <ngx-charts-bar-vertical></ngx-charts-bar-vertical>
      </sg-drawer-appbar-base>`,
})
export class DirectorDashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
