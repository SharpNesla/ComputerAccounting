import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'sg-analytics',
  template: `
      <sg-drawer-appbar-base>
          <header>Аналитика</header>
          <ng-container [ngSwitch]="entityKind">
              <sg-license-grid display-analytics="true" *ngSwitchCase="0"></sg-license-grid>
              <sg-part-grid display-analytics="true" *ngSwitchCase="1"></sg-part-grid>
              <sg-computer-grid display-analytics="true" *ngSwitchCase="2"></sg-computer-grid>
          </ng-container>
          <mat-toolbar color="primary">
              <mat-card style="font-size: 1rem">
                  <mat-form-field>
                      <mat-select [(ngModel)]="entityKind">
                          <mat-option *ngFor="let elem of kinds" [value]="elem.value">
                              {{elem.label}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>

                  <mat-form-field>
                      <mat-select [(ngModel)]="entityKind" placeholder="">
                          <mat-option *ngFor="let elem of kinds" [value]="elem.value">
                              {{elem.label}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </mat-card>
          </mat-toolbar>
      </sg-drawer-appbar-base>`,
})
export class AnalyticsComponent implements OnInit {
  ngOnInit(): void {
  }

  entityKind: number = 0;

  kinds = [
    {label: 'Лицензии', value: 0},
    {label: 'Комплектующие', value: 1},
    {label: 'Компьютеры', value: 2}
  ];
}
