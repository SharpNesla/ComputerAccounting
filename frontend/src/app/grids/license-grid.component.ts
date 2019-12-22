import {Component, Input} from '@angular/core';
import {LicenseService} from '../services/license.service';
import {License} from '../entities/license';
import {EntityGridBase} from './entity-grid-base';
import {MatDialog} from '@angular/material/dialog';
import {LicenseCardComponent} from '../cards/license-card.component';
import {CardService} from '../cards/card.service';


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
                          {{element.Expired ? 'Просрочена' : 'Активна'}}
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
                      <mat-checkbox>По стоимости</mat-checkbox>
                      <mat-form-field>
                          <input matInput placeholder="Нижняя граница">
                      </mat-form-field>
                      <mat-form-field>
                          <input matInput placeholder="Верхняя граница">
                      </mat-form-field>
                  </div>
                  
                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox>По дате приобретения</mat-checkbox>
                      <mat-form-field>
                          <input matInput placeholder="Нижняя граница">
                      </mat-form-field>
                      <mat-form-field>
                          <input matInput placeholder="Верхняя граница">
                      </mat-form-field>
                  </div>

                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox>По дате истечения</mat-checkbox>
                      <mat-form-field>
                          <input matInput placeholder="Нижняя граница">
                      </mat-form-field>
                      <mat-form-field>
                          <input matInput placeholder="Верхняя граница">
                      </mat-form-field>
                  </div>

                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox>По количеству применений</mat-checkbox>
                      <mat-form-field>
                          <input matInput placeholder="Нижняя граница">
                      </mat-form-field>
                      <mat-form-field>
                          <input matInput placeholder="Верхняя граница">
                      </mat-form-field>
                  </div>
                  
                  <div class="sg-search-drawer-ruleset">
                      <mat-checkbox>По типу ПО</mat-checkbox>
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
<!--              <ngx-charts-bar-vertical-2d-->
<!--                      [view]="view"-->
<!--                      [scheme]="colorScheme"-->
<!--                      [results]="multi"-->
<!--                      [gradient]="gradient"-->
<!--                      [xAxis]="showXAxis"-->
<!--                      [yAxis]="showYAxis"-->
<!--                      [legend]="showLegend"-->
<!--                      [showXAxisLabel]="showXAxisLabel"-->
<!--                      [showYAxisLabel]="showYAxisLabel"-->
<!--                      [xAxisLabel]="xAxisLabel"-->
<!--                      [yAxisLabel]="yAxisLabel"-->
<!--                      [legendTitle]="legendTitle"-->
<!--                      (select)="onSelect($event)"-->
<!--                      (activate)="onActivate($event)"-->
<!--                      (deactivate)="onDeactivate($event)"></ngx-charts-bar-vertical-2d>-->
          </mat-tab>
      </mat-tab-group>
      <sg-grid-bottom-bar router-link="/licenses/add"
                          icon="shop"
                          [count]="this.count"
                          (Paginate)="this.paginate($event.offset, $event.limit)"
                          entity-name="Лицензий"
                          (search)="searchString = $event"
                          (toggleFilters)="filterState = $event"
                          [isCompact]="this.isCompact"></sg-grid-bottom-bar>`,
  styles: [`:host {
      flex-grow: 1;
      overflow: hidden;
  }`]
})
export class LicenseGridComponent extends EntityGridBase<License, LicenseService> {
  @Input('display-analytics') isAnalyticsDisplayed: boolean;

  constructor(licenses: LicenseService, private dialogref: MatDialog, cardService: CardService) {
    super(licenses, dialogref,
      ['select', 'id', 'cost', 'purchased_at', 'expired_at', 'software_count',
        'expired', 'info'],
      cardService,
      LicenseCardComponent);
  }
}
