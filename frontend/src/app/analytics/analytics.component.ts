import {Component, OnInit} from '@angular/core';

export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];



@Component({
  selector: 'sg-analytics',
  template: `
      <sg-drawer-appbar-base>
          <header>Аналитика</header>
          <mat-tab-group animationDuration="0s" color="accent" backgroundColor="primary">
              <mat-tab label="Данные">
                  
              </mat-tab>
              <mat-tab label="Графики" class="ngx-charts-dark-theme">
                  <ngx-charts-bar-vertical-2d
                          [view]="view"
                          [scheme]="colorScheme"
                          [results]="multi"
                          [gradient]="gradient"
                          [xAxis]="showXAxis"
                          [yAxis]="showYAxis"
                          [legend]="showLegend"
                          [showXAxisLabel]="showXAxisLabel"
                          [showYAxisLabel]="showYAxisLabel"
                          [xAxisLabel]="xAxisLabel"
                          [yAxisLabel]="yAxisLabel"
                          [legendTitle]="legendTitle"
                          (select)="onSelect($event)"
                          (activate)="onActivate($event)"
                          (deactivate)="onDeactivate($event)"></ngx-charts-bar-vertical-2d>
              </mat-tab>
          </mat-tab-group>
          <mat-toolbar color="primary"></mat-toolbar>
      </sg-drawer-appbar-base>`,
})
export class AnalyticsComponent implements OnInit {

  multi: any[] = multi;
  view: any[] = [700, 400];

  ngOnInit() {
  }


  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor() {

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
