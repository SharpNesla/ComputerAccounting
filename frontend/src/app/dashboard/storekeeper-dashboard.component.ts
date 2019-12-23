import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-storekeeper-dashboard',
  template: `
      <sg-drawer-appbar-base>
          <header>Обзор: кладовщик</header>
          <mat-tab-group animationDuration="0ms" color="accent" backgroundColor="primary">
              <mat-tab label="Комплектующие, находящиеся на складе">
                  <sg-part-grid [onlyStored]="true"></sg-part-grid>
              </mat-tab>
              <mat-tab label="Комплектующие, вышедшие из строя">
                  <sg-part-grid [onlyBroken]="true"></sg-part-grid>
              </mat-tab>
          </mat-tab-group>
      </sg-drawer-appbar-base>`,
})
export class StorekeeperDashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
