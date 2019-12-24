import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ComputerService} from '../services/computer.service';
import {ComputerExtension, ComputerType} from '../entities/computer';
import {EntityGridBase} from './entity-grid-base';
import {MatDialog} from '@angular/material/dialog';
import {ComputerCardComponent} from '../cards/computer-card.component';
import {CardService} from '../cards/card.service';
import {VisibilitiesService} from '../login/visibilities.service';
import {colorScheme} from '../analytics/color-scheme';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

class ComputerFilter {
  UsersCountLowBound: number;
  UsersCountHighBound: number;
  Type: ComputerType;
}


@Component({
  selector: 'sg-computer-grid',
  template: `
      <ng-template #table>
          <div class="sg-table-container">
              <table mat-table matSort matSortActive="id" [dataSource]="this.entities"
                     [class.sg-table-compact]="isCompact"
                     (matSortChange)="changeSort($event.direction, $event.active)"
                     class="sg-table">
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

                  <!-- Name Column -->
                  <ng-container matColumnDef="name">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Имя</th>
                      <td mat-cell *matCellDef="let element"> {{element.Name}} </td>
                  </ng-container>

                  <ng-container matColumnDef="inventory_id">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Инвентарный номер</th>
                      <td mat-cell *matCellDef="let element"> {{element.InventoryId}} </td>
                  </ng-container>

                  <ng-container matColumnDef="type">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Тип</th>
                      <td mat-cell *matCellDef="let element"> {{element.Type | computerType}}
                      </td>
                  </ng-container>

                  <ng-container matColumnDef="users_count">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Пользователей</th>
                      <td mat-cell *matCellDef="let element"> {{element.UsersCount}}
                      </td>
                  </ng-container>

                  <ng-container matColumnDef="info" stickyEnd>
                      <th mat-header-cell *matHeaderCellDef></th>
                      <td mat-cell *matCellDef="let element"
                          [class.sg-table-action-button-container-compact]="isCompact"
                          class="sg-table-action-button-container">
                          <button mat-icon-button
                                  [disabled]="!((visibilities)?.AllDirectorsAndAdmins | async)"
                                  *ngIf="!isCompact" (click)="remove(element)">
                              <mat-icon>delete</mat-icon>
                          </button>
                          <button mat-icon-button *ngIf="!isCompact"
                                  [disabled]="!((visibilities)?.AllDirectorsAndAdmins | async)"
                                  [routerLink]="'/computers/edit/' + element.Id">
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
                      <mat-checkbox [(ngModel)]="filterApplies.ByUsersCount">По количеству пользователей</mat-checkbox>
                      <mat-form-field>
                          <input [(ngModel)]="filter.UsersCountLowBound"
                                 [disabled]="!filterApplies.ByUsersCount" matInput placeholder="Нижняя граница">
                      </mat-form-field>
                      <mat-form-field>
                          <input [(ngModel)]="filter.UsersCountHighBound"
                                 [disabled]="!filterApplies.ByUsersCount" matInput placeholder="Верхняя граница">
                      </mat-form-field>
                  </div>

                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox [(ngModel)]="filterApplies.ByType">По типу</mat-checkbox>
                      <mat-form-field>
                          <mat-select [disabled]="!filterApplies.ByType"
                                      [(ngModel)]="filter.Type" placeholder="Тип">
                              <mat-option *ngFor="let elem of types" [value]="elem">
                                  {{elem | computerType}}
                              </mat-option>
                          </mat-select>
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
          </mat-tab>
      </mat-tab-group>

      <sg-grid-bottom-bar router-link="/computers/add"
                          icon="desktop_mac"
                          [isCompact]="isCompact"
                          [count]="this.count"
                          (search)="searchString = $event"
                          (toggleFilters)="filterState = $event"
                          [add-visibility]="visibilities?.AllDirectorsAndAdmins | async"
                          (Paginate)="this.paginate($event.offset, $event.limit)"
                          entity-name="компьютеров"></sg-grid-bottom-bar>`,
  styles: [`:host {
      flex-grow: 1;
      overflow: hidden;
  }`]
})
export class ComputerGridComponent extends EntityGridBase<ComputerExtension, ComputerService> {
  get isAnalyticsDisplayed(): boolean {
    return this._isAnalyticsDisplayed;
  }

  @Input('display-analytics') set isAnalyticsDisplayed(value: boolean) {
    this._isAnalyticsDisplayed = value;
    if (value) {
      this.refreshResults();
    }
  }

  refreshResults() {
    this.service.getCountBySubs()
      .pipe(map(x => {
        const mapped = x.map(sub => ({
          name: `${sub.Id} ${sub.Name} ${sub.Address}`,
          value: sub.ComputersCount
        }));
        console.log(mapped);
        return mapped;
      }))
      .subscribe(x => {
        console.log(x);
        this.results = x;
      });
  }


  private _isAnalyticsDisplayed: boolean;

  colorScheme = colorScheme;
  results = [];

  filterApplies = {
    ByUsersCount: false,
    ByType: false
  };

  types = [
    ComputerType.PC,
    ComputerType.Server,
    ComputerType.Laptop,
    ComputerType.Tablet,
    ComputerType.NetBook,
    ComputerType.NetTop,
    ComputerType.SmartPhone,
    ComputerType.Other
  ];

  filter: ComputerFilter = new ComputerFilter();

  constructor(computers: ComputerService, private dialogref: MatDialog, cardService: CardService,
              public visibilities: VisibilitiesService) {
    super(computers, dialogref,
      ['select', 'id', 'name', 'inventory_id', 'type', 'users_count', 'info'],
      cardService,
      ComputerCardComponent);
  }

  constructFilter(): object {
    const filter = new ComputerFilter();
    if (this.filterApplies.ByUsersCount) {
      filter.UsersCountLowBound = this.filter.UsersCountLowBound;
      filter.UsersCountHighBound = this.filter.UsersCountHighBound;
    }

    if (this.filterApplies.ByType) {
      filter.Type = this.filter.Type;
    }

    return filter;
  }
}
