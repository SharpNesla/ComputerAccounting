import {Component, Input} from '@angular/core';
import {LicenseService} from '../services/license.service';
import {LicenseExtension} from '../entities/license';
import {EntityGridBase} from './entity-grid-base';
import {MatDialog} from '@angular/material/dialog';
import {LicenseCardComponent} from '../cards/license-card.component';
import {CardService} from '../cards/card.service';
import {SoftwareTypeExtension} from '../entities/software-type';
import {DateSlice} from '../analytics/chartable-by-date';
import {colorScheme} from '../analytics/color-scheme';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

class LicenseFilter {
  CostLowBound: number;
  CostHighBound: number;

  PurchasedAtLowBound: Date;
  PurchasedAtHighBound: Date;

  ExpiredAtLowBound: Date;
  ExpiredAtHighBound: Date;

  SoftwareCountLowBound: number;
  SoftwareCountHighBound: number;

  SoftwareType: SoftwareTypeExtension;
  SoftwareTypeId: number;

  Expired: boolean;
}

@Component({
  selector: 'sg-license-grid',
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

                  <ng-container matColumnDef="purchased_at">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Приобретена</th>
                      <td mat-cell *matCellDef="let element"> {{element.PurchasedAt | date:'yyyy.MM.dd'}}
                      </td>
                  </ng-container>

                  <ng-container matColumnDef="expired_at">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Истекает</th>
                      <td mat-cell *matCellDef="let element"> {{element.ExpiredAt | date:'yyyy.MM.dd'}}
                      </td>
                  </ng-container>

                  <ng-container matColumnDef="cost">
                      <th mat-header-cell mat-sort-header *matHeaderCellDef>Стоимость</th>
                      <td mat-cell *matCellDef="let element"> {{element.Cost}} ₽
                      </td>
                  </ng-container>

                  <ng-container matColumnDef="software_count">
                      <th mat-header-cell *matHeaderCellDef>Применена</th>
                      <td mat-cell *matCellDef="let element"> {{element.SoftwareCount}} /
                          {{element.MaxApplyCount}}
                      </td>
                  </ng-container>

                  <ng-container matColumnDef="expired">
                      <th mat-header-cell *matHeaderCellDef>Применена</th>
                      <td mat-cell *matCellDef="let element">
                          {{element.Expired ? 'Истекла' : 'Активна'}}
                      </td>
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
                                  [routerLink]="'/licenses/edit/' + element.Id">
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
                      <mat-checkbox [(ngModel)]="filterApplies.ByCost">По стоимости</mat-checkbox>
                      <mat-form-field>
                          <input [disabled]="!filterApplies.ByCost"
                                 type="number" step=0.01 min="0.01" matInput
                                 [(ngModel)]="filter.CostLowBound" placeholder="Нижняя граница">
                      </mat-form-field>
                      <mat-form-field>
                          <input [disabled]="!filterApplies.ByCost"
                                 type="number" step=0.01 min="0.01" matInput
                                 [(ngModel)]="filter.CostHighBound" placeholder="Верхняя граница">
                      </mat-form-field>
                  </div>

                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox [(ngModel)]="filterApplies.ByPurchasedAt">
                          По дате приобретения
                      </mat-checkbox>
                      <mat-form-field>
                          <input matInput [matDatepicker]="purchasedAtLowPicker"
                                 [(ngModel)]="filter.PurchasedAtLowBound"
                                 [disabled]="!filterApplies.ByPurchasedAt"
                                 placeholder="Нижняя граница">
                          <mat-datepicker-toggle matSuffix [for]="purchasedAtLowPicker"></mat-datepicker-toggle>
                          <mat-datepicker #purchasedAtLowPicker></mat-datepicker>
                      </mat-form-field>
                      <mat-form-field>
                          <input
                                  [matDatepicker]="purchasedAtHighPicker"
                                  [(ngModel)]="filter.PurchasedAtHighBound"
                                  [disabled]="!filterApplies.ByPurchasedAt"
                                  matInput placeholder="Верхняя граница">
                          <mat-datepicker-toggle matSuffix [for]="purchasedAtHighPicker"></mat-datepicker-toggle>
                          <mat-datepicker #purchasedAtHighPicker></mat-datepicker>
                      </mat-form-field>
                  </div>

                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox [(ngModel)]="filterApplies.ByExpiredAt">
                          По дате истечения
                      </mat-checkbox>
                      <mat-form-field>
                          <input [matDatepicker]="expiredAtLowPicker"
                                 [(ngModel)]="filter.ExpiredAtLowBound"
                                 [disabled]="!filterApplies.ByPurchasedAt" matInput placeholder="Нижняя граница">
                          <mat-datepicker-toggle matSuffix [for]="expiredAtLowPicker"></mat-datepicker-toggle>
                          <mat-datepicker #expiredAtLowPicker></mat-datepicker>
                      </mat-form-field>
                      <mat-form-field>
                          <input [matDatepicker]="expiredAtHighPicker"
                                 [(ngModel)]="filter.ExpiredAtHighBound"
                                 [disabled]="!filterApplies.ByExpiredAt" matInput placeholder="Верхняя граница">
                          <mat-datepicker-toggle matSuffix [for]="expiredAtHighPicker"></mat-datepicker-toggle>
                          <mat-datepicker #expiredAtHighPicker></mat-datepicker>
                      </mat-form-field>
                  </div>

                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox [(ngModel)]="filterApplies.BySoftwareCount">
                          По кол-ву применений
                      </mat-checkbox>
                      <mat-form-field>
                          <input type="number" min="0" step="1"
                                 [disabled]="!filterApplies.BySoftwareCount" matInput placeholder="Нижняя граница">
                      </mat-form-field>
                      <mat-form-field>
                          <input type="number" min="1" step="1"
                                 [disabled]="!filterApplies.BySoftwareCount" matInput placeholder="Верхняя граница">
                      </mat-form-field>
                  </div>

                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox [(ngModel)]="filterApplies.BySoftwareType">По типу ПО</mat-checkbox>
                      <sg-software-type-search hint="Тип ПО"
                                               [disabled]="!filterApplies.BySoftwareType"></sg-software-type-search>
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
                      [results]="results"
                      [xAxis]="true"
                      [yAxis]="true"
                      [roundDomains]="false"
                      [xAxisLabel]="true"
                      [yAxisLabel]="true"
                      legendTitle="Статус комплектующего"
                      [animations]="false"></ngx-charts-bar-vertical-2d>
          </mat-tab>
      </mat-tab-group>
      <sg-grid-bottom-bar router-link="/licenses/add"
                          icon="shop"
                          [count]="this.count"
                          (Paginate)="this.paginate($event.offset, $event.limit)"
                          entity-name="Лицензий"
                          (search)="searchString = $event"
                          [add-visibility]="!onlyExpired && !onlyActive"
                          (toggleFilters)="filterState = $event"
                          [isCompact]="this.isCompact"></sg-grid-bottom-bar>`,
  styles: [`:host {
      flex-grow: 1;
      overflow: hidden;
  }`]
})
export class LicenseGridComponent extends EntityGridBase<LicenseExtension, LicenseService> {
  get isAnalyticsDisplayed(): boolean {
    return this._isAnalyticsDisplayed;
  }

  @Input('value') isByCount;

  @Input('display-analytics') set isAnalyticsDisplayed(value: boolean) {
    this._isAnalyticsDisplayed = value;

    this.service.getChartRes(0, null, null)
      .pipe(map(x => {
        return x.map(y => {
          if (this.isByCount) {
            return ({
              name: moment(y.date).format('YYYY.MM.DD').toString(),
              series: y.value.map(z => ({name: 'Количество', value: z.count}))
            });
          } else {
            return ({
              name: moment(y.date).format('YYYY.MM.DD').toString(),
              series: y.value.map(z => ({name: 'Общая цена (в ₽)', value: Number.parseFloat(z['sum_cost'])}))
            });
          }
        })
      }))
      .subscribe(x => {
        console.log(x);
        this.results = x;
      });
  }

  @Input('date-slice') dateSlice: DateSlice;
  @Input('analytics-criteria') analyticsCriteria;

  private _isAnalyticsDisplayed: boolean;

  @Input() onlyExpired: boolean;
  @Input() onlyActive: boolean;

  filterApplies = {
    ByCost: false,
    ByPurchasedAt: false,
    ByExpiredAt: false,
    BySoftwareCount: false,
    BySoftwareType: false
  };

  colorScheme = colorScheme;
  results = [];

  filter: LicenseFilter = new LicenseFilter();

  constructor(licenses: LicenseService, private dialogref: MatDialog, cardService: CardService) {
    super(licenses, dialogref,
      ['select', 'id', 'cost', 'purchased_at', 'expired_at', 'software_count',
        'expired', 'info'],
      cardService,
      LicenseCardComponent);
  }

  constructFilter(): object {
    const filter = new LicenseFilter();

    if (this.filterApplies.ByCost) {
      filter.CostLowBound = this.filter.CostLowBound;
      filter.CostHighBound = this.filter.CostHighBound;
    }
    if (this.filterApplies.ByPurchasedAt) {
      filter.PurchasedAtLowBound = this.filter.PurchasedAtLowBound;
      filter.PurchasedAtHighBound = this.filter.PurchasedAtHighBound;
    }
    if (this.filterApplies.ByExpiredAt) {
      filter.ExpiredAtLowBound = this.filter.ExpiredAtLowBound;
      filter.ExpiredAtHighBound = this.filter.ExpiredAtHighBound;
    }
    if (this.filterApplies.BySoftwareCount) {
      filter.SoftwareCountLowBound = this.filter.SoftwareCountLowBound;
      filter.SoftwareCountHighBound = this.filter.SoftwareCountHighBound;
    }
    if (this.filterApplies.BySoftwareType && this.filter.SoftwareType) {
      filter.SoftwareTypeId = this.filter.SoftwareType.Id;
    }
    if (this.onlyExpired) {
      filter.Expired = true;
    }
    if (this.onlyActive) {
      filter.Expired = false;
    }
    return filter;
  }
}
