import {Component, Input} from '@angular/core';
import {PartExtension, PartState} from '../entities/part';
import {PartService} from '../services/part.service';
import {EntityGridBase} from './entity-grid-base';
import {MatDialog} from '@angular/material/dialog';
import {PartCardComponent} from '../cards/part-card.component';
import {CardService} from '../cards/card.service';
import {first, map} from 'rxjs/operators';
import * as moment from 'moment';
import {PartTypeExtension} from '../entities/part-type';
import {VisibilitiesService} from '../login/visibilities.service';
import {ComputerExtension} from '../entities/computer';
import {SubsidiaryExtension} from '../entities/subsidiary';
import {DateSlice} from '../analytics/chartable-by-date';

class PartFilter {
  Computer: ComputerExtension;
  ComputerId: number;

  Subsidiary: SubsidiaryExtension;
  SubsidiaryId: number;

  PartType: PartTypeExtension;
  PartTypeId: number;

  IsValid: boolean;
}


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
                      <th mat-header-cell *matHeaderCellDef>Состояние</th>
                      <td mat-cell *matCellDef="let element">


                          <ng-container *ngIf="element.IsValid && !element.ComputerId">
                              На складе
                          </ng-container>

                          <ng-container *ngIf="!!element.ComputerId">
                              Установлено
                          </ng-container>

                          <ng-container *ngIf="!element.IsValid && !element.ComputerId">
                              Вышло из строя
                          </ng-container>
                      </td>
                  </ng-container>

                  <ng-container matColumnDef="part_type_id">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Тип ПО</th>
                      <td mat-cell *matCellDef="let element">
                          №{{element.PartType.Id}} {{element.PartType.Model}}
                          {{element.PartType.Category | partCategory}} </td>
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
                  <div *ngIf="visibilities.LeadDirectorsAndAdmins | async" class="sg-search-drawer-ruleset">
                      <mat-checkbox [(ngModel)]="filterApplies.BySubsidiary">По филиалу</mat-checkbox>
                      <sg-subsidiary-search hint="Филилал"
                                            [disabled]="!filterApplies.BySubsidiary"></sg-subsidiary-search>
                  </div>
                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox [(ngModel)]="filterApplies.ByComputer">По компьютеру</mat-checkbox>
                      <sg-computer-search hint="Компьютер"
                                          [disabled]="!filterApplies.ByComputer"></sg-computer-search>
                  </div>
                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox [(ngModel)]="filterApplies.ByPartType">По типу</mat-checkbox>
                      <sg-part-type-search hint="Тип комплектующего"
                                           [disabled]="!filterApplies.ByPartType"></sg-part-type-search>
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
              <div class="sg-grid-chart-subtotals-container">
                  <div class="sg-grid-chart-container">
                      <ngx-charts-bar-vertical
                              [scheme]="colorScheme"
                              [results]="results"
                              [xAxis]="true"
                              [yAxis]="true"
                              [roundDomains]="false"
                              [xAxisLabel]="true"
                              [yAxisLabel]="true"
                              legendTitle="Статус комплектующего"
                              [animations]="false"></ngx-charts-bar-vertical>

                  </div>
                  <div class="sg-grid-subtotals-container">
                      <h2 class="mat-headline">ИТОГО</h2>
                      <mat-divider></mat-divider>
                      <p class="mat-body">Всего комплектующих: {{subtotals?.Count}}</p>
                  </div>
              </div>
          </mat-tab>
      </mat-tab-group>
      <sg-grid-bottom-bar router-link="/parts/add"
                          icon="memory"
                          [count]="this.count"
                          (Paginate)="this.paginate($event.offset, $event.limit)"
                          entity-name="комплектующих"
                          (search)="searchString = $event"
                          [add-visibility]="!onlyStored && !onlyBroken"
                          (toggleFilters)="filterState = $event"
                          [isCompact]="this.isCompact"></sg-grid-bottom-bar>`
})
export class PartGridComponent extends EntityGridBase<PartExtension, PartService> {
  get dateSlice(): DateSlice {
    return this._dateSlice;
  }

  @Input('date-slice') set dateSlice(value: DateSlice) {
    this._dateSlice = value;
    console.log(value);
    this.refreshResults();
  }

  get isAnalyticsDisplayed(): boolean {
    return this._isAnalyticsDisplayed;
  }

  @Input('display-analytics') set isAnalyticsDisplayed(value: boolean) {
    this._isAnalyticsDisplayed = value;

    this.refreshResults();
  }

  private _dateSlice: DateSlice;
  @Input('analytics-criteria') analyticsCriteria;

  private _isAnalyticsDisplayed: boolean;

  constructor(public visibilities: VisibilitiesService,
              service: PartService, dialog: MatDialog, cardService: CardService) {
    super(service, dialog, ['select', 'id', 'state', 'part_type_id', 'info'],
      cardService,
      PartCardComponent);
  }

  subtotals;

  refreshResults() {
    this.service.getCount(this.constructFilter()).pipe(first()).subscribe(x => {
      this.subtotals = {Count: x};
    });

    this.service.getChartRes(this.dateSlice, null, null)
      .pipe(map(x => {

        return x.map(y => ({
          name: moment(y.date).format('YYYY.MM.DD').toString(),
          value: y.value[0]['count']
        }));
      }))
      .subscribe(x => {
        console.log(x);
        this.results = x;
      });
  }

  results = [];

  colorScheme = {
    domain: ['#0060b7', '#d50061', '#AAAAAA']
  };

  filterApplies = {
    BySubsidiary: false,
    ByComputer: false,
    ByPartType: false
  };

  @Input() onlyStored: boolean;
  @Input() onlyBroken: boolean;

  partStates = [
    PartState.InComputer,
    PartState.InStore,
    PartState.Broken
  ];

  filter: PartFilter = new PartFilter();

  constructFilter(): object {
    const filter = new PartFilter();

    if (this.filterApplies.BySubsidiary && this.filter.Subsidiary) {
      filter.SubsidiaryId = this.filter.Subsidiary.Id;
    }

    if (this.filterApplies.ByComputer && this.filter.Computer) {
      filter.ComputerId = this.filter.Computer.Id;
    }

    if (this.filterApplies.ByPartType && this.filter.PartType) {
      filter.PartTypeId = this.filter.PartType.Id;
    }
    if (this.onlyBroken) {
      filter.IsValid = false;
    }
    if (this.onlyStored) {
      filter.Computer = null;
    }

    return filter;
  }
}
