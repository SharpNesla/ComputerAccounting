import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-analycs',
  template: `
      <sg-drawer-appbar-base>
          <header>Аналитика</header>
          <mat-tab-group animationDuration="0s" color="accent" backgroundColor="primary">
              <mat-tab label="Данные">
                  
              </mat-tab>
              <mat-tab label="Графики">

              </mat-tab>
          </mat-tab-group>
      </sg-drawer-appbar-base>`,
})
export class AnalyticsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
