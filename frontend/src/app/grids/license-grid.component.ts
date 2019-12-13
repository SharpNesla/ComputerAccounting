import {Component, OnInit, ViewChild} from '@angular/core';
import {LicenseService} from "../services/license.service";
import {License} from "../entities/license";
import {EntityGridBase} from "./entity-grid-base";
import {MatDialog} from "@angular/material/dialog";
import {LicenseCardComponent} from "../cards/license-card.component";


@Component({
  selector: 'sg-license-grid',
  template: `

      <div class="sg-table-container">
          <table mat-table [dataSource]="this.Entities"
                 [class.sg-table-compact]="isCompact" class="sg-table">
              <ng-container matColumnDef="select">
                  <th mat-header-cell *matHeaderCellDef>
                      <mat-checkbox>
                      </mat-checkbox>
                  </th>
                  <td mat-cell *matCellDef="let row" class="sg-table-checkbox">
                      <mat-checkbox>
                      </mat-checkbox>
                  </td>
              </ng-container>

              <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef>№</th>
                  <td mat-cell *matCellDef="let element"
                      (contextmenu)="onContextMenu($event, element)"> {{element.Id}} </td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Имя</th>
                  <td mat-cell *matCellDef="let element"
                      (contextmenu)="onContextMenu($event, element)"> {{element.Name}} </td>
              </ng-container>

              <ng-container matColumnDef="cost">
                  <th mat-header-cell *matHeaderCellDef>Стоимость</th>
                  <td mat-cell *matCellDef="let element"
                      (contextmenu)="onContextMenu($event, element)"> {{element.Cost}} ₽
                  </td>
              </ng-container>

              <ng-container matColumnDef="max_applies">
                  <th mat-header-cell *matHeaderCellDef>Количество мест</th>
                  <td mat-cell *matCellDef="let element"
                      (contextmenu)="onContextMenu($event, element)"> {{element.MaxApplyCount}}
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
      <div style="visibility: hidden; position: fixed"
           [style.left]="contextMenuPosition.x"
           [style.top]="contextMenuPosition.y"
           [matMenuTriggerFor]="contextMenu">
      </div>
      <mat-menu #contextMenu="matMenu">
          <ng-template matMenuContent let-item="item">
              <button mat-menu-item [routerLink]="'/licenses/edit/' + item.Id">

                  <mat-icon>edit</mat-icon>
                  Изменить
              </button>
              <button mat-menu-item (click)="remove(item)">
                  <mat-icon>remove_circle_outline</mat-icon>
                  Удалить
              </button>
          </ng-template>
      </mat-menu>
      <sg-crud router-link="/licenses/add"
               icon="shop"
               [count]="this.Count"
               (Paginate)="this.refresh($event.offset, $event.limit)"
               entity-name="Лицензий"
               (Search)="SearchString = $event"
               (toggleFilters)="filterState = $event"
               [isCompact]="this.isCompact"></sg-crud>`,
})
export class LicenseGridComponent extends EntityGridBase<License, LicenseService> {
  constructor(licenses: LicenseService, private dialogref: MatDialog) {
    super(licenses, dialogref,
      ['select', 'id', 'name', 'cost', 'max_applies', 'info'],
      LicenseCardComponent)
  }
}
