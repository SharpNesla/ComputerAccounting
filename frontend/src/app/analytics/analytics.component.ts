import {Component, OnInit} from '@angular/core';
import {DateSlice} from './chartable-by-date';

@Component({
  selector: 'sg-analytics',
  template: `
      <sg-drawer-appbar-base>
          <header>Аналитика</header>
          <mat-toolbar id="analytics-params-bar" color="primary">
              <mat-card class="select-input">
                  <mat-form-field class="analytics-param-select">
                      <mat-select [(ngModel)]="entityKind">
                          <mat-option *ngFor="let elem of kinds" [value]="elem.value">
                              {{elem.label}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>


              </mat-card>
              <mat-card class="select-input" *ngIf="entityKind == 0 || (entityKind == 1 && partCriteria == 0)">
                  <mat-form-field class="analytics-param-select">
                      <mat-select [(ngModel)]="dateSlice" placeholder="">
                          <mat-option *ngFor="let elem of dateSlices" [value]="elem.value">
                              {{elem.label}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </mat-card>
              <mat-card class="select-input" *ngIf="entityKind == 1">
                  <mat-form-field class="analytics-param-select">
                      <mat-select [(ngModel)]="partCriteria" placeholder="">
                          <mat-option *ngFor="let elem of partCriterias" [value]="elem.value">
                              {{elem.label}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </mat-card>
          </mat-toolbar>
          <ng-container [ngSwitch]="entityKind">

              <sg-license-grid display-analytics="true" *ngSwitchCase="0"></sg-license-grid>
              <sg-part-grid [date-slice]="dateSlice"
                            [analytics-criteria]="partCriteria"
                            display-analytics="true" *ngSwitchCase="1"></sg-part-grid>
              <sg-computer-grid display-analytics="true" *ngSwitchCase="2"></sg-computer-grid>
          </ng-container>
      </sg-drawer-appbar-base>`,
  styles: [`
      #analytics-params-bar {
          display: flex;
          font-size: 1em;    
      }

      .select-input {
          padding: 5px 4px 0 16px;
          margin-right: 1em;
      }

      .analytics-param-select {
          flex-grow: 1;
          flex-direction: column;
          margin-top: -16px;
          margin-bottom: -11px !important;
      }

  `]
})
export class AnalyticsComponent implements OnInit {
  ngOnInit(): void {
  }

  entityKind: number = 0;
  dateSlice: DateSlice = DateSlice.Month;
  partCriteria = 0;

  kinds = [
    {label: 'Лицензии', value: 0},
    {label: 'Комплектующие', value: 1},
    {label: 'Компьютеры', value: 2}
  ];

  dateSlices = [
    {label: 'День', value: DateSlice.Day},
    {label: 'Неделя', value: DateSlice.Week},
    {label: 'Месяц', value: DateSlice.Month},
    {label: 'Год', value: DateSlice.Year}
  ];

  partCriterias = [
    {label: 'По состояниям в разрезе дат', value: 0},
    {label: 'По типу', value: 1},
    {label: 'По филиалу', value: 2},
  ];
}
