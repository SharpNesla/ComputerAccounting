import {Component, OnInit} from '@angular/core';
import {EntityGridBase} from "./entity-grid-base";
import {Subsidiary} from "../entities/subsidiary";
import {SubsidiaryService} from "../services/subsidiary.service";
import {PartTypeService} from "../services/part-type.service";
import {MatDialog} from "@angular/material/dialog";
import {RoomCardComponent} from "../cards/room-card.component";
import {SubsidiaryCardComponent} from "../cards/subsidiary-card.component";

class SubsidiaryFilter {
  RoomsCountLowBound: number;
  RoomsCountHighBound: number;

  ComputersCountLowBound: number;
  ComputersCountHighBound: number;

  EmployeesCountLowBound: number;
  EmployeesCountHighBound: number;

  DirectorId: number;
}

@Component({
  selector: 'sg-subsidiary-grid',
  template: `
      <div class="sg-table-container">
          <table mat-table [dataSource]="this.entities"
                 [class.sg-table-compact]="isCompact" class="sg-table">
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
                  <th mat-header-cell *matHeaderCellDef>№</th>
                  <td mat-cell *matCellDef="let element"> {{element.Id}} </td>
              </ng-container>

              <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Название</th>
                  <td mat-cell *matCellDef="let element"> {{element.Name}} </td>
              </ng-container>

              <ng-container matColumnDef="address">
                  <th mat-header-cell *matHeaderCellDef>Адрес</th>
                  <td mat-cell *matCellDef="let element"> {{element.Address}} </td>
              </ng-container>

              <ng-container matColumnDef="rooms_count">
                  <th mat-header-cell *matHeaderCellDef>Помещения</th>
                  <td mat-cell *matCellDef="let element"> {{element.RoomsCount}} </td>
              </ng-container>

              <ng-container matColumnDef="computers_count">
                  <th mat-header-cell *matHeaderCellDef>Компьютеры</th>
                  <td mat-cell *matCellDef="let element"> {{element.ComputersCount}} </td>
              </ng-container>

              <ng-container matColumnDef="employees_count">
                  <th mat-header-cell *matHeaderCellDef>Сотрудники</th>
                  <td mat-cell *matCellDef="let element"> {{element.EmployeesCount}} </td>
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
                  <mat-checkbox [(ngModel)]="filterApplies.ByRoomCount">По количеству комнат</mat-checkbox>
                  <mat-form-field>
                      <input [(ngModel)]="filter.RoomsCountLowBound"
                             [disabled]="!filterApplies.ByRoomCount" matInput placeholder="Нижняя граница">
                  </mat-form-field>
                  <mat-form-field>
                      <input [(ngModel)]="filter.RoomsCountHighBound"
                             [disabled]="!filterApplies.ByRoomCount" matInput placeholder="Верхняя граница">
                  </mat-form-field>
              </div>

              <div class="sg-search-drawer-ruleset">
                  <mat-checkbox [(ngModel)]="filterApplies.ByComputerCount">По количеству компьютеров</mat-checkbox>
                  <mat-form-field>
                      <input [(ngModel)]="filter.ComputersCountLowBound"
                             [disabled]="!filterApplies.ByComputerCount" matInput placeholder="Нижняя граница">
                  </mat-form-field>
                  <mat-form-field>
                      <input [(ngModel)]="filter.ComputersCountLowBound"
                             [disabled]="!filterApplies.ByComputerCount" matInput placeholder="Верхняя граница">
                  </mat-form-field>
              </div>

              <div class="sg-search-drawer-ruleset">
                  <mat-checkbox [(ngModel)]="filterApplies.ByEmployeeCount">По количеству работников</mat-checkbox>
                  <mat-form-field>
                      <input [(ngModel)]="filter.EmployeesCountLowBound"
                             [disabled]="!filterApplies.ByEmployeeCount" matInput placeholder="Нижняя граница">
                  </mat-form-field>
                  <mat-form-field>
                      <input [(ngModel)]="filter.EmployeesCountLowBound"
                             [disabled]="!filterApplies.ByEmployeeCount" matInput placeholder="Верхняя граница">
                  </mat-form-field>
              </div>

              <div class="sg-search-drawer-ruleset">
                  <mat-checkbox [(ngModel)]="filterApplies.ByDirector">По директору филиала</mat-checkbox>
                  <sg-employee-search hint="Директор филиала" [(ngModel)]="filter.RoomsCountLowBound"
                                      [disabled]="!filterApplies.ByDirector"></sg-employee-search>
              </div>
          </div>
      </div>

      <sg-crud router-link="/subsidiaries/add"
               icon="storefront"
               entity-name="филиалов"
               [count]="this.count"
               [isCompact]="this.isCompact"
               (toggleFilters)="filterState = $event"
               (search)="searchString = $event"
               (Paginate)="this.paginate($event.offset, $event.limit)">
      </sg-crud>`
})
export class SubsidiaryGridComponent extends EntityGridBase<Subsidiary, SubsidiaryService> {

  filterApplies = {
    ByRoomCount: false,
    ByComputerCount: false,
    ByEmployeeCount: false,
    ByDirector: false
  };

  filter: SubsidiaryFilter = new SubsidiaryFilter();

  constructor(private computers: SubsidiaryService, dialog: MatDialog) {
    super(computers, dialog,
      ['select', 'id', 'name', 'address', 'rooms_count', 'computers_count', 'employees_count', 'info'],
      SubsidiaryCardComponent)
  }

  constructFilter(): object {
    const filter = new SubsidiaryFilter();
    if (this.filterApplies.ByRoomCount) {
      filter.RoomsCountLowBound = this.filter.RoomsCountLowBound;
      filter.RoomsCountHighBound = this.filter.RoomsCountHighBound;
    }

    if (this.filterApplies.ByComputerCount) {
      filter.ComputersCountLowBound = this.filter.ComputersCountLowBound;
      filter.ComputersCountHighBound = this.filter.ComputersCountHighBound;
    }

    if (this.filterApplies.ByEmployeeCount) {
      filter.EmployeesCountLowBound = this.filter.EmployeesCountLowBound;
      filter.EmployeesCountHighBound = this.filter.EmployeesCountHighBound;
    }
    if (this.filterApplies.ByDirector) {
      filter.DirectorId = this.filter.DirectorId;
    }

    return filter;
  }
}
