import {Component} from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {Employee, Roles} from "../entities/employee";
import {EntityGridBase} from "./entity-grid-base";
import {MatDialog} from "@angular/material/dialog";
import {CardService} from '../cards/card.service';
import {EmployeeCardComponent} from '../cards/employee-card.component';

export class EmployeeFilter {
  UsingComputersCountLowBound: number;
  UsingComputersCountHighBound: number;

  Role: Roles;

  Superior : Employee;
  SuperiorId: number;
}

@Component({
  selector: 'sg-employee-grid',
  template: `
      <div class="sg-table-container">
          <table mat-table matSort matSortActive="id" [dataSource]="this.entities"
                 [class.sg-table-compact]="isCompact" (matSortChange)="changeSort($event.direction, $event.active)"
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

              <ng-container matColumnDef="surname">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Фамилия</th>
                  <td mat-cell *matCellDef="let element"> {{element.Surname}}
                  </td>
              </ng-container>

              <ng-container matColumnDef="patronymic">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Отчество</th>
                  <td mat-cell *matCellDef="let element"> {{element.Patronymic}}
                  </td>
              </ng-container>

              <ng-container matColumnDef="role">
                  <th mat-header-cell mat-sort-header *matHeaderCellDef>Должность</th>
                  <td mat-cell *matCellDef="let element"> {{element.Role | role}}
                  </td>
              </ng-container>

              <ng-container matColumnDef="info" stickyEnd>
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let element"
                      [class.sg-table-action-button-container-compact]="isCompact"
                      class="sg-table-action-button-container">
                      <button mat-icon-button [disabled]="element.Id == 1"
                              *ngIf="!isCompact" (click)="remove(element)">
                          <mat-icon>delete</mat-icon>
                      </button>
                      <button mat-icon-button *ngIf="!isCompact" 
                              [routerLink]="'/employees/edit/' + element.Id">
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
                  <mat-checkbox [(ngModel)]="filterApplies.ByUsingComputersCount">По количеству работников
                  </mat-checkbox>
                  <mat-form-field>
                      <input [disabled]="!filterApplies.ByUsingComputersCount" matInput
                             placeholder="Нижняя граница">
                  </mat-form-field>
                  <mat-form-field>
                      <input [disabled]="!filterApplies.ByUsingComputersCount" matInput
                             placeholder="Верхняя граница">
                  </mat-form-field>
              </div>

              <div class="sg-search-drawer-ruleset">
                  <mat-checkbox [(ngModel)]="filterApplies.ByRole">По должности</mat-checkbox>
                  <mat-form-field>
                      <mat-select [disabled]="!filterApplies.ByRole" placeholder="Должность"
                                  [(ngModel)]="filter.Role">
                          <mat-option *ngFor="let role of roles" [value]="role.value">
                              {{role.value | role}}
                          </mat-option>
                      </mat-select>
                  </mat-form-field>
              </div>

              <div class="sg-search-drawer-ruleset">
                  <mat-checkbox [(ngModel)]="filterApplies.BySuperior">По руководителю</mat-checkbox>
                  <sg-employee-search hint="Директор филиала" [(ngModel)]="filter.Superior"
                                      [disabled]="!filterApplies.BySuperior"></sg-employee-search>
              </div>
          </div>
      </div>
      
      <sg-grid-bottom-bar router-link="/employees/add"
                          icon="account_circle"
                          [count]="this.count"
                          (Paginate)="this.paginate($event.offset, $event.limit)"
                          entity-name="работников"
                          (toggleFilters)="filterState = $event"
                          (search)="searchString = $event"
                          [isCompact]="this.isCompact"></sg-grid-bottom-bar>`,
})
export class EmployeeGridComponent extends EntityGridBase<Employee, EmployeeService> {
  roles = [
    {value: Roles.Director},
    {value: Roles.BranchDirector},
    {value: Roles.LeadAdmin},
    {value: Roles.BranchAdmin},
    {value: Roles.Responsible},
    {value: Roles.StoreKeeper},
  ];

  filterApplies = {
    ByUsingComputersCount: false,
    BySuperior: false,
    ByRole: false
  };

  filter: EmployeeFilter = new EmployeeFilter();

  constructor(licenses: EmployeeService, private dialogref: MatDialog, cardService : CardService) {
    super(licenses, dialogref, ['select', 'id',
      'name', 'surname', 'patronymic', 'role', 'info'], cardService, EmployeeCardComponent)
  }

  constructFilter(): object {
    const filter = new EmployeeFilter();
    if (this.filterApplies.ByUsingComputersCount) {
      filter.UsingComputersCountLowBound = this.filter.UsingComputersCountLowBound;
      filter.UsingComputersCountHighBound = this.filter.UsingComputersCountHighBound;
    }

    if (this.filterApplies.BySuperior && this.filter.Superior) {
      filter.SuperiorId = this.filter.Superior.Id;
    }

    if (this.filterApplies.ByRole) {
      filter.Role = this.filter.Role;
    }

    return filter;
  }
}
