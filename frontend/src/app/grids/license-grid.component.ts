import {Component} from '@angular/core';
import {LicenseService} from '../services/license.service';
import {License} from '../entities/license';
import {EntityGridBase} from './entity-grid-base';
import {MatDialog} from '@angular/material/dialog';
import {LicenseCardComponent} from '../cards/license-card.component';
import {CardService} from '../cards/card.service';


@Component({
  selector: 'sg-license-grid',
  template: `

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


              <ng-container matColumnDef="cost">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Стоимость</th>
                  <td mat-cell *matCellDef="let element"> {{element.Cost}} ₽
                  </td>
              </ng-container>

              <ng-container matColumnDef="max_applies">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Количество мест</th>
                  <td mat-cell *matCellDef="let element"> {{element.MaxApplyCount}}
                  </td>
              </ng-container>

              <ng-container matColumnDef="apply_status">
                  <th mat-header-cell *matHeaderCellDef>Применена</th>
                  <td mat-cell *matCellDef="let element"> {{element.SoftwareCount}} /
                      {{element.MaxApplyCount}}
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
  constructor(licenses: LicenseService, private dialogref: MatDialog, cardService: CardService) {
    super(licenses, dialogref,
      ['select', 'id', 'cost', 'max_applies', 'apply_status', 'info'],
      cardService,
      LicenseCardComponent);
  }
}
