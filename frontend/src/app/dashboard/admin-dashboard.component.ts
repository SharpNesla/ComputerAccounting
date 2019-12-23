import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-admin-dashboard',
  template: `
      <sg-drawer-appbar-base>
          <header>Обзор: администратор филиала</header>

          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab label="Истёкшие лицензии">
                  <sg-license-grid [onlyExpired]="true"></sg-license-grid>
              </mat-tab>
              <mat-tab label="Активные лицензии">
                  <sg-license-grid [onlyActive]="true"></sg-license-grid>
              </mat-tab>
          </mat-tab-group>
      </sg-drawer-appbar-base>`,
})
export class AdminDashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
