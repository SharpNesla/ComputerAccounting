import {Component, OnInit, ViewChild} from '@angular/core';
import {ComputerService} from "../services/computer.service";
import {Computer, ComputerType} from "../entities/computer";
import {EntityGridBase} from "./entity-grid-base";
import {MatDialog} from "@angular/material/dialog";
import {ComputerCardComponent} from "../cards/computer-card.component";

class ComputerFilter {
  UsersCountLowBound: number;
  UsersCountHighBound: number;
  Type: ComputerType;
}


@Component({
  selector: 'sg-computer-grid',
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

              <ng-container matColumnDef="inventory_id">
                  <th mat-header-cell *matHeaderCellDef>Инвентарный номер</th>
                  <td mat-cell *matCellDef="let element"
                      (contextmenu)="onContextMenu($event, element)"> {{element.InventoryId}} </td>
              </ng-container>

              <ng-container matColumnDef="type">
                  <th mat-header-cell *matHeaderCellDef>Тип</th>
                  <td mat-cell *matCellDef="let element"
                      (contextmenu)="onContextMenu($event, element)"> {{element.Type | computerType}}
                  </td>
              </ng-container>

              <ng-container matColumnDef="users_count">
                  <th mat-header-cell *matHeaderCellDef>Пользователей</th>
                  <td mat-cell *matCellDef="let element"
                      (contextmenu)="onContextMenu($event, element)"> {{element.UsersCount}}
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
      <div style="visibility: hidden; position: fixed"
           [style.left]="contextMenuPosition.x"
           [style.top]="contextMenuPosition.y"
           [matMenuTriggerFor]="contextMenu">
      </div>

      <mat-menu #contextMenu="matMenu">
          <ng-template matMenuContent let-item="item">
              <button mat-menu-item [routerLink]="'/computers/edit/' + item.Id">

                  <mat-icon>edit</mat-icon>
                  Изменить
              </button>
              <button mat-menu-item (click)="remove(item)">
                  <mat-icon>remove_circle_outline</mat-icon>
                  Удалить
              </button>
          </ng-template>
      </mat-menu>
      <sg-crud router-link="/computers/add"
               icon="desktop_mac"
               [count]="this.Count"
               (Search)="SearchString = $event"
               (toggleFilters)="filterState = $event"
               (Paginate)="this.refresh($event.offset, $event.limit)"
               entity-name="компьютеров"></sg-crud>`,
  styles: [`:host() {
      flex-grow: 1;
      overflow: hidden;
  }`]
})
export class ComputerGridComponent extends EntityGridBase<Computer, ComputerService> {

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

  constructor(computers: ComputerService, private dialogref: MatDialog) {
    super(computers, dialogref,
      ['select', 'id', 'name', 'inventory_id', 'type', 'users_count', 'info'],
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
