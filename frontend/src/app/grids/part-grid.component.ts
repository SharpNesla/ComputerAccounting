import {Component, Input, OnInit} from '@angular/core';
import {PartTypeService} from '../services/part-type.service';
import {Observable} from 'rxjs';
import {Computer} from '../entities/computer';
import {EditorBase} from '../editors/editor-base';
import {Part} from '../entities/part';
import {PartService} from '../services/part.service';
import {EntityGridBase} from './entity-grid-base';
import {MatDialog} from '@angular/material/dialog';
import {PartCardComponent} from '../cards/part-card.component';
import {CardService} from '../cards/card.service';


export var multi = [
  {
    'name': 'Germany',
    'series': [
      {
        'name': '2010',
        'value': 7300000
      },
      {
        'name': '2011',
        'value': 8940000
      }
    ]
  },

  {
    'name': 'USA',
    'series': [
      {
        'name': '2010',
        'value': 7870000
      },
      {
        'name': '2011',
        'value': 8270000
      }
    ]
  },

  {
    'name': 'France',
    'series': [
      {
        'name': '2010',
        'value': 5000002
      },
      {
        'name': '2011',
        'value': 5800000
      }
    ]
  }
];

@Component({
  selector: 'sg-part-grid',
  template: `
      <ng-template #table>
          <div class="sg-table-container">
              <table mat-table matSort matSortActive="id" [dataSource]="this.entities"
                     [class.sg-table-compact]="isCompact"
                     (matSortChange)="changeSort($event.direction, $event.active)" class="sg-table">
                  <ng-container matColumnDef="select">
                      <th mat-header-cell *matHeaderCellDef>
                          <mat-checkbox (change)="$event ? masterToggle() : null"
                                        [checked]="selection.hasValue() && isAllSelected()"
                                        [indeterminate]="selection.hasValue() && !isAllSelected()">
                          </mat-checkbox>
                      </th>
                      <td mat-cell class="sg-table-checkbox" *matCellDef="let row">
                          <mat-checkbox (click)="$event.stopPropagation()"
                                        (change)="$event ? selection.toggle(row) : null"
                                        [checked]="selection.isSelected(row)">
                          </mat-checkbox>
                      </td>
                  </ng-container>

                  <ng-container matColumnDef="id">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>№</th>
                      <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
                  </ng-container>

                  <ng-container matColumnDef="state">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Состояние</th>
                      <td mat-cell *matCellDef="let element"> {{element.State | partState}} </td>
                  </ng-container>

                  <ng-container matColumnDef="info" stickyEnd>
                      <th mat-header-cell *matHeaderCellDef></th>
                      <td mat-cell *matCellDef="let element"
                          [class.sg-table-action-button-container-compact]="isCompact"
                          class="sg-table-action-button-container">
                          <button mat-icon-button
                                  *ngIf="!isCompact" (click)="remove(element)">
                              <mat-icon>delete</mat-icon>
                          </button>
                          <button mat-icon-button *ngIf="!isCompact"
                                  [routerLink]="'/parts/edit/' + element.Id">
                              <mat-icon>edit</mat-icon>
                          </button>
                          <button mat-icon-button
                                  (click)="showInfoCard(element)">
                              <mat-icon class="sg-table-info-button">error_outline</mat-icon>
                          </button>
                      </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="DisplayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: DisplayedColumns;"></tr>
              </table>
              <div class="sg-search-drawer mat-elevation-z4" [class.sg-search-drawer-active]="filterState">
                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox>По количеству ПО</mat-checkbox>
                      <mat-form-field>
                          <input matInput placeholder="Нижняя граница">
                      </mat-form-field>
                      <mat-form-field>
                          <input matInput placeholder="Верхняя граница">
                      </mat-form-field>
                  </div>
              </div>
          </div>
      </ng-template>

      <ng-container *ngIf="!isAnalyticsDisplayed">
          <ng-container *ngTemplateOutlet="table">
          </ng-container>
      </ng-container>

      <mat-tab-group *ngIf="isAnalyticsDisplayed" animationDuration="0s" color="accent" backgroundColor="primary">
          <mat-tab label="Данные">
              <ng-container *ngTemplateOutlet="table"></ng-container>
          </mat-tab>
          <mat-tab label="Графики" class="ngx-charts-dark-theme">
              <ngx-charts-bar-vertical-2d
                      [scheme]="colorScheme"
                      [results]="multi"
                      [xAxis]="showXAxis"
                      [yAxis]="showYAxis"
                      [xAxisLabel]="xAxisLabel"
                      [yAxisLabel]="yAxisLabel"
                      [legendTitle]="legendTitle"

                      [animations]="false"></ngx-charts-bar-vertical-2d>
          </mat-tab>
      </mat-tab-group>


      <sg-grid-bottom-bar router-link="/parts/add"
                          icon="memory"
                          [count]="this.count"
                          (Paginate)="this.paginate($event.offset, $event.limit)"
                          entity-name="комплектующих"
                          (search)="searchString = $event"
                          (toggleFilters)="filterState = $event"
                          [isCompact]="this.isCompact"></sg-grid-bottom-bar>`
})
export class PartGridComponent extends EntityGridBase<Part, PartService> {
  get isAnalyticsDisplayed(): boolean {
    return this._isAnalyticsDisplayed;
  }

  @Input('display-analytics') set isAnalyticsDisplayed(value: boolean) {
    this._isAnalyticsDisplayed = value;
  }

  private _isAnalyticsDisplayed: boolean;

  constructor(service: PartService, dialog: MatDialog, cardService: CardService) {
    super(service, dialog, ['select', 'id', 'state', 'info'],
      cardService,
      PartCardComponent);
  }


  multi: any[] = multi;

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#0060b7', '#d50061', '#AAAAAA']
  };
}
