import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sg-analytics',
  template: `
      <sg-drawer-appbar-base>
          <header>Аналитика</header>
          <mat-tab-group animationDuration="0s" color="accent" backgroundColor="primary">
              <mat-tab label="Данные">
                  
              </mat-tab>
              <mat-tab label="Графики">
                  <ngx-charts-bar-vertical
                          [xAxis]="true"
                          [yAxis]="true"
                          [legend]="true"
                          [showXAxisLabel]="true"
                          [showYAxisLabel]="true"
                          xAxisLabel="Комплектующие"
                          yAxisLabel="Дата"></ngx-charts-bar-vertical>
              </mat-tab>
          </mat-tab-group>
          <mat-toolbar color="primary"></mat-toolbar>
      </sg-drawer-appbar-base>`,
})
export class AnalyticsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
